// Genera diagramas SVG para los escritos del blog con Claude.
//
//   npm run illustrate -- <slug>            un escrito
//   npm run illustrate -- --all             todos los que aún no tienen figuras
//   npm run illustrate -- <slug> --force    regenerar aunque no haya cambios
//   npm run illustrate -- <slug> --dry-run  solo mostrar el plan de figuras
//   npm run illustrate -- <slug> --cover    generar la portada (imagen principal)
//
// Requiere ANTHROPIC_API_KEY (en .env.local o en el entorno). Modelo: ILLUSTRATE_MODEL.
// Detalles en illustrations/README.md.

import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import Anthropic from "@anthropic-ai/sdk"
import { insertFigure, readPost, removeFigure, type Section } from "./illustrate/post"
import { validateCover, validateSvg, type ValidationResult } from "./illustrate/validate"
import { posts } from "../src/lib/posts"

if (existsSync(".env.local")) process.loadEnvFile(".env.local")

const MODEL = process.env.ILLUSTRATE_MODEL || "claude-sonnet-5-5"
const STYLE_PATH = "illustrations/style.md"
const COVER_STYLE_PATH = "illustrations/cover-style.md"
const COVERS_REGISTRY = "src/lib/covers.ts"
const MAX_RETRIES = 2
const TYPES = ["flow", "structural", "comparison", "illustrative"] as const

// USD por millón de tokens (entrada, salida), para el resumen de costo.
const PRICES: Record<string, [number, number]> = {
  "claude-sonnet-5-5": [2, 10],
  "claude-opus-5-5": [4, 20],
  "claude-haiku-5-5": [0.1, 0.5],
  "claude-fable-5-1": [10, 50],
}

const PLAN_SYSTEM = `Eres director de arte de un blog técnico editorial. Recibes un artículo en MDX.
Elige entre 2 y 4 conceptos que se entiendan mejor dibujados que leídos.
Descarta lo que sería decoración. Prefiere mecanismos, contrastes y flujos.
Devuelve SOLO JSON válido, sin markdown:
{"figures":[{"id":"fig-01","after_heading":"<texto exacto de un H2 del post>",
"type":"flow|structural|comparison|illustrative",
"concept":"<qué debe entender el lector, 1 frase>",
"elements":["<etiqueta corta>", "..."],
"caption":"<pie de figura en el idioma del post, 1 frase>"}]}`

const GENERATE_INSTRUCTIONS = `Genera UN SVG que cumpla estrictamente el spec de estilo anterior.
Antes de escribir, calcula mentalmente anchos de texto (~8px/char a 14px, ~7px/char a 12px)
y dimensiona cajas con 24px de padding. Ninguna flecha cruza cajas ajenas.
Ningún texto se superpone a otro elemento. Devuelve SOLO el SVG, sin explicación.`

const COVER_INSTRUCTIONS = `Diseña UNA portada SVG que cumpla estrictamente el spec anterior para el escrito
que recibes. Antes de dibujar, elige una sola metáfora visual de su idea central y compónla con
pocas formas. Devuelve SOLO el SVG, sin explicación.`

type FigurePlan = {
  id: string
  after_heading: string
  type: (typeof TYPES)[number]
  concept: string
  elements: string[]
  caption: string
}
type ManifestFigure = FigurePlan & { file: string; model: string; sectionHash: string; styleHash: string }
type CoverEntry = { file: string; model: string; articleHash: string; styleHash: string }
type Manifest = { slug: string; figures: ManifestFigure[]; cover?: CoverEntry }

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex")

const styleMd = readFileSync(STYLE_PATH, "utf8")
const styleHash = sha256(styleMd)
const canonicalCss = styleMd.match(/```css\r?\n([\s\S]*?)```/)?.[1].trim() ?? ""
if (!canonicalCss) throw new Error(`No encontré el bloque css canónico en ${STYLE_PATH}`)
const palette = new Set((canonicalCss.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).map((h) => h.toLowerCase()))

const coverStyleMd = readFileSync(COVER_STYLE_PATH, "utf8")
const coverStyleHash = sha256(coverStyleMd)
const coverPalette = new Set((coverStyleMd.match(/#[0-9a-fA-F]{6}\b/g) ?? []).map((h) => h.toLowerCase()))

const client = new Anthropic()
const usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }
const report = { created: [] as string[], skipped: [] as string[], failed: [] as string[] }

async function ask(system: Anthropic.Beta.BetaTextBlockParam[], messages: Anthropic.Beta.BetaMessageParam[]) {
  const message = await client.beta.messages
    .stream({
      model: MODEL,
      max_tokens: 32000,
      thinking: { type: "adaptive" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system,
      messages,
    })
    .finalMessage()

  usage.input += message.usage.input_tokens
  usage.output += message.usage.output_tokens
  usage.cacheRead += message.usage.cache_read_input_tokens ?? 0
  usage.cacheWrite += message.usage.cache_creation_input_tokens ?? 0

  if (message.stop_reason === "refusal") {
    throw new Error(`El modelo rechazó la petición (${message.stop_details?.category ?? "sin categoría"}).`)
  }
  if (message.stop_reason === "max_tokens") throw new Error("La respuesta se cortó por max_tokens.")
  const text = message.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
  return { message, text }
}

function parsePlan(text: string, sections: Section[]): FigurePlan[] {
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)
  const data = JSON.parse(json) as { figures?: FigurePlan[] }
  const figures = data.figures ?? []
  const headings = new Set(sections.map((s) => s.heading))
  const problems: string[] = []
  if (figures.length < 2 || figures.length > 4) problems.push(`se pidieron 2–4 figuras y hay ${figures.length}`)
  figures.forEach((f, i) => {
    if (!headings.has(f.after_heading)) problems.push(`"${f.after_heading}" no es un H2 del post`)
    if (!TYPES.includes(f.type)) problems.push(`tipo inválido "${f.type}"`)
    if (!f.caption || !f.concept || !Array.isArray(f.elements)) problems.push(`figura ${i + 1} incompleta`)
    f.id = `fig-${String(i + 1).padStart(2, "0")}`
  })
  if (problems.length) throw new Error(`Plan inválido: ${problems.join("; ")}`)
  return figures
}

async function plan(slug: string, article: string, sections: Section[]): Promise<FigurePlan[]> {
  const system: Anthropic.Beta.BetaTextBlockParam[] = [{ type: "text", text: PLAN_SYSTEM }]
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    {
      role: "user",
      content: `Artículo "${slug}". Los H2 exactos son:\n${sections.map((s) => `- ${s.heading}`).join("\n")}\n\n${article}`,
    },
  ]
  const first = await ask(system, messages)
  try {
    return parsePlan(first.text, sections)
  } catch (e) {
    // Un reintento con el error concreto.
    messages.push({ role: "assistant", content: first.message.content })
    messages.push({ role: "user", content: `${(e as Error).message}. Devuelve el JSON corregido.` })
    return parsePlan((await ask(system, messages)).text, sections)
  }
}

// Extrae el <svg> de la respuesta y le pone el <style> canónico del spec.
function normalizeSvg(text: string): string {
  const start = text.indexOf("<svg")
  const end = text.lastIndexOf("</svg>")
  if (start === -1 || end === -1) return text
  let svg = text.slice(start, end + "</svg>".length).replace(/<style[\s\S]*?<\/style>/g, "")
  const style = `<style>\n${canonicalCss}\n</style>`
  svg = svg.includes("</desc>") ? svg.replace("</desc>", `</desc>\n${style}`) : svg.replace(/(<svg[^>]*>)/, `$1\n${style}`)
  return `${svg}\n`
}

// Pide un SVG, lo valida y reintenta con la lista exacta de errores.
async function generateValidated(
  system: Anthropic.Beta.BetaTextBlockParam[],
  userContent: string,
  prepare: (text: string) => string,
  validate: (svg: string) => ValidationResult,
) {
  const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: userContent }]
  let lastErrors: string[] = []
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const { message, text } = await ask(system, messages)
    const svg = prepare(text)
    const { errors, png } = validate(svg)
    if (!errors.length) return { svg, png }
    lastErrors = errors
    console.log(`    intento ${attempt + 1}: ${errors.length} error(es) de validación`)
    messages.push({ role: "assistant", content: message.content })
    messages.push({
      role: "user",
      content: `El SVG no pasa la validación. Corrige exactamente estos errores y devuelve el SVG completo:\n${errors.map((e) => `- ${e}`).join("\n")}`,
    })
  }
  throw new Error(lastErrors.join("\n      "))
}

function generate(fig: FigurePlan, section: Section) {
  return generateValidated(
    [{ type: "text", text: `${styleMd}\n\n${GENERATE_INSTRUCTIONS}`, cache_control: { type: "ephemeral" } }],
    `${JSON.stringify(fig, null, 2)}\n\nTexto de la sección "${section.heading}":\n${section.text}`,
    normalizeSvg,
    (svg) => validateSvg(svg, palette, canonicalCss),
  )
}

const extractSvg = (text: string) => {
  const start = text.indexOf("<svg")
  const end = text.lastIndexOf("</svg>")
  return start === -1 || end === -1 ? text : `${text.slice(start, end + "</svg>".length)}\n`
}

// Registro de portadas para los componentes (cliente y servidor): se reconstruye
// desde los cover.svg presentes en disco.
function writeCoversRegistry() {
  const entries = readdirSync("public/blog", { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(`public/blog/${d.name}/cover.svg`))
    .map((d) => `  "/blog/${d.name}": "/blog/${d.name}/cover.svg",`)
    .sort()
  writeFileSync(
    COVERS_REGISTRY,
    `// Generado por scripts/illustrate.ts --cover. No editar a mano.\nexport const covers: Record<string, string> = {\n${entries.join("\n")}${entries.length ? "\n" : ""}}\n`,
  )
}

async function illustrateCover(slug: string, force: boolean) {
  console.log(`\n▸ ${slug} (portada)`)
  const post = posts.find((p) => p.href === `/blog/${slug}`)
  if (!post) throw new Error(`no está en src/lib/posts.ts`)
  const { article } = readPost(slug)
  const outDir = `public/blog/${slug}`
  const file = `${outDir}/cover.svg`
  const manifestPath = `${outDir}/manifest.json`
  const manifest: Manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, "utf8"))
    : { slug, figures: [] }
  const articleHash = sha256(`${post.title}\n${post.excerpt}\n${article}`)

  if (existsSync(file) && readFileSync(file, "utf8").includes("<!-- manual -->")) {
    console.log("  portada editada a mano, se respeta")
    report.skipped.push(`${slug}/cover (manual)`)
    return
  }
  const old = manifest.cover
  if (!force && existsSync(file) && old?.articleHash === articleHash && old.styleHash === coverStyleHash) {
    console.log("  portada sin cambios (caché)")
    report.skipped.push(`${slug}/cover (caché)`)
    return
  }

  console.log(`  generando portada para "${post.title}"`)
  try {
    const { svg, png } = await generateValidated(
      [{ type: "text", text: `${coverStyleMd}\n\n${COVER_INSTRUCTIONS}`, cache_control: { type: "ephemeral" } }],
      `Título: ${post.title}\nBajada: ${post.excerpt}\nTema: ${post.tag}\n\n${article}`,
      extractSvg,
      (svg) => validateCover(svg, coverPalette),
    )
    mkdirSync(outDir, { recursive: true })
    mkdirSync(`illustrations/.previews/${slug}`, { recursive: true })
    writeFileSync(file, svg)
    if (png) writeFileSync(`illustrations/.previews/${slug}/cover.png`, png)
    manifest.cover = { file: `/blog/${slug}/cover.svg`, model: MODEL, articleHash, styleHash: coverStyleHash }
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    writeCoversRegistry()
    report.created.push(`${slug}/cover`)
    console.log(`  portada: ✓ ${file}`)
  } catch (e) {
    console.log(`  portada: ✗ no se usa\n      ${(e as Error).message}`)
    report.failed.push(`${slug}/cover`)
  }
}

async function illustrate(slug: string, force: boolean, dryRun: boolean) {
  console.log(`\n▸ ${slug}`)
  const { sections, article } = readPost(slug)
  const outDir = `public/blog/${slug}`
  const manifestPath = `${outDir}/manifest.json`
  const previous: Manifest | null = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null
  const sectionHash = (heading: string) => sha256(sections.find((s) => s.heading === heading)?.text ?? "")

  // El plan se reutiliza del manifest salvo --force; así una sección editada solo
  // regenera sus figuras.
  let figures: FigurePlan[]
  if (previous && !force && !dryRun) {
    figures = previous.figures
    const stale = previous.figures.filter(
      (f) =>
        f.sectionHash !== sectionHash(f.after_heading) ||
        f.styleHash !== styleHash ||
        !existsSync(`${outDir}/${f.id}.svg`),
    )
    if (!stale.length) {
      console.log("  al día (caché): nada que regenerar")
      report.skipped.push(...figures.map((f) => `${slug}/${f.id} (caché)`))
      return
    }
  } else {
    figures = await plan(slug, article, sections)
  }

  if (dryRun) {
    for (const f of figures) {
      console.log(`  ${f.id} [${f.type}] tras "${f.after_heading}"`)
      console.log(`    concepto: ${f.concept}`)
      console.log(`    elementos: ${f.elements.join(" · ")}`)
      console.log(`    pie: ${f.caption}`)
    }
    return
  }

  mkdirSync(outDir, { recursive: true })
  mkdirSync(`illustrations/.previews/${slug}`, { recursive: true })
  const manifest: Manifest = { slug, figures: [], cover: previous?.cover }

  for (const f of figures) {
    const file = `${outDir}/${f.id}.svg`
    const src = `/blog/${slug}/${f.id}.svg`
    const hash = sectionHash(f.after_heading)
    const old = previous?.figures.find((p) => p.id === f.id)
    const entry: ManifestFigure = { ...f, file: src, model: old?.model ?? MODEL, sectionHash: hash, styleHash }

    if (existsSync(file) && readFileSync(file, "utf8").includes("<!-- manual -->")) {
      console.log(`  ${f.id}: editada a mano, se respeta`)
      report.skipped.push(`${slug}/${f.id} (manual)`)
      manifest.figures.push(old ?? entry)
      continue
    }
    if (!force && existsSync(file) && old?.sectionHash === hash && old.styleHash === styleHash) {
      console.log(`  ${f.id}: sin cambios (caché)`)
      report.skipped.push(`${slug}/${f.id} (caché)`)
      manifest.figures.push(old)
      continue
    }

    console.log(`  ${f.id}: generando [${f.type}] "${f.concept}"`)
    try {
      const section = sections.find((s) => s.heading === f.after_heading)!
      const { svg, png } = await generate(f, section)
      writeFileSync(file, svg)
      if (png) writeFileSync(`illustrations/.previews/${slug}/${f.id}.png`, png)
      if (!insertFigure(slug, f.after_heading, src, f.caption)) {
        throw new Error(`no encontré dónde insertar tras "${f.after_heading}"`)
      }
      manifest.figures.push({ ...entry, model: MODEL })
      report.created.push(`${slug}/${f.id}`)
      console.log(`  ${f.id}: ✓ ${file}`)
    } catch (e) {
      console.log(`  ${f.id}: ✗ no se inserta\n      ${(e as Error).message}`)
      report.failed.push(`${slug}/${f.id}`)
      if (old && existsSync(file)) manifest.figures.push(old)
    }
  }
  // Figuras de un plan anterior que ya no están en el nuevo: fuera del post y del disco.
  for (const p of previous?.figures ?? []) {
    if (figures.some((f) => f.id === p.id)) continue
    const file = `${outDir}/${p.id}.svg`
    if (existsSync(file) && readFileSync(file, "utf8").includes("<!-- manual -->")) continue
    removeFigure(slug, p.file)
    rmSync(file, { force: true })
    console.log(`  ${p.id}: ya no está en el plan, se quitó`)
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes("--force")
  const dryRun = args.includes("--dry-run")
  const all = args.includes("--all")
  const coverMode = args.includes("--cover")
  const slugs = all
    ? readdirSync("src/app/blog", { withFileTypes: true })
        .filter((d) => d.isDirectory() && existsSync(`src/app/blog/${d.name}/page.tsx`))
        .map((d) => d.name)
        .filter((s) => {
          if (force) return true
          const m = `public/blog/${s}/manifest.json`
          if (!existsSync(m)) return true
          const data = JSON.parse(readFileSync(m, "utf8")) as Manifest
          return coverMode ? !data.cover : !data.figures.length
        })
    : args.filter((a) => !a.startsWith("--"))

  if (!slugs.length) {
    console.log("Uso: npm run illustrate -- <slug> [--force] [--dry-run] [--cover]  |  npm run illustrate -- --all [--cover]")
    process.exit(all ? 0 : 1)
  }
  for (const slug of slugs) {
    if (!existsSync(`src/app/blog/${slug}/page.tsx`)) {
      console.log(`\n▸ ${slug}: no existe src/app/blog/${slug}/page.tsx`)
      report.failed.push(slug)
      continue
    }
    try {
      if (coverMode) await illustrateCover(slug, force)
      else await illustrate(slug, force, dryRun)
    } catch (e) {
      if (e instanceof Anthropic.AuthenticationError) {
        console.error("\nANTHROPIC_API_KEY inválida o ausente. Ponla en .env.local (ver illustrations/README.md).")
        process.exit(1)
      }
      const msg = e instanceof Anthropic.APIError ? `API ${e.status}: ${e.message}` : (e as Error).message
      console.log(`  ✗ ${msg}`)
      report.failed.push(slug)
    }
  }

  const [pin, pout] = PRICES[MODEL] ?? [NaN, NaN]
  const cost =
    ((usage.input + usage.cacheWrite * 1.25 + usage.cacheRead * 0.1) * pin + usage.output * pout) / 1_000_000
  console.log("\n— Resumen —")
  console.log(`  creadas:  ${report.created.length}${report.created.length ? ` (${report.created.join(", ")})` : ""}`)
  console.log(`  saltadas: ${report.skipped.length}${report.skipped.length ? ` (${report.skipped.join(", ")})` : ""}`)
  console.log(`  fallidas: ${report.failed.length}${report.failed.length ? ` (${report.failed.join(", ")})` : ""}`)
  console.log(
    `  tokens:   ${usage.input} entrada · ${usage.output} salida · ${usage.cacheRead} caché leída · ${usage.cacheWrite} caché escrita`,
  )
  console.log(`  costo estimado: ${Number.isNaN(cost) ? "modelo sin precio conocido" : `US$ ${cost.toFixed(3)}`} (${MODEL})`)
}

main()

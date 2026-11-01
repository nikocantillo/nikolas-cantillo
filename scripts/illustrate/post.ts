import { readFileSync, writeFileSync } from "node:fs"

// Los escritos son páginas TSX (src/app/blog/<slug>/page.tsx) con secciones
// <section><h2>…</h2><p>…</p>…</section>. Aquí se leen y se les insertan figuras.

const FIGURE_IMPORT = 'import { Figure } from "@/components/blog/figure"'

export const postPath = (slug: string) => `src/app/blog/${slug}/page.tsx`

// Se trabaja siempre con \n y se respeta al escribir el fin de línea original del archivo.
const readSource = (slug: string) => {
  const raw = readFileSync(postPath(slug), "utf8")
  return { source: raw.replace(/\r\n/g, "\n"), eol: raw.includes("\r\n") ? "\r\n" : "\n" }
}
const writeSource = (slug: string, source: string, eol: string) =>
  writeFileSync(postPath(slug), eol === "\n" ? source : source.replace(/\n/g, eol))

export type Section = { heading: string; text: string }

const plain = (jsx: string) =>
  jsx
    .replace(/<[^>]+>/g, " ")
    .replace(/\{" "\}/g, " ")
    .replace(/\s+/g, " ")
    .trim()

export function readPost(slug: string) {
  const { source } = readSource(slug)
  const sections: Section[] = []
  for (const m of source.matchAll(/<h2>([\s\S]*?)<\/h2>([\s\S]*?)<\/section>/g)) {
    sections.push({ heading: plain(m[1]), text: plain(m[2]) })
  }
  // Texto completo legible para el planificador (sin imports ni JSX).
  const body = source.slice(source.indexOf("<ArticleLayout"))
  const article = body
    .replace(/<h2>([\s\S]*?)<\/h2>/g, (_, h) => `\n\n## ${plain(h)}\n\n`)
    .replace(/<\/p>/g, "\n\n")
    .replace(/<Figure[^>]*\/>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .trim()
  return { source, sections, article }
}

const jsxAttr = (s: string) => s.replace(/"([^"]*)"/g, "“$1”").replace(/"/g, "”").replace(/[{}]/g, "")

// Inserta (o actualiza) <Figure> justo después del primer párrafo que sigue al H2.
export function insertFigure(slug: string, heading: string, src: string, caption: string): boolean {
  // Si la figura ya estaba (quizá bajo otro H2), se quita y se vuelve a colocar.
  removeFigure(slug, src)
  const read = readSource(slug)
  let source = read.source
  const tag = `<Figure src="${src}" caption="${jsxAttr(caption)}" />`

  {
    const h2 = [...source.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].find((m) => plain(m[1]) === heading)
    if (!h2) return false
    const pEnd = source.indexOf("</p>", h2.index + h2[0].length)
    const sectionEnd = source.indexOf("</section>", h2.index)
    if (pEnd === -1 || (sectionEnd !== -1 && pEnd > sectionEnd)) return false
    const at = pEnd + "</p>".length
    const lineStart = source.lastIndexOf("\n", pEnd) + 1
    const indent = source.slice(lineStart).match(/^\s*/)![0]
    // Varias figuras tras el mismo párrafo quedan en orden de inserción.
    let insertAt = at
    const after = source.slice(at)
    const chained = after.match(/^(\s*<Figure [^>]*\/>)+/)
    if (chained) insertAt += chained[0].length
    source = `${source.slice(0, insertAt)}\n\n${indent}${tag}\n${source.slice(insertAt)}`
  }

  if (!source.includes(FIGURE_IMPORT)) {
    source = source.replace(
      /(import \{ ArticleLayout \} from "@\/components\/blog\/article-layout"\n)/,
      `$1${FIGURE_IMPORT}\n`,
    )
  }
  writeSource(slug, source, read.eol)
  return true
}

export function removeFigure(slug: string, src: string) {
  const { source, eol } = readSource(slug)
  const escaped = src.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")
  writeSource(slug, source.replace(new RegExp(`\\n\\n\\s*<Figure src="${escaped}"[^>]*/>\\n?`), ""), eol)
}

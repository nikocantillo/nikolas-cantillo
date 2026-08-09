// Convierte un notebook .ipynb en JSON curado para el visor del sitio.
// Uso: node scripts/convert-notebook.mjs <ruta.ipynb> <salida.json>
// Omite celdas de instrucciones del curso y credenciales; trunca outputs largos.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { marked } from "marked"

const [, , inputPath, outputPath] = process.argv
if (!inputPath || !outputPath) {
  console.error("Uso: node scripts/convert-notebook.mjs <ruta.ipynb> <salida.json>")
  process.exit(1)
}

const MAX_TEXT_OUTPUT = 3500

const SKIP_MARKDOWN_PATTERNS = [/^#\s*Instrucciones/im, /Deberás entregar SOLO/i]
const SKIP_CODE_PATTERNS = [/notebook_login|huggingface_hub import login|login\(/i]

const nb = JSON.parse(readFileSync(inputPath, "utf8"))
const cells = []

const joinSource = (src) => (Array.isArray(src) ? src.join("") : String(src ?? ""))

for (const [index, cell] of nb.cells.entries()) {
  const source = joinSource(cell.source).trim()
  if (!source) continue

  // Cabecera institucional e integrantes: el visor tiene su propia cabecera.
  if (index <= 1) continue

  if (cell.cell_type === "markdown") {
    if (SKIP_MARKDOWN_PATTERNS.some((re) => re.test(source))) continue
    cells.push({ kind: "markdown", html: marked.parse(source) })
    continue
  }

  if (cell.cell_type !== "code") continue
  if (SKIP_CODE_PATTERNS.some((re) => re.test(source))) continue

  // Ruido de progreso (tqdm, contadores) y warnings repetidos de transformers.
  const NOISE_PATTERNS = [
    /^Procesadas: \d+\/\d+/,
    /\d+%\|.*\[\d/,
    /it\/s\]$/,
    /^Setting `pad_token_id`/,
    /^The attention mask and the pad token id were not set/,
    /^Loading checkpoint shards/,
  ]
  const stripProgress = (text) =>
    text
      .split("\n")
      .filter((l) => !NOISE_PATTERNS.some((re) => re.test(l.trim())))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()

  const outputs = []
  for (const out of cell.outputs ?? []) {
    if (out.output_type === "stream") {
      outputs.push({ type: "text", text: stripProgress(joinSource(out.text)) })
    } else if (out.output_type === "execute_result" || out.output_type === "display_data") {
      const data = out.data ?? {}
      if (data["image/png"]) {
        outputs.push({ type: "image", dataUri: `data:image/png;base64,${data["image/png"].replace(/\n/g, "")}` })
      } else if (data["text/plain"]) {
        const text = joinSource(data["text/plain"])
        if (/^(VBox|HBox|Loading checkpoint|<IPython)/.test(text.trim())) continue
        outputs.push({ type: "text", text })
      }
    } else if (out.output_type === "error") {
      outputs.push({ type: "text", text: (out.traceback ?? []).join("\n").replace(/\x1b\[[0-9;]*m/g, "") })
    }
  }

  // Fusiona textos consecutivos y trunca.
  const merged = []
  for (const o of outputs) {
    const last = merged[merged.length - 1]
    if (o.type === "text" && last?.type === "text") last.text += o.text
    else merged.push({ ...o })
  }
  for (const o of merged) {
    if (o.type === "text" && o.text.length > MAX_TEXT_OUTPUT) {
      o.text = `${o.text.slice(0, MAX_TEXT_OUTPUT)}\n… (output truncado)`
    }
  }

  cells.push({
    kind: "code",
    source,
    execCount: cell.execution_count ?? null,
    outputs: merged,
  })
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, JSON.stringify({ cells }, null, 1))
console.log(`OK: ${cells.length} celdas → ${outputPath}`)

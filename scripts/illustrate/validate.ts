import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser"
import { Resvg, type ResvgRenderOptions } from "@resvg/resvg-js"

// Validación de un SVG contra illustrations/style.md: estructura, paleta, tipografía y
// geometría real del texto (cada <text> se renderiza aislado con resvg para medirlo).

type Node = Record<string, unknown>
type Box = { x: number; y: number; width: number; height: number }

const FORBIDDEN_TAGS = ["filter", "linearGradient", "radialGradient", "image", "pattern", "foreignObject"]
const TEXT_CLASSES = ["t-label", "t-strong", "t-sub", "t-mono"]
const MAX_BOXES = 5

const parser = new XMLParser({
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  allowBooleanAttributes: true,
  commentPropName: "#comment",
  trimValues: false,
})
const builder = new XMLBuilder({ preserveOrder: true, ignoreAttributes: false, attributeNamePrefix: "" })

// Fuentes de sistema para medir: más anchas que Inter Tight, así la medición es conservadora.
const sans = process.platform === "win32" ? "Segoe UI" : process.platform === "darwin" ? "Helvetica" : "DejaVu Sans"
const mono = process.platform === "win32" ? "Consolas" : process.platform === "darwin" ? "Menlo" : "DejaVu Sans Mono"
const renderOptions: ResvgRenderOptions = {
  font: { loadSystemFonts: true, defaultFontFamily: sans, sansSerifFamily: sans, monospaceFamily: mono },
  logLevel: "off",
}

const tagOf = (n: Node) => Object.keys(n).find((k) => k !== ":@")!
const attrsOf = (n: Node) => (n[":@"] ?? {}) as Record<string, string>
const childrenOf = (n: Node) => (Array.isArray(n[tagOf(n)]) ? (n[tagOf(n)] as Node[]) : [])
const num = (v: string | undefined) => Number.parseFloat(v ?? "NaN")

function textContent(n: Node): string {
  if (typeof n["#text"] === "string" || typeof n["#text"] === "number") return String(n["#text"])
  return childrenOf(n).map(textContent).join("")
}

function rectBox(a: Record<string, string>): Box | null {
  const b = { x: num(a.x ?? "0"), y: num(a.y ?? "0"), width: num(a.width), height: num(a.height) }
  return Object.values(b).some(Number.isNaN) ? null : b
}

const inside = (inner: Box, outer: Box, tol = 1) =>
  inner.x >= outer.x - tol &&
  inner.y >= outer.y - tol &&
  inner.x + inner.width <= outer.x + outer.width + tol &&
  inner.y + inner.height <= outer.y + outer.height + tol

function intersects(a: Box, b: Box, shrink = 0.5) {
  return (
    a.x + shrink < b.x + b.width - shrink &&
    b.x + shrink < a.x + a.width - shrink &&
    a.y + shrink < b.y + b.height - shrink &&
    b.y + shrink < a.y + a.height - shrink
  )
}

// ¿Cruza el segmento el interior del rectángulo? (Liang–Barsky sobre el rect encogido.)
function segmentCrossesRect(x1: number, y1: number, x2: number, y2: number, r: Box, shrink = 2) {
  const [xmin, xmax, ymin, ymax] = [r.x + shrink, r.x + r.width - shrink, r.y + shrink, r.y + r.height - shrink]
  const dx = x2 - x1
  const dy = y2 - y1
  let t0 = 0
  let t1 = 1
  for (const [p, q] of [
    [-dx, x1 - xmin],
    [dx, xmax - x1],
    [-dy, y1 - ymin],
    [dy, ymax - y1],
  ]) {
    if (p === 0) {
      if (q < 0) return false
    } else {
      const t = q / p
      if (p < 0) t0 = Math.max(t0, t)
      else t1 = Math.min(t1, t)
      if (t0 > t1) return false
    }
  }
  return true
}

type TextItem = { node: Node; label: string; parent: Box | null; group: number }
type RectItem = { box: Box; group: number }
type LineItem = { x1: number; y1: number; x2: number; y2: number; group: number }

export type ValidationResult = { errors: string[]; png?: Buffer }

// resvg no resuelve las pilas de fuentes web: para medir se cambian por fuentes concretas.
const forMeasure = (s: string) =>
  s
    .replace(/font-family:\s*"IBM Plex Mono"[^;]*;/g, `font-family: "${mono}";`)
    .replace(/font-family:\s*"Inter Tight"[^;]*;/g, `font-family: "${sans}";`)

export function validateSvg(svg: string, palette: Set<string>, rawCss: string): ValidationResult {
  const errors: string[] = []
  const css = forMeasure(rawCss)
  const valid = XMLValidator.validate(svg)
  if (valid !== true) return { errors: [`XML inválido: ${valid.err.msg} (línea ${valid.err.line})`] }

  const doc = parser.parse(svg) as Node[]
  const root = doc.find((n) => tagOf(n) === "svg")
  if (!root) return { errors: ["No hay elemento <svg> raíz."] }

  const ra = attrsOf(root)
  if (ra.role !== "img") errors.push('La raíz debe tener role="img".')
  const vb = (ra.viewBox ?? "").trim().split(/[\s,]+/).map(Number)
  if (vb.length !== 4 || vb[0] !== 0 || vb[1] !== 0 || vb[2] !== 680 || !(vb[3] > 0)) {
    errors.push(`viewBox debe ser "0 0 680 H"; es "${ra.viewBox ?? ""}".`)
  }
  const height = vb[3] > 0 ? vb[3] : 0
  const kids = childrenOf(root)
  const title = kids.find((n) => tagOf(n) === "title")
  const desc = kids.find((n) => tagOf(n) === "desc")
  if (!title || !textContent(title).trim()) errors.push("Falta <title> con texto.")
  if (!desc || !textContent(desc).trim()) errors.push("Falta <desc> con texto.")

  // Colores: cualquier hex del documento (atributos o <style>) debe estar en la paleta.
  for (const hex of svg.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
    if (!palette.has(hex.toLowerCase())) errors.push(`Color fuera de la paleta: ${hex}.`)
  }
  if (/\p{Extended_Pictographic}/u.test(svg)) errors.push("Contiene emojis.")

  const texts: TextItem[] = []
  const rects: RectItem[] = []
  const lines: LineItem[] = []
  let groupId = 0

  const walk = (nodes: Node[], group: number, groupRect: Box | null) => {
    for (const n of nodes) {
      const tag = tagOf(n)
      if (tag === "#text" || tag === "#comment") continue
      const a = attrsOf(n)
      if (FORBIDDEN_TAGS.includes(tag)) errors.push(`Elemento prohibido: <${tag}>.`)
      if (a.transform) errors.push(`Atributo transform prohibido en <${tag}>.`)
      if (a.style) errors.push(`Atributo style prohibido en <${tag}>; usa las clases del spec.`)
      if (a.filter) errors.push(`Atributo filter prohibido en <${tag}>.`)
      if (a["font-size"] && !["12", "14", "12px", "14px"].includes(a["font-size"])) {
        errors.push(`font-size ${a["font-size"]} no permitido (solo 12 o 14).`)
      }
      for (const k of ["fill", "stroke"]) {
        if (a[k] && a[k] !== "none" && tag !== "svg") {
          errors.push(`<${tag}> usa ${k}="${a[k]}"; usa clases del spec (solo se permite "none").`)
        }
      }

      if (tag === "g") {
        const id = ++groupId
        const firstRect = childrenOf(n).find((c) => tagOf(c) === "rect")
        walk(childrenOf(n), id, firstRect ? rectBox(attrsOf(firstRect)) : groupRect)
      } else if (tag === "rect") {
        const box = rectBox(a)
        if (!box) errors.push("<rect> sin x/y/width/height numéricos.")
        else rects.push({ box, group })
        if (a.rx !== "6") errors.push(`<rect> debe tener rx="6" (tiene "${a.rx ?? ""}").`)
      } else if (tag === "text") {
        const label = textContent(n).trim()
        const cls = (a.class ?? "").split(/\s+/)
        if (!cls.some((c) => TEXT_CLASSES.includes(c))) {
          errors.push(`El texto "${label}" no tiene clase de tamaño (${TEXT_CLASSES.join(", ")}).`)
        }
        const letters = label.replace(/[^\p{L}]/gu, "")
        if (letters.length > 12 && letters === letters.toUpperCase()) {
          errors.push(`Texto en mayúsculas sostenidas: "${label}".`)
        }
        texts.push({ node: n, label, parent: groupRect, group })
      } else if (tag === "line") {
        lines.push({ x1: num(a.x1), y1: num(a.y1), x2: num(a.x2), y2: num(a.y2), group })
      } else if (tag !== "defs" && tag !== "marker") {
        walk(childrenOf(n), group, groupRect)
      }
    }
  }
  walk(kids.filter((n) => !["title", "desc", "style", "defs"].includes(tagOf(n))), 0, null)

  if (rects.length > MAX_BOXES) errors.push(`Hay ${rects.length} cajas; el máximo es ${MAX_BOXES}.`)

  // Geometría real del texto.
  const measured: { label: string; box: Box; parent: Box | null }[] = []
  for (const t of texts) {
    const isolated =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ra.viewBox}" width="680" height="${height}">` +
      `<style>${css}</style>${builder.build([t.node])}</svg>`
    let box: Box | undefined
    try {
      box = new Resvg(isolated, renderOptions).getBBox()
    } catch {
      errors.push(`No se pudo medir el texto "${t.label}".`)
    }
    if (!box) continue
    measured.push({ label: t.label, box, parent: t.parent })
    if (box.x < 0 || box.y < 0 || box.x + box.width > 680 || box.y + box.height > height) {
      errors.push(`El texto "${t.label}" se sale del viewBox.`)
    }
    if (t.parent && !inside(box, t.parent)) {
      errors.push(
        `El texto "${t.label}" (ancho ${Math.round(box.width)}px) se sale de su caja ` +
          `(x=${t.parent.x}, ancho ${t.parent.width}px). Agranda la caja o acorta el texto.`,
      )
    }
    // Solape parcial con cualquier otra caja (estar del todo dentro de un contenedor es válido).
    for (const r of rects) {
      if (r.box === t.parent) continue
      if (intersects(box, r.box) && !inside(box, r.box)) {
        errors.push(`El texto "${t.label}" se superpone a una caja que no es la suya.`)
        break
      }
    }
  }
  for (let i = 0; i < measured.length; i++) {
    for (let j = i + 1; j < measured.length; j++) {
      if (intersects(measured[i].box, measured[j].box)) {
        errors.push(`Los textos "${measured[i].label}" y "${measured[j].label}" se superponen.`)
      }
    }
  }

  // Flechas rectas que atraviesan cajas ajenas.
  for (const l of lines) {
    if ([l.x1, l.y1, l.x2, l.y2].some(Number.isNaN)) continue
    for (const r of rects) {
      if (l.group !== 0 && r.group === l.group) continue
      const touches = (x: number, y: number) => inside({ x, y, width: 0, height: 0 }, r.box, 2)
      if (touches(l.x1, l.y1) || touches(l.x2, l.y2)) continue
      if (segmentCrossesRect(l.x1, l.y1, l.x2, l.y2, r.box)) {
        errors.push(`Una línea (${l.x1},${l.y1})→(${l.x2},${l.y2}) cruza una caja ajena.`)
      }
    }
  }

  let png: Buffer | undefined
  try {
    png = new Resvg(forMeasure(svg), { ...renderOptions, fitTo: { mode: "width", value: 1360 }, background: "#ffffff" })
      .render()
      .asPng()
  } catch (e) {
    errors.push(`resvg no pudo renderizar el SVG: ${(e as Error).message}`)
  }

  return { errors: [...new Set(errors)], png }
}

import { readFileSync } from "node:fs"
import path from "node:path"

// Figura de artículo: el SVG se lee al compilar y se incrusta inline, así hereda la
// tipografía del sitio y respondería a un futuro modo oscuro por clase `.dark`.
export function Figure({ src, caption }: { src: string; caption: string }) {
  const raw = readFileSync(path.join(process.cwd(), "public", src), "utf8")
  // Ids únicos por figura: varias figuras comparten <marker id="arrow">.
  const prefix = path.basename(src, ".svg")
  const svg = raw
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)

  return (
    <figure className="article-figure">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

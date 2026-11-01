import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

// Figura de artículo: el SVG se lee al compilar y se incrusta inline, así hereda la
// tipografía del sitio y respondería a un futuro modo oscuro por clase `.dark`.
// Si existe fig-NN.mobile.svg, se incrustan ambas y el CSS muestra la que corresponde.
function inlineSvg(file: string, prefix: string) {
  return (
    readFileSync(file, "utf8")
      .replace(/<\?xml[^>]*\?>/, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      // Ids únicos por figura: varias figuras comparten <marker id="arrow">.
      .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
      .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
      .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
  )
}

export function Figure({ src, caption }: { src: string; caption: string }) {
  const file = path.join(process.cwd(), "public", src)
  const mobileFile = file.replace(/\.svg$/, ".mobile.svg")
  const prefix = path.basename(src, ".svg")
  const hasMobile = existsSync(mobileFile)

  return (
    <figure className={`article-figure${hasMobile ? " has-mobile" : ""}`}>
      <div className="fig-desktop" dangerouslySetInnerHTML={{ __html: inlineSvg(file, prefix) }} />
      {hasMobile && (
        <div className="fig-mobile" dangerouslySetInnerHTML={{ __html: inlineSvg(mobileFile, `${prefix}-m`) }} />
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export type NotebookOutput = { type: "text"; text: string } | { type: "image"; dataUri: string }

export type NotebookCell =
  | { kind: "markdown"; html: string }
  | { kind: "code"; source: string; execCount: number | null; outputs: NotebookOutput[] }

type NotebookViewerProps = {
  cells: NotebookCell[]
  breadcrumb: { label: string; href: string }
  title: React.ReactNode
  meta: string
  intro: string
}

export function NotebookViewer({ cells, breadcrumb, title, meta, intro }: NotebookViewerProps) {
  let codeIndex = 0

  return (
    <main>
      {/* CABECERA */}
      <section className="mx-auto max-w-5xl px-5 md:px-8 pt-14 pb-6">
        <div className="font-mono text-xs flex justify-between flex-wrap gap-2 text-muted-foreground">
          <span>
            <Link href={breadcrumb.href} className="hover:text-accent">
              {breadcrumb.label}
            </Link>{" "}
            / Notebook
          </span>
          <span className="text-accent">{meta}</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl mt-5">{title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{intro}</p>
      </section>

      {/* CELDAS */}
      <section className="mx-auto max-w-5xl px-5 md:px-8 py-6">
        {cells.map((cell, i) => {
          if (cell.kind === "markdown") {
            return (
              <div
                key={i}
                className="nb-prose py-4 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: cell.html }}
              />
            )
          }

          codeIndex += 1
          return (
            <div key={i} className="my-6 rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2">
                <span className="font-mono text-[11px] text-accent">
                  In [{cell.execCount ?? codeIndex}]
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">Python</span>
              </div>
              <pre className="overflow-x-auto p-4 md:p-5 font-mono text-xs md:text-[13px] leading-6">
                <code>{cell.source}</code>
              </pre>

              {cell.outputs.length > 0 && (
                <div className="border-t border-border">
                  <div className="border-b border-border bg-secondary/60 px-4 py-1.5">
                    <span className="font-mono text-[11px] text-violet">Out</span>
                  </div>
                  {cell.outputs.map((out, j) =>
                    out.type === "text" ? (
                      <pre
                        key={j}
                        className="overflow-x-auto px-4 md:px-5 py-3 font-mono text-xs leading-6 text-muted-foreground"
                      >
                        {out.text}
                      </pre>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={j}
                        src={out.dataUri}
                        alt={`Output gráfico de la celda ${codeIndex}`}
                        className="max-w-full p-4"
                      />
                    )
                  )}
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* NAV */}
      <section className="mx-auto max-w-5xl px-5 md:px-8 py-8 flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link href={breadcrumb.href}>← Volver al caso</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Comentar este trabajo</Link>
        </Button>
      </section>
    </main>
  )
}

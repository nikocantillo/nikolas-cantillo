import Link from "next/link"
import { Button } from "@/components/ui/button"
import notebook from "@/data/rag-fever-notebook.json"

type NotebookOutput = { type: "text"; text: string } | { type: "image"; dataUri: string }

type NotebookCell =
  | { kind: "markdown"; html: string }
  | { kind: "code"; source: string; execCount: number | null; outputs: NotebookOutput[] }

const cells = notebook.cells as NotebookCell[]

export const metadata = {
  title: "Notebook: Fact-checking con RAG (FEVER) · Nikolas Cantillo",
  description:
    "Notebook renderizado del caso de fact-checking con RAG sobre FEVER: código, outputs y análisis, celda por celda.",
}

export default function RagFeverNotebookPage() {
  let codeIndex = 0

  return (
    <main>
      {/* CABECERA */}
      <section className="border-b border-ink px-6 md:px-10 py-10">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest flex justify-between flex-wrap gap-2 text-muted-foreground">
          <span>
            <Link href="/projects/rag-fever-fact-checking" className="hover:text-accent">
              Caso FEVER
            </Link>{" "}
            / Notebook
          </span>
          <span className="text-accent">Ejecutado · Tesla T4</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl mt-5">
          El notebook, celda por celda
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          Tarea 4 del curso de Procesamiento de Lenguaje Natural — Magíster en Ciencia de Datos,
          Pontificia Universidad Católica de Chile. Tal cual fue entregado: código, outputs
          reales y análisis. Se omiten celdas de credenciales e instrucciones del curso, y se
          filtra el ruido de progreso de los outputs.
        </p>
      </section>

      {/* CELDAS */}
      <section className="mx-auto max-w-5xl px-6 md:px-10 py-8">
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
            <div key={i} className="my-6 border border-ink/40">
              <div className="flex items-center justify-between border-b border-ink/40 bg-secondary px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  In [{cell.execCount ?? codeIndex}]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Python
                </span>
              </div>
              <pre className="overflow-x-auto p-4 md:p-5 font-mono text-xs md:text-[13px] leading-6">
                <code>{cell.source}</code>
              </pre>

              {cell.outputs.length > 0 && (
                <div className="border-t border-ink/40">
                  <div className="border-b border-ink/20 bg-secondary/60 px-4 py-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Out
                    </span>
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
      <section className="border-t border-ink px-6 md:px-10 py-8 flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link href="/projects/rag-fever-fact-checking">← Volver al caso</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Comentar este trabajo</Link>
        </Button>
      </section>
    </main>
  )
}

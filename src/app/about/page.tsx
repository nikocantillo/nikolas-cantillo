import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      
      {/* INTRO */}
      <section className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Sobre mí
        </h1>

        <p className="text-muted-foreground mt-4">
          Soy <span className="font-medium text-foreground">Nikolas Cantillo</span>, Data Scientist &
          AI Engineer. Trabajo construyendo soluciones de datos e inteligencia artificial que
          realmente llegan a producción.
        </p>

        <p className="text-muted-foreground mt-4">
          Me interesa la intersección entre datos, producto y arquitectura: desde la calidad
          y gobernanza de datos, hasta el uso práctico de LLMs y sistemas escalables.
        </p>
      </section>

      <Separator className="my-12" />

      {/* CÓMO PIENSO */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold">Cómo pienso</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Marco mental para abordar proyectos de datos e IA en entornos reales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
          {[
            ["1", "Entender el problema", "Objetivo, usuario y métrica de éxito."],
            ["2", "Auditar datos", "Calidad, sesgos, costos y gobernanza."],
            ["3", "Diseñar arquitectura", "Simple primero, escalable después."],
            ["4", "Prototipar rápido", "Demos funcionales y feedback temprano."],
            ["5", "Producción y medir", "QA, observabilidad y mejora continua."],
          ].map(([n, t, d]) => (
            <Card key={n}>
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground">Paso {n}</p>
                <h3 className="font-semibold mt-1">{t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* TECH STACK */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold">Tech stack</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Data</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Python", "SQL", "Pandas", "Spark", "PyArrow"].map((x) => (
                  <Badge key={x} variant="secondary">{x}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">AI / LLMs</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {["RAG", "Embeddings", "Vector Search", "Prompting"].map((x) => (
                  <Badge key={x} variant="secondary">{x}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Engineering</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {["FastAPI", "Next.js", "APIs", "CI/CD"].map((x) => (
                  <Badge key={x} variant="secondary">{x}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* CIERRE */}
      <section className="max-w-3xl">
        <h2 className="text-xl font-semibold">Qué busco</h2>
        <p className="text-muted-foreground mt-3">
          Me motiva trabajar en problemas complejos donde los datos y la IA generan impacto real
          y productos que se usan de verdad.
        </p>
      </section>
    </main>
  )
}

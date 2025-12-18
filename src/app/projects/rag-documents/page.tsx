import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const stack = [
  "Next.js",
  "API (FastAPI / Next Route)",
  "Embeddings",
  "Vector Search",
  "LLM",
  "PDF Parsing",
]

const features = [
  {
    title: "Búsqueda semántica",
    desc: "Recupera los fragmentos más relevantes del documento incluso cuando no coinciden palabras exactas.",
  },
  {
    title: "Respuestas con contexto",
    desc: "Genera respuestas usando solo el contenido recuperado para reducir alucinaciones.",
  },
  {
    title: "Evolución a citas",
    desc: "Preparado para incluir fuentes por página/fragmento (citations) y trazabilidad.",
  },
]

const flow = [
  "Ingesta de PDF",
  "Extracción y limpieza de texto",
  "Chunking (fragmentación)",
  "Embeddings por fragmento",
  "Indexación en vector store",
  "Consulta semántica",
  "Respuesta con contexto (RAG)",
]

export default function RagDocumentsProjectPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* HEADER */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">LLMs / RAG</Badge>
          <Badge variant="secondary">PDF</Badge>
          <Badge variant="secondary">Vector Search</Badge>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          RAG para documentos
        </h1>

        <p className="text-muted-foreground max-w-3xl">
          Sistema para consultar PDFs con lenguaje natural usando búsqueda semántica y generación
          de respuestas con contexto. Diseñado con mentalidad de producción: claridad, trazabilidad y
          evolución incremental.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild>
            <Link href="/projects">Volver a Projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contactar</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      {/* PROBLEMA */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold">Problema</h2>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Organizaciones acumulan documentos PDF (normativas, manuales, reportes, contratos).
                Encontrar información útil suele ser lento: la búsqueda por palabras exactas falla,
                el conocimiento se fragmenta y los equipos pierden tiempo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* SOLUCIÓN */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold">Solución</h2>
        </div>
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Implementé una arquitectura RAG (Retrieval-Augmented Generation) que combina:
              </p>
              <ul className="list-disc pl-5 mt-3 text-muted-foreground space-y-2">
                <li>Extracción de texto desde PDFs</li>
                <li>Fragmentación (chunking) para indexación eficiente</li>
                <li>Embeddings + búsqueda semántica para recuperar contexto relevante</li>
                <li>Generación con LLM usando el contexto recuperado</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* ARQUITECTURA / FLUJO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold">Arquitectura</h2>
          <p className="text-muted-foreground mt-2">
            Flujo base (MVP) pensado para evolucionar a citas y UI de chat.
          </p>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                {flow.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* STACK */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold">Stack</h2>
          <p className="text-muted-foreground mt-2">
            Componentes típicos del sistema (puedes ajustar a tu stack real).
          </p>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {stack.map((x) => (
                  <Badge key={x} variant="secondary">
                    {x}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* PRÓXIMOS PASOS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold">Próximos pasos</h2>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <p>
                Próximo: construir la demo simple (PDF → resumen / chat). Luego añadir:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Citas por fragmento (fuentes)</li>
                <li>UI de chat con historial</li>
                <li>Evaluación de calidad (relevancia, alucinación, cobertura)</li>
                <li>Controles de privacidad / roles (si aplica)</li>
              </ul>

              <div className="pt-2">
                <Button asChild>
                  <Link href="/demo/pdf">Ver demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

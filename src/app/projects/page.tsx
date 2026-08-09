import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const projects = [
  {
    title: "Fact-checking con RAG (FEVER)",
    desc: "Verificación de afirmaciones con Llama-3.2-3B: baseline zero-shot vs pipeline RAG con Wikipedia y FAISS. Caso del Magíster en Ciencia de Datos (UC Chile), con notebook verificable.",
    tag: "NLP / RAG",
    href: "/projects/rag-fever-fact-checking",
  },
  {
    title: "RAG para documentos",
    desc: "Búsqueda semántica y respuestas con contexto sobre documentos PDF, orientado a casos reales.",
    tag: "LLMs / RAG",
    href: "/projects/rag-documents",
  },
  {
    title: "Data Quality & Governance",
    desc: "Diseño de validaciones, reglas y trazabilidad para pipelines en producción.",
    tag: "Data Engineering",
    href: "/projects/data-quality",
  },
  {
    title: "Pipelines escalables (Spark)",
    desc: "Procesamiento masivo, particionamiento y cargas incrementales con foco en rendimiento.",
    tag: "Big Data",
    href: "/projects/spark-pipelines",
  },
]

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Proyectos y casos reales donde aplico Data Science, IA y arquitectura para construir sistemas listos para producción.
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">Contactar</Link>
        </Button>
      </div>

      <Separator className="my-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Card key={p.href} className="h-full">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold leading-tight">{p.title}</h2>
                <Badge variant="outline">{p.tag}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">{p.desc}</p>

              <div className="pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={p.href}>Ver caso</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

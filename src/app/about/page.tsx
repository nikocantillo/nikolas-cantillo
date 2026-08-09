import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExperienceTimeline } from "@/components/experience-timeline"

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      
      {/* HEADER / RESUMEN */}
      <section className="flex flex-col gap-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Nikolas Cantillo
          </h1>

          <p className="text-muted-foreground mt-2">
            Data Scientist · AI Engineer · Data Engineering · LLMs / RAG
          </p>

          <p className="text-muted-foreground mt-4">
            Trabajo construyendo sistemas de datos e inteligencia artificial con foco en producción:
            calidad, trazabilidad, rendimiento y claridad técnica. Me muevo entre data engineering
            (pipelines, control de calidad, arquitectura) y LLMs (RAG, embeddings, evaluación).
          </p>

          <p className="text-muted-foreground mt-3">
            Este sitio es un espacio personal para documentar aprendizajes, proyectos y enfoques
            técnicos que considero relevantes en el trabajo con datos e IA.
          </p>
        </div>

        {/* HIGHLIGHTS */}
        <div className="flex flex-wrap gap-2">
          {[
            "RAG sobre documentación",
            "Pipelines con Spark",
            "Data Quality & Governance",
            "APIs y backend",
            "Arquitectura y operación",
          ].map((x) => (
            <Badge key={x} variant="secondary">
              {x}
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* EXPERIENCIA (TIMELINE) */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Experiencia</h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Mi recorrido profesional: de freelancer a construir sistemas de datos e IA en
          producción.
        </p>

        <div className="max-w-4xl">
          <ExperienceTimeline />
        </div>
      </section>

      <Separator className="my-12" />

      {/* FORMACIÓN */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Formación</h2>
        <div className="mt-6 max-w-4xl">
          <Card>
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative size-14 rounded-xl bg-white overflow-hidden shrink-0">
                <Image
                  src="/logos/uc.png"
                  alt="Escudo de la Pontificia Universidad Católica de Chile"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Magíster en Ciencia de Datos</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Pontificia Universidad Católica de Chile
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-6">
                  Trabajos de los cursos publicados como casos verificables en este sitio:
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <Link
                    href="/projects/rag-fever-fact-checking"
                    className="text-accent hover:underline underline-offset-4"
                  >
                    Fact-checking con RAG (FEVER) →
                  </Link>
                  <Link
                    href="/projects/hate-speech-roberta-vs-llm"
                    className="text-accent hover:underline underline-offset-4"
                  >
                    Fine-tuning vs LLMs →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* PROYECTOS PERSONALES / PORTAFOLIO */}
      <section>
        <h2 className="text-2xl font-semibold">Proyectos personales</h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Proyectos desarrollados fuera del contexto laboral, con fines de aprendizaje,
          experimentación y documentación técnica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">RAG para documentos</h3>
                <Badge variant="outline">LLMs / RAG</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Sistema para consultar documentación PDF usando búsqueda semántica
                y generación de respuestas con contexto.
              </p>

              <div className="pt-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/projects/rag-documents">Ver caso</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">Data Quality Framework</h3>
                <Badge variant="outline">Data Engineering</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Estructura de validaciones, reglas y métricas para controlar calidad
                y trazabilidad en pipelines de datos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">Pipelines con Spark</h3>
                <Badge variant="outline">Big Data</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Procesamiento masivo, particionamiento y cargas incrementales
                con foco en performance y operación.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* SKILLS */}
      <section>
        <h2 className="text-2xl font-semibold">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Data</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Python", "SQL", "Spark", "Pandas", "Data Modeling"].map((x) => (
                  <Badge key={x} variant="secondary">
                    {x}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">LLMs</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {["RAG", "Embeddings", "Vector Search", "Prompting", "Evaluation"].map((x) => (
                  <Badge key={x} variant="secondary">
                    {x}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Engineering</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {["FastAPI", "Next.js", "APIs", "CI/CD", "Observability"].map((x) => (
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

      {/* CIERRE / DISCLAIMER */}
      <section className="max-w-3xl">
        <h2 className="text-xl font-semibold">Notas</h2>
        <p className="text-muted-foreground mt-3">
          Los proyectos y opiniones presentados aquí son personales y no representan
          a mi empleador actual ni a organizaciones con las que haya colaborado.
          No se comparte información confidencial ni propietaria.
        </p>

        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/contact">Intercambiar ideas</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

      {/* EXPERIENCIA (RESUMEN) */}
      <section>
        <h2 className="text-2xl font-semibold">Experiencia (resumen)</h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Enfoque en responsabilidades técnicas y tipo de problemas abordados.
        </p>

        <div className="mt-6 space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">Data / AI Engineer</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Entornos productivos · Datos a escala · Sistemas internos
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>
                  Diseño y mantenimiento de pipelines de datos escalables (Spark / SQL),
                  con foco en rendimiento, costos y confiabilidad.
                </li>
                <li>
                  Implementación de procesos de data quality y governance:
                  validación de esquemas, control de archivos, métricas y trazabilidad.
                </li>
                <li>
                  Desarrollo de servicios y APIs para automatizar flujos,
                  con logging, manejo de errores y observabilidad.
                </li>
              </ul>
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

        <p className="text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Nikolas Cantillo
        </p>
      </section>
    </main>
  )
}

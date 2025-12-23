import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brain, Database, Boxes } from "lucide-react"

const offerings = [
  {
    title: "IA aplicada",
    desc: "LLMs, RAG, asistentes y automatización con enfoque práctico.",
    icon: Brain,
  },
  {
    title: "Ciencia de datos",
    desc: "EDA, modelado, evaluación y experimentación con criterio.",
    icon: Database,
  },
  {
    title: "Arquitectura",
    desc: "Sistemas escalables, APIs y operación: lo que pasa después del modelo.",
    icon: Boxes,
  },
]

const projects = [
  {
    title: "RAG para documentos",
    desc: "Búsqueda semántica y respuestas con contexto sobre PDFs.",
    tag: "LLMs / RAG",
    href: "/projects/rag-documents",
    cta: { label: "Ver caso", href: "/projects/rag-documents" },
    secondary: { label: "Probar demo", href: "/demo/pdf" },
  },
  {
    title: "Data Quality & Governance",
    desc: "Validaciones, reglas y trazabilidad en pipelines reales.",
    tag: "Data Engineering",
    href: "/projects/data-quality",
    cta: { label: "Ver", href: "/projects/data-quality" },
  },
  {
    title: "Pipelines escalables",
    desc: "Procesamiento masivo con Spark y cargas incrementales.",
    tag: "Big Data",
    href: "/projects/spark-pipelines",
    cta: { label: "Ver", href: "/projects/spark-pipelines" },
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* TEXTO */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Data Science</Badge>
              <Badge variant="secondary">AI Engineering</Badge>
              <Badge variant="secondary">LLMs / RAG</Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Soy{" "}
              <span className="underline underline-offset-8">Nikolas Cantillo</span>. Trabajo en{" "}
              <span className="underline underline-offset-8">datos</span> e{" "}
              <span className="underline underline-offset-8">IA</span> con foco en producción.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Un espacio personal para compartir proyectos, demos y aprendizajes sobre LLMs, RAG,
              calidad de datos y sistemas escalables.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/projects">Ver proyectos</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Sobre mí</Link>
              </Button>
            </div>
          </div>

          {/* FOTO */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border shadow-sm ring-4 ring-muted">
              <Image
                src="/nikolascantillo.jpeg"
                alt="Nikolas Cantillo – Data Science & AI"
                fill
                className="object-cover grayscale hover:grayscale-0 transition"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* QUÉ HAGO */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">En qué trabajo</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {offerings.map((o) => (
            <Card key={o.title}>
              <CardContent className="p-6 flex flex-col gap-3">
                <o.icon className="w-6 h-6 text-muted-foreground" />
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* PROYECTOS */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Proyectos destacados</h2>
          <Button asChild variant="outline">
            <Link href="/projects">Ver todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {projects.map((p) => (
            <Card key={p.title}>
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{p.title}</h3>
                  <Badge variant="outline">{p.tag}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{p.desc}</p>

                <div className="pt-2 flex gap-3">
                  <Button asChild size="sm" variant="outline">
                    <Link href={p.cta.href}>{p.cta.label}</Link>
                  </Button>

                  {p.secondary ? (
                    <Button asChild size="sm">
                      <Link href={p.secondary.href}>{p.secondary.label}</Link>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA (NEUTRO) */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <Card>
          <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Intercambiar ideas</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Si quieres discutir enfoques técnicos, dar feedback a una demo o comentar sobre
                proyectos de datos/IA, puedes escribirme.
              </p>
            </div>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Escribir</Link>
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Nikolas Cantillo
        </p>
      </section>
    </main>
  )
}
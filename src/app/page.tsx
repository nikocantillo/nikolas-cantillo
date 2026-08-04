import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brain, Database, Boxes, ArrowRight, ArrowUpRight } from "lucide-react"
import { posts } from "@/lib/posts"

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
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full bg-primary/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* TEXTO */}
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Data Science</Badge>
                <Badge variant="secondary">AI Engineering</Badge>
                <Badge variant="secondary">LLMs / RAG</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
                Soy Nikolas Cantillo. Trabajo en{" "}
                <span className="text-gradient">datos e IA</span> con foco en producción.
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-7">
                Un espacio personal para compartir proyectos, demos y aprendizajes sobre LLMs,
                RAG, calidad de datos y sistemas escalables.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link href="/projects">
                    Ver proyectos
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/blog">Leer el blog</Link>
                </Button>
              </div>
            </div>

            {/* FOTO */}
            <div className="flex justify-center md:justify-end animate-in fade-in zoom-in-95 duration-700">
              <div className="rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 p-1 shadow-lg shadow-primary/20">
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src="/nikolascantillo.jpeg"
                    alt="Nikolas Cantillo – Data Science & AI"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* QUÉ HAGO */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">En qué trabajo</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {offerings.map((o) => (
            <Card
              key={o.title}
              className="group transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <o.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{o.title}</h3>
                <p className="text-sm text-muted-foreground leading-6">{o.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* PROYECTOS */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Proyectos destacados
            </h2>
            <p className="text-muted-foreground mt-2">Casos reales, con demos que puedes probar.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/projects">Ver todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {projects.map((p) => (
            <Card
              key={p.title}
              className="group transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6 flex flex-col gap-3 h-full">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{p.title}</h3>
                  <Badge variant="outline">{p.tag}</Badge>
                </div>

                <p className="text-sm text-muted-foreground leading-6 flex-1">{p.desc}</p>

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

      {/* DEL BLOG */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Del blog</h2>
            <p className="text-muted-foreground mt-2">
              Ideas prácticas sobre datos, IA y sistemas en producción.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">Ver todos los artículos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-xl border overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`h-28 bg-gradient-to-br ${post.gradient} relative`}>
                <post.icon className="absolute right-4 bottom-3 size-10 text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                <span className="absolute left-4 bottom-3 font-mono text-xs text-muted-foreground">
                  {post.deco}
                </span>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold leading-snug line-clamp-2">{post.title}</h3>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Leer artículo
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <Card className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-cyan-400/10"
          />
          <CardContent className="relative p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Intercambiar ideas</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl leading-7">
                Si quieres discutir enfoques técnicos, dar feedback a una demo o comentar sobre
                proyectos de datos/IA, puedes escribirme.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact">
                Escribir
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

import Link from "next/link"
import { ArrowUpRight, Brain, Database, Boxes } from "lucide-react"
import { posts } from "@/lib/posts"
import { HeroCanvas } from "@/components/effects/hero-canvas"
import { Typewriter } from "@/components/effects/typewriter"
import { Reveal } from "@/components/effects/reveal"
import { CountUp } from "@/components/effects/count-up"

const roles = [
  "PySpark · OCI Dataflow · Oracle Cloud",
  "RAG · LangChain · FAISS · LLMs",
  "Data Quality · governance · trazabilidad",
  "Magíster en Ciencia de Datos · UC Chile",
]

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

const skills = [
  "PySpark · procesamiento a escala",
  "OCI Dataflow · Oracle Cloud",
  "RAG / LLMs · LangChain · FAISS",
  "Data Quality · governance",
  "Python · APIs · Django",
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        <HeroCanvas />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8 w-full py-24">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-accent/5 px-4 py-1.5 text-[13px] text-muted-foreground">
            <span className="size-2 rounded-full bg-accent animate-pulse-dot" />
            Principal Consultant · Oracle
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mt-7 max-w-[16ch] text-balance">
            Construyo sistemas de <span className="text-shimmer">datos e IA</span> que sobreviven
            a producción.
          </h1>

          <div className="mt-6 min-h-7">
            <Typewriter phrases={roles} />
          </div>

          <p className="mt-4 max-w-xl text-muted-foreground leading-7">
            Soy Nikolas Cantillo. Cinco años entre pipelines, migraciones cloud y LLMs —
            documentando lo que funciona y, sobre todo, lo que no.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-xl bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:shadow-glow-strong hover:-translate-y-0.5 transition-all"
            >
              Ver mi trabajo
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              Leer el blog
            </Link>
          </div>
        </div>

        <span
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground animate-bounce"
        >
          Scroll
        </span>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Reveal className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 hover:border-accent/40 transition-colors">
          <p className="font-display text-4xl tabular-nums">
            <CountUp value={65.4} decimals={1} className="text-accent" />%
          </p>
          <p className="text-sm text-muted-foreground mt-1.5">accuracy zero-shot · caso FEVER</p>
        </Reveal>
        <Reveal
          delay={120}
          className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 hover:border-accent/40 transition-colors"
        >
          <p className="font-display text-4xl tabular-nums">
            <CountUp value={4125} className="text-accent" />
          </p>
          <p className="text-sm text-muted-foreground mt-1.5">chunks indexados en FAISS</p>
        </Reveal>
        <Reveal
          delay={240}
          className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 hover:border-accent/40 transition-colors"
        >
          <p className="font-display text-4xl tabular-nums">
            <CountUp value={5} className="text-accent" />+
          </p>
          <p className="text-sm text-muted-foreground mt-1.5">años: de freelance a Oracle</p>
        </Reveal>
      </section>

      {/* PROYECTOS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-20">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Proyectos
          </p>
          <h2 className="font-display text-3xl md:text-4xl mt-2.5">
            Casos reales, con métricas reales.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 mt-8">
          <Reveal>
            <Link
              href="/projects/rag-fever-fact-checking"
              className="group relative block h-full rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
            >
              <ArrowUpRight className="absolute top-6 right-6 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                NLP · RAG
              </p>
              <h3 className="font-display text-xl md:text-2xl mt-3 leading-snug pr-8">
                Fact-checking con RAG: cuando la evidencia no ayuda
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-6">
                Llama-3.2-3B sobre FEVER: baseline zero-shot contra un pipeline RAG completo. El
                resultado honesto — y por qué el retrieval domina.
              </p>

              <div className="mt-5 space-y-2">
                <div className="grid grid-cols-[84px_1fr_44px] items-center gap-3 text-xs text-muted-foreground">
                  <span>Zero-shot</span>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-violet" style={{ width: "65.4%" }} />
                  </div>
                  <span className="text-right font-mono text-foreground">65.4</span>
                </div>
                <div className="grid grid-cols-[84px_1fr_44px] items-center gap-3 text-xs text-muted-foreground">
                  <span>RAG</span>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: "64%" }} />
                  </div>
                  <span className="text-right font-mono text-foreground">64.0</span>
                </div>
              </div>

              <p className="mt-5 font-mono text-xs text-accent">
                notebook verificable · Magíster UC Chile
              </p>
            </Link>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={120}>
              <Link
                href="/projects/rag-documents"
                className="group relative block rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <ArrowUpRight className="absolute top-6 right-6 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                  LLMs · RAG
                </p>
                <h3 className="font-display text-lg md:text-xl mt-3 leading-snug pr-8">
                  RAG para documentos
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-6">
                  Búsqueda semántica y respuestas con contexto sobre PDFs — con demo.
                </p>
              </Link>
            </Reveal>
            <Reveal delay={240}>
              <Link
                href="/projects"
                className="group relative block rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <ArrowUpRight className="absolute top-6 right-6 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                  Data Engineering
                </p>
                <h3 className="font-display text-lg md:text-xl mt-3 leading-snug pr-8">
                  Data Quality & pipelines Spark
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-6">
                  Validaciones, trazabilidad y procesamiento masivo en producción.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EN QUÉ TRABAJO */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-20">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            En qué trabajo
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {offerings.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 120}
              className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 hover:border-accent/40 transition-colors"
            >
              <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <o.icon className="size-5 text-accent" />
              </div>
              <h3 className="font-display text-lg mt-4">{o.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-6">{o.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      <div className="mt-20 border-y border-border overflow-hidden py-4 select-none">
        <div className="animate-marquee flex gap-10 w-max text-sm text-muted-foreground whitespace-nowrap">
          {[...skills, ...skills].map((s, i) => {
            const [head, ...rest] = s.split(" · ")
            return (
              <span key={i}>
                <span className="text-accent font-medium">{head}</span>
                {rest.length > 0 && ` · ${rest.join(" · ")}`}
              </span>
            )
          })}
        </div>
      </div>

      {/* BLOG */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-20">
        <Reveal className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
              Blog
            </p>
            <h2 className="font-display text-3xl md:text-4xl mt-2.5">Aprendizajes documentados.</h2>
          </div>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-accent transition-colors">
            Ver todos →
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.href} delay={i * 120}>
              <Link
                href={post.href}
                className="group relative block h-full rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <ArrowUpRight className="absolute top-5 right-5 size-4 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <p className="font-mono text-xs text-muted-foreground">
                  {post.date} · {post.readTime}
                </p>
                <h3 className="font-display text-base md:text-lg mt-3 leading-snug line-clamp-3 pr-6">
                  {post.title}
                </h3>
                <p className="mt-3 font-mono text-xs text-accent">{post.deco}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl text-balance">
            ¿Hablamos de <span className="text-shimmer">datos</span>?
          </h2>
          <p className="text-muted-foreground mt-4">
            Ideas técnicas, feedback a una demo o el próximo proyecto.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 rounded-xl bg-accent text-accent-foreground px-8 py-3.5 text-sm font-semibold shadow-glow hover:shadow-glow-strong hover:-translate-y-0.5 transition-all"
          >
            Escríbeme →
          </Link>
        </Reveal>
      </section>
    </main>
  )
}

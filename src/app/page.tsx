import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Brain, Database, Boxes } from "lucide-react"
import { posts } from "@/lib/posts"
import { HeroCanvas } from "@/components/effects/hero-canvas"
import { Reveal } from "@/components/effects/reveal"
import { GraphMandala } from "@/components/effects/graph-mandala"
import { experience } from "@/lib/experience"

const offerings = [
  {
    title: "IA aplicada",
    desc: "LLMs, RAG y asistentes — con evaluación honesta de cuándo aportan y cuándo no.",
    icon: Brain,
  },
  {
    title: "Ciencia de datos",
    desc: "EDA, modelado y validación con la métrica correcta para cada problema.",
    icon: Database,
  },
  {
    title: "Arquitectura",
    desc: "Lo que pasa después del modelo: APIs, escala y operación en producción.",
    icon: Boxes,
  },
]

const skillGroups = [
  { head: "Procesamiento", items: ["PySpark", "OCI Dataflow", "cargas incrementales"] },
  { head: "IA / LLMs", items: ["RAG", "LangChain", "FAISS", "fine-tuning"] },
  { head: "Datos", items: ["Data Quality", "governance", "Python", "APIs · Django"] },
]

// Resultados medidos en los casos, con su fuente. No son adornos: cada uno enlaza al notebook.
const results = [
  { value: "0.83", label: "F1 macro · clasificación de desenlace en cirrosis", href: "/projects/cirrhosis-survival-ml" },
  { value: "92%", label: "accuracy de RoBERTa fine-tuneado vs 55% del LLM", href: "/projects/hate-speech-roberta-vs-llm" },
  { value: "65.4%", label: "baseline zero-shot en fact-checking (FEVER)", href: "/projects/rag-fever-fact-checking" },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        <HeroCanvas />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8 w-full py-24 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-12">
          <div>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[13px] text-muted-foreground">
              <span className="size-2 rounded-full bg-accent animate-pulse-dot" />
              Principal Consultant · Oracle
            </span>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mt-7 max-w-[16ch] text-balance">
              Construyo sistemas de datos e IA que sobreviven a producción.
            </h1>

            <p className="mt-6 font-mono text-[13px] md:text-sm text-muted-foreground">
              PySpark · OCI · RAG y LLMs · Data Quality — Magíster en Ciencia de Datos
            </p>

            <p className="mt-4 max-w-xl text-muted-foreground leading-7">
              Soy Nikolas Cantillo. Cinco años entre pipelines, migraciones cloud y LLMs,
              documentando lo que funciona y, sobre todo, lo que no. Trabajo con equipos que
              necesitan pasar de un modelo a un sistema que se sostiene.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-xl bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Ver mi trabajo
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Trabajemos juntos
              </Link>
            </div>
          </div>

          {/* FOTO */}
          <div className="flex justify-center md:justify-end">
            <div className="rounded-full border border-accent/25 p-[3px]">
              <div className="relative size-48 md:size-64 lg:size-80 rounded-full overflow-hidden border-4 border-background">
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

        <span
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          Scroll
        </span>
      </section>

      {/* RESULTADOS MEDIDOS */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="rounded-2xl border border-border overflow-hidden">
          <div className="border-b border-border px-6 py-3">
            <p className="font-mono text-xs text-muted-foreground">
              Resultados medidos · cada uno con su notebook verificable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {results.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group px-6 py-6 hover:bg-secondary/40 transition-colors"
              >
                <p className="font-display text-3xl md:text-4xl tabular-nums text-foreground">
                  {r.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-6">{r.label}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-accent">
                  ver caso
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TRAYECTORIA */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-16">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Trayectoria
          </p>
          <div className="mt-6 flex flex-wrap items-stretch justify-center gap-3">
            {experience
              .filter((e) => e.logo)
              .map((e) => (
                <Link
                  key={e.company}
                  href="/about"
                  className="flex items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 hover:border-accent/40 transition-colors"
                >
                  <span className="relative size-8 rounded-md bg-white overflow-hidden shrink-0">
                    <Image
                      src={e.logo!}
                      alt={`Logo de ${e.company}`}
                      fill
                      className="object-contain p-1"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold leading-tight">{e.company}</span>
                    <span className="block text-xs text-muted-foreground leading-tight">
                      {e.roles[0].title}
                    </span>
                  </span>
                </Link>
              ))}
          </div>
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
              className="group relative block h-full rounded-2xl border border-border bg-secondary/30 p-7 transition-colors hover:border-accent/40"
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
                href="/projects/cirrhosis-survival-ml"
                className="group relative block rounded-2xl border border-border bg-secondary/30 p-7 transition-colors hover:border-accent/40"
              >
                <ArrowUpRight className="absolute top-6 right-6 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                  ML clínico · Clasificación
                </p>
                <h3 className="font-display text-lg md:text-xl mt-3 leading-snug pr-8">
                  Predicción del desenlace en cirrosis
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-6">
                  SMOTE + 5 modelos para clasificar el desenlace del paciente; Random Forest al 83%.
                </p>
              </Link>
            </Reveal>
            <Reveal delay={240}>
              <Link
                href="/projects/hate-speech-roberta-vs-llm"
                className="group relative block rounded-2xl border border-border bg-secondary/30 p-7 transition-colors hover:border-accent/40"
              >
                <ArrowUpRight className="absolute top-6 right-6 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                  NLP · Fine-tuning
                </p>
                <h3 className="font-display text-lg md:text-xl mt-3 leading-snug pr-8">
                  Fine-tuning vs LLMs: el modelo pequeño gana
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-6">
                  RoBERTa 92% vs Llama-3.2-3B 55% en moderación de contenido.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CÓMO PUEDO AYUDAR */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-20">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Cómo puedo ayudar
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {offerings.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 120}
              className="rounded-2xl border border-border bg-secondary/30 p-6 hover:border-accent/40 transition-colors"
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

      {/* STACK */}
      <section className="mx-auto max-w-6xl px-5 md:px-8 pt-16">
        <div className="rounded-2xl border border-border divide-y divide-border">
          {skillGroups.map((g) => (
            <div key={g.head} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 px-6 py-4">
              <p className="text-sm font-semibold text-foreground">{g.head}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-sm text-muted-foreground">
                {g.items.map((it) => (
                  <span key={it}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
                className="group relative block h-full rounded-2xl border border-border bg-secondary/30 p-6 transition-colors hover:border-accent/40"
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

      {/* CTA con mandala de grafos */}
      <section className="relative mx-auto max-w-6xl px-5 md:px-8 py-28 md:py-40 text-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center opacity-35 pointer-events-none"
        >
          <div className="w-[min(620px,90vw)] aspect-square">
            <GraphMandala />
          </div>
        </div>
        <Reveal className="relative">
          <h2 className="font-display text-4xl md:text-6xl text-balance">
            ¿Tienes un problema de datos?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-7">
            Disponible para consultoría y colaboración. Cuéntame el problema y te digo con
            franqueza si puedo ayudar y cómo lo abordaría.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 rounded-xl bg-accent text-accent-foreground px-8 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Escríbeme
          </Link>
        </Reveal>
      </section>
    </main>
  )
}

import Image from "next/image"
import Link from "next/link"
import { posts } from "@/lib/posts"

const ticker =
  "DATA ENGINEERING · PYSPARK · OCI · LLMs · RAG · DATA QUALITY · APIs · SPARK · PYTHON · SQL · "

const offerings = [
  {
    n: "01",
    title: "IA aplicada",
    desc: "LLMs, RAG, asistentes y automatización con enfoque práctico.",
  },
  {
    n: "02",
    title: "Ciencia de datos",
    desc: "EDA, modelado, evaluación y experimentación con criterio.",
  },
  {
    n: "03",
    title: "Arquitectura",
    desc: "Sistemas escalables, APIs y operación: lo que pasa después del modelo.",
  },
]

const projects = [
  {
    n: "01",
    title: "Fact-checking con RAG (FEVER)",
    desc: "Zero-shot vs RAG con Llama-3.2-3B, Wikipedia y FAISS — con notebook verificable del Magíster UC Chile.",
    tag: "NLP / RAG",
    href: "/projects/rag-fever-fact-checking",
  },
  {
    n: "02",
    title: "RAG para documentos",
    desc: "Búsqueda semántica y respuestas con contexto sobre PDFs.",
    tag: "LLMs / RAG",
    href: "/projects/rag-documents",
  },
  {
    n: "03",
    title: "Data Quality & Governance",
    desc: "Validaciones, reglas y trazabilidad en pipelines reales.",
    tag: "Data Engineering",
    href: "/projects",
  },
  {
    n: "04",
    title: "Pipelines escalables",
    desc: "Procesamiento masivo con Spark y cargas incrementales.",
    tag: "Big Data",
    href: "/projects",
  },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b border-ink">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
          <div className="p-6 md:p-10 flex flex-col justify-between gap-10 md:border-r border-ink">
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest flex justify-between text-muted-foreground">
              <span>Portafolio / 2026</span>
              <span className="text-accent">● Data & AI</span>
            </div>

            <h1 className="font-display text-[13vw] md:text-7xl lg:text-8xl">
              Nikolas
              <br />
              <span className="text-outline">Cantillo</span>
            </h1>

            <div className="max-w-xl">
              <p className="text-base md:text-lg leading-7">
                Trabajo en <span className="font-semibold underline decoration-accent decoration-2 underline-offset-4">datos e IA</span>{" "}
                con foco en producción. Proyectos, demos y aprendizajes sobre LLMs, RAG, calidad
                de datos y sistemas escalables.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 border border-ink bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-primary/85 transition-colors"
                >
                  Ver proyectos →
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border border-ink px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
                >
                  Leer el blog
                </Link>
              </div>
            </div>
          </div>

          {/* FOTO */}
          <div className="relative border-t md:border-t-0 border-ink min-h-72 md:min-h-full">
            <Image
              src="/nikolascantillo.jpeg"
              alt="Nikolas Cantillo – Data Science & AI"
              fill
              className="object-cover grayscale-[60%]"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 border-t border-ink bg-background px-4 py-2 flex justify-between font-mono text-[10px] uppercase tracking-widest">
              <span>Fig. 01 — Retrato</span>
              <span className="text-accent">Bogotá, CO</span>
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="border-t border-ink overflow-hidden py-2 select-none text-muted-foreground">
          <div className="animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-widest w-max">
            <span>{ticker}</span>
            <span>{ticker}</span>
          </div>
        </div>
      </section>

      {/* EN QUÉ TRABAJO */}
      <section className="border-b border-ink">
        <div className="px-6 md:px-10 py-6 flex items-baseline justify-between border-b border-ink/30">
          <h2 className="font-display text-2xl md:text-4xl">En qué trabajo</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">/01</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-y md:divide-y-0">
          {offerings.map((o) => (
            <div key={o.title} className="p-6 md:p-10 group hover:bg-secondary transition-colors">
              <span className="font-mono text-xs text-accent">{o.n}</span>
              <h3 className="font-display text-xl md:text-2xl mt-3">{o.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {o.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="border-b border-ink">
        <div className="px-6 md:px-10 py-6 flex items-baseline justify-between border-b border-ink/30">
          <h2 className="font-display text-2xl md:text-4xl">Proyectos</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">/02</span>
        </div>

        {projects.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 px-6 md:px-10 py-6 border-b border-ink/30 last:border-b-0 hover:bg-secondary transition-colors"
          >
            <span className="font-mono text-sm text-accent">{p.n}</span>
            <div>
              <h3 className="font-display text-xl md:text-3xl">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
                {p.desc}
              </p>
              <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-widest border border-current px-2 py-0.5">
                {p.tag}
              </span>
            </div>
            <span className="font-display text-2xl md:text-4xl transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        ))}
      </section>

      {/* BLOG */}
      <section className="border-b border-ink">
        <div className="px-6 md:px-10 py-6 flex items-baseline justify-between border-b border-ink/30">
          <h2 className="font-display text-2xl md:text-4xl">Del blog</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">/03</span>
        </div>

        {posts.slice(0, 3).map((post, i) => (
          <Link
            key={post.href}
            href={post.href}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 px-6 md:px-10 py-6 border-b border-ink/30 last:border-b-0 hover:bg-secondary transition-colors"
          >
            <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {post.date} · {post.readTime} · {post.deco}
              </div>
              <h3 className="font-display text-lg md:text-2xl mt-1.5">{post.title}</h3>
            </div>
            <span className="font-display text-2xl md:text-4xl transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        ))}

        <div className="border-t border-ink/30 px-6 md:px-10 py-4">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
          >
            Ver todos los artículos ↗
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section>
        <Link
          href="/contact"
          className="group block px-6 md:px-10 py-14 md:py-20 hover:bg-secondary transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            /04 — Contacto
          </span>
          <p className="font-display text-[8vw] md:text-5xl lg:text-6xl mt-4">
            ¿Intercambiamos ideas?
            <span className="inline-block transition-transform group-hover:translate-x-3"> →</span>
          </p>
        </Link>
      </section>
    </main>
  )
}

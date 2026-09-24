import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"
import { posts } from "@/lib/posts"

type Metric = { k: string; v: string }
type Project = {
  title: string
  kind: string
  href: string
  desc: string
  metrics?: Metric[]
  bars?: { label: string; value: number; on?: boolean }[]
  tags: string[]
  links: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    title: "Predicción del desenlace en cirrosis",
    kind: "ML clínico · clasificación",
    href: "/projects/cirrhosis-survival-ml",
    desc: "Clasificación multiclase del desenlace de pacientes —vivo, trasplante o fallecido— sobre datos clínicos de Mayo Clinic, con balanceo por SMOTE y segmentación con K-Prototypes.",
    metrics: [
      { k: "F1 macro", v: "0.83" },
      { k: "accuracy", v: "82.9%" },
      { k: "modelos", v: "5" },
      { k: "clases", v: "3" },
    ],
    tags: ["scikit-learn", "SMOTE", "Random Forest", "K-Prototypes", "PCA"],
    links: [
      { label: "Ver caso →", href: "/projects/cirrhosis-survival-ml" },
      { label: "Notebook →", href: "/projects/cirrhosis-survival-ml/notebook" },
    ],
  },
  {
    title: "Fact-checking con RAG, cuando la evidencia no ayuda",
    kind: "NLP · RAG",
    href: "/projects/rag-fever-fact-checking",
    desc: "Verificación de afirmaciones sobre FEVER con Llama-3.2-3B: un baseline zero-shot contra un pipeline RAG completo (entidades → Wikipedia → FAISS). El RAG no superó al baseline; entender por qué es lo valioso.",
    bars: [
      { label: "Zero-shot", value: 65.4, on: true },
      { label: "RAG", value: 64.0 },
    ],
    tags: ["Llama-3.2-3B", "LangChain", "FAISS", "Wikipedia"],
    links: [
      { label: "Ver caso →", href: "/projects/rag-fever-fact-checking" },
      { label: "Notebook →", href: "/projects/rag-fever-fact-checking/notebook" },
    ],
  },
  {
    title: "Fine-tuning vs LLMs: el modelo pequeño gana",
    kind: "NLP · fine-tuning",
    href: "/projects/hate-speech-roberta-vs-llm",
    desc: "RoBERTa fine-tuneado (125M de parámetros) contra Llama-3.2-3B en zero-shot y few-shot para moderación de contenido en tres clases. El especializado supera por ~37 puntos al generalista.",
    metrics: [
      { k: "RoBERTa", v: "92%" },
      { k: "Llama zero-shot", v: "55%" },
      { k: "few-shot", v: "50%" },
    ],
    tags: ["RoBERTa", "Transformers", "Hugging Face"],
    links: [
      { label: "Ver caso →", href: "/projects/hate-speech-roberta-vs-llm" },
      { label: "Notebook →", href: "/projects/hate-speech-roberta-vs-llm/notebook" },
    ],
  },
  {
    title: "RAG para documentos",
    kind: "LLMs · RAG · demo",
    href: "/projects/rag-documents",
    desc: "Búsqueda semántica y respuestas con contexto sobre PDFs, pensado con mentalidad de producción: trazabilidad, citas por fragmento y evolución incremental.",
    tags: ["Embeddings", "Vector Search", "PDF"],
    links: [
      { label: "Ver caso →", href: "/projects/rag-documents" },
      { label: "Ver demo →", href: "/demo/pdf" },
    ],
  },
]

const help = [
  { term: "IA aplicada", desc: "LLMs, RAG y asistentes, con evaluación honesta de cuándo aportan valor y cuándo no." },
  { term: "Ciencia de datos", desc: "Exploración, modelado y validación con la métrica adecuada para cada problema." },
  { term: "Arquitectura de datos", desc: "Lo que pasa después del modelo: APIs, escala y operación en producción." },
]

const stack = [
  { label: "Procesamiento", items: ["PySpark", "OCI Dataflow", "cargas incrementales"] },
  { label: "IA / LLMs", items: ["RAG", "LangChain", "FAISS", "fine-tuning"] },
  { label: "Datos", items: ["Data Quality", "governance", "Python", "APIs · Django"] },
]

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      {/* HERO */}
      <section className="pt-14 pb-10">
        <div className="flex items-start justify-between gap-7">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent">
              Científico de Datos
            </p>
            <h1 className="font-display text-4xl md:text-5xl mt-3.5 max-w-[15ch] text-balance">
              Modelos que se sostienen fuera del notebook.
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong className="text-foreground font-semibold">Nikolas Cantillo</strong> · Principal
              Consultant en Oracle · Magíster en Ciencia de Datos, Pontificia Universidad Católica de
              Chile.
            </p>
            <p className="mt-4 max-w-[60ch] leading-7 text-foreground/85">
              Cinco años entre pipelines de datos, migraciones cloud y modelos de lenguaje. Trabajo
              con método: mido con la métrica correcta, documento lo que funciona y —sobre todo— lo
              que no. Cada caso de abajo enlaza a su notebook, ejecutable y verificable de principio a
              fin.
            </p>
          </div>
          <div className="relative hidden sm:block size-[68px] shrink-0 rounded-xl overflow-hidden border border-ink">
            <Image
              src="/nikolascantillo.jpeg"
              alt="Nikolas Cantillo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ver trabajos
          </Link>
        </div>
      </section>

      {/* TRABAJOS */}
      <section className="py-9 border-t border-border">
        <div className="flex items-baseline justify-between gap-3 mb-5">
          <h2 className="text-[15px] font-semibold">Trabajos seleccionados</h2>
          <span className="font-mono text-[13px] text-muted-foreground/70">
            4 casos · notebooks verificables
          </span>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group block border-b border-border py-5 ${i === 0 ? "pt-0" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-3.5 flex-wrap">
                <span className="text-[19px] font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {p.title}
                </span>
                <span className="font-mono text-xs text-muted-foreground/70 whitespace-nowrap">
                  {p.kind}
                </span>
              </div>

              <p className="mt-2 max-w-[62ch] text-[15px] text-muted-foreground">{p.desc}</p>

              {p.metrics && (
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-mono text-[13px]">
                  {p.metrics.map((m) => (
                    <span key={m.k}>
                      <span className="text-muted-foreground/70">{m.k}</span>{" "}
                      <span className="text-foreground font-medium">{m.v}</span>
                    </span>
                  ))}
                </div>
              )}

              {p.bars && (
                <div className="mt-3 space-y-2">
                  {p.bars.map((b) => (
                    <div
                      key={b.label}
                      className="grid grid-cols-[84px_1fr_46px] items-center gap-3 font-mono text-xs text-muted-foreground"
                    >
                      <span>{b.label}</span>
                      <span className="h-1.5 rounded bg-muted overflow-hidden">
                        <span
                          className={`block h-full rounded ${b.on ? "bg-accent" : "bg-muted-foreground/50"}`}
                          style={{ width: `${b.value}%` }}
                        />
                      </span>
                      <span className="text-right text-foreground">{b.value.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-muted-foreground border border-ink rounded px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3.5 flex flex-wrap gap-4 font-mono text-[13px] text-accent">
                {p.links.map((l) => (
                  <span key={l.label}>{l.label}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CÓMO PUEDO AYUDAR */}
      <section className="py-9 border-t border-border">
        <h2 className="text-[15px] font-semibold mb-5">Cómo puedo ayudar</h2>
        <dl className="grid gap-5">
          {help.map((h) => (
            <div key={h.term} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-5">
              <dt className="text-[15px] font-semibold">{h.term}</dt>
              <dd className="text-[15px] text-muted-foreground">{h.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* STACK */}
      <section className="py-9 border-t border-border">
        <h2 className="text-[15px] font-semibold mb-5">Stack</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          {stack.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-4 px-4 py-3 border-t border-border first:border-t-0"
            >
              <span className="text-sm font-semibold">{row.label}</span>
              <span className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13.5px] text-muted-foreground">
                {row.items.map((it) => (
                  <span key={it}>{it}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ESCRITOS */}
      <section className="py-9 border-t border-border">
        <div className="flex items-baseline justify-between gap-3 mb-5">
          <h2 className="text-[15px] font-semibold">Escritos</h2>
          <Link href="/blog" className="font-mono text-[13px] text-accent hover:underline underline-offset-4">
            Ver todos →
          </Link>
        </div>
        <div className="flex flex-col">
          {posts.slice(0, 4).map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex items-baseline justify-between gap-3.5 border-b border-border py-3.5"
            >
              <span className="text-[15.5px] font-medium group-hover:text-accent transition-colors">
                {post.title}
              </span>
              <span className="font-mono text-[12.5px] text-muted-foreground/70 whitespace-nowrap">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-9 border-t border-border">
        <h2 className="text-[15px] font-semibold mb-4">Contacto</h2>
        <p className="max-w-[58ch] text-muted-foreground leading-7">
          ¿Tienes un problema de datos? Cuéntame de qué se trata y te digo con franqueza si puedo
          ayudar y cómo lo abordaría. Disponible para consultoría y colaboración.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-sm">
          <a href="mailto:nikolacantillo@gmail.com" className="text-accent hover:underline underline-offset-4">
            nikolacantillo@gmail.com
          </a>
          <a
            href="https://github.com/nikocantillo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
            Formulario →
          </Link>
        </div>
      </section>
    </main>
  )
}

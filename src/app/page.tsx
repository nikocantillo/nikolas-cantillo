import Image from "next/image"
import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { posts } from "@/lib/posts"
import { SectionNav } from "@/components/section-nav"

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

const sections = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "trabajos", label: "Trabajos" },
  { id: "escritos", label: "Escritos" },
  { id: "enfoque", label: "Enfoque" },
  { id: "biografia", label: "Biografía" },
  { id: "contacto", label: "Contacto" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/nikocantillo", icon: Github },
  { label: "Email", href: "mailto:nikolacantillo@gmail.com", icon: Mail },
]

const stack = [
  { label: "Procesamiento", items: ["PySpark", "OCI Dataflow", "cargas incrementales"] },
  { label: "IA / LLMs", items: ["RAG", "LangChain", "FAISS", "fine-tuning"] },
  { label: "Datos", items: ["Data Quality", "governance", "Python", "APIs · Django"] },
]


export default function Home() {
  return (
    <main>
      <SectionNav items={sections} />

      {/* SOBRE MÍ — portada a pantalla completa */}
      <section
        id="sobre-mi"
        className="px-6 pt-28 pb-[15vh] md:min-h-screen md:flex md:flex-col md:justify-center"
      >
        <div className="mx-auto w-full max-w-[740px] lg:max-w-[900px]">
          <div className="relative size-[160px] md:size-[200px] rounded-full overflow-hidden">
            <Image
              src="/nikolascantillo.jpeg"
              alt="Nikolas Cantillo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="font-display mt-10 text-[clamp(2.75rem,5vw,4.5rem)]">Nikolas Cantillo</h1>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.25rem,1.9vw,1.75rem)] leading-snug">
            Científico de datos. Construyo modelos que se sostienen fuera del notebook.
          </p>
          <p className="mt-5 max-w-[60ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed text-foreground/75">
            Principal Consultant en Oracle y Magíster en Ciencia de Datos por la Pontificia
            Universidad Católica de Chile. Cinco años entre pipelines, migraciones cloud y modelos de
            lenguaje.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="inline-flex items-center rounded-full border border-black/15 p-4 transition-colors hover:border-accent/30 hover:bg-accent/5"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRABAJOS */}
      <section id="trabajos" className="px-6 py-[15vh]">
        <div className="mx-auto max-w-[740px] lg:max-w-[900px] xl:max-w-[1000px]">
          <h2 className="font-display text-[clamp(2rem,3vw,3rem)]">Trabajos</h2>
          <p className="mt-4 mb-14 max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.25rem)] text-foreground/75">
            Casos de ciencia de datos e IA, cada uno con su notebook ejecutable y verificable de
            principio a fin.
          </p>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-col rounded-[1.25rem] bg-card p-7 md:p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="text-[13px] uppercase tracking-[0.08em] text-foreground/55">
                  {p.kind}
                </span>
                <h3 className="font-display mt-3 text-[1.75rem] leading-tight group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-foreground/70">{p.desc}</p>

                {p.metrics && (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                    {p.metrics.map((m) => (
                      <span key={m.k}>
                        <span className="text-foreground/55">{m.k}</span>{" "}
                        <span className="font-medium">{m.v}</span>
                      </span>
                    ))}
                  </div>
                )}

                {p.bars && (
                  <div className="mt-5 space-y-2">
                    {p.bars.map((b) => (
                      <div
                        key={b.label}
                        className="grid grid-cols-[84px_1fr_46px] items-center gap-3 text-[13px] text-foreground/60"
                      >
                        <span>{b.label}</span>
                        <span className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <span
                            className={`block h-full rounded-full ${b.on ? "bg-accent" : "bg-foreground/30"}`}
                            style={{ width: `${b.value}%` }}
                          />
                        </span>
                        <span className="text-right text-foreground">{b.value.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/5 px-3 py-1 text-[12.5px] text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex flex-wrap gap-5 text-[14px] font-medium text-accent">
                  {p.links.map((l) => (
                    <span key={l.label}>{l.label}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/projects" className="pill-link">
              Todos los proyectos
            </Link>
          </div>
        </div>
      </section>

      {/* ESCRITOS */}
      <section id="escritos" className="px-6 pb-[15vh]">
        <div className="mx-auto max-w-[740px] lg:max-w-[900px] xl:max-w-[1000px]">
          <h2 className="font-display text-[clamp(2rem,3vw,3rem)]">Escritos</h2>
          <p className="mt-4 mb-14 max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.25rem)] text-foreground/75">
            Artículos sobre datos, arquitectura e inteligencia artificial.
          </p>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group flex flex-col rounded-[1.25rem] border border-black/10 p-7 transition-colors hover:bg-card"
              >
                <span className="text-[13px] uppercase tracking-[0.08em] text-foreground/55">
                  {post.tag}
                </span>
                <h3 className="font-display mt-3 text-[1.6rem] leading-tight group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/70 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-auto pt-5 text-[13.5px] text-foreground/55">
                  {post.date} · {post.readTime}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/blog" className="pill-link">
              Ver todos los escritos
            </Link>
          </div>
        </div>
      </section>

      {/* ENFOQUE */}
      <section id="enfoque" className="px-6 pb-[15vh]">
        <div className="mx-auto max-w-[740px] lg:max-w-[900px] xl:max-w-[1000px]">
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] max-w-[20ch]">
            Mido con la métrica correcta y documento también lo que no funciona.
          </h2>

          <dl className="mt-14 grid gap-10 md:grid-cols-3">
            {help.map((h) => (
              <div key={h.term}>
                <dt className="font-display text-[1.6rem]">{h.term}</dt>
                <dd className="mt-2 text-[16px] leading-relaxed text-foreground/65">{h.desc}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 border-t border-black/10">
            {stack.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 py-4 border-b border-black/10"
              >
                <span className="text-[15px] font-medium">{row.label}</span>
                <span className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-foreground/65">
                  {row.items.map((it) => (
                    <span key={it}>{it}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIOGRAFÍA */}
      <section id="biografia" className="px-6 pb-[15vh]">
        <div className="mx-auto max-w-[740px] lg:max-w-[900px]">
          <h2 className="font-display text-[clamp(2rem,3vw,3rem)]">Biografía</h2>
          <div className="mt-8 space-y-6 text-[clamp(1.1rem,1.4vw,1.35rem)] leading-relaxed">
            <p>
              Nikolas Cantillo es científico de datos y Principal Consultant en Oracle, donde trabaja
              con pipelines en PySpark y OCI Dataflow, cargas incrementales y migraciones de datos a
              la nube.
            </p>
            <p>
              Es Magíster en Ciencia de Datos por la Pontificia Universidad Católica de Chile. Sus
              trabajos académicos —RAG para verificación de hechos, fine-tuning frente a LLMs
              generalistas y ML clínico— están publicados en este sitio como{" "}
              <Link
                href="/projects"
                className="text-accent underline underline-offset-4 decoration-rust-light"
              >
                casos verificables
              </Link>
              .
            </p>
            <p>
              Hoy se mueve entre la ingeniería de datos y los modelos de lenguaje, con una obsesión:
              que lo que funciona en el notebook también funcione en producción.
            </p>
          </div>
          <div className="mt-10">
            <Link href="/about" className="pill-link">
              Trayectoria completa
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="px-6 pb-[15vh]">
        <div className="mx-auto max-w-[740px] lg:max-w-[900px]">
          <h2 className="font-display text-[clamp(2rem,3vw,3rem)]">Contacto</h2>
          <p className="mt-6 max-w-[52ch] text-[clamp(1.1rem,1.4vw,1.35rem)] leading-relaxed text-foreground/80">
            ¿Tienes un problema de datos? Cuéntame de qué se trata y te digo con franqueza si puedo
            ayudar y cómo lo abordaría. Disponible para consultoría y colaboración.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="mailto:nikolacantillo@gmail.com" className="pill-link">
              Escríbeme
            </a>
            <Link href="/contact" className="pill-link">
              Formulario
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

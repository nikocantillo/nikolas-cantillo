import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/effects/reveal"
import { CountUp } from "@/components/effects/count-up"

const pipeline = [
  {
    n: "01",
    title: "Extracción de entidades",
    desc: "Llama-3.2-3B identifica el título de Wikipedia central de cada claim, con fallback por regex de entidades nombradas.",
  },
  {
    n: "02",
    title: "Recuperación de Wikipedia",
    desc: "WikipediaLoader (LangChain) descarga el artículo por entidad, con cache en CSV para no repetir llamadas.",
  },
  {
    n: "03",
    title: "Base vectorial FAISS",
    desc: "Chunking recursivo (700 chars, overlap 80) + embeddings MiniLM-L6-v2 → 4.125 chunks indexados.",
  },
  {
    n: "04",
    title: "Clasificación con evidencia",
    desc: "Top-5 chunks por similitud se inyectan al prompt; el modelo responde solo SUPPORTS o REFUTES, decodificación determinística.",
  },
]

const metrics = [
  { label: "Accuracy", zs: 0.654, rag: 0.64 },
  { label: "Macro F1", zs: 0.653, rag: 0.638 },
  { label: "Recall SUPPORTS", zs: 0.616, rag: 0.52 },
  { label: "Recall REFUTES", zs: 0.692, rag: 0.76 },
]

const fmt = (v: number) => v.toFixed(3).replace(/0$/, "")

export default function RagFeverFactCheckingPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 py-14">
      {/* CABECERA */}
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Caso · NLP
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Magíster en Ciencia de Datos — UC Chile · FEVER · 500 claims
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-6xl mt-6 max-w-4xl text-balance">
          Fact-checking con RAG: cuando la <span className="text-shimmer">evidencia</span> no
          ayuda
        </h1>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
          Verificación automática de afirmaciones sobre el dataset FEVER: un baseline zero-shot
          con Llama-3.2-3B contra un pipeline RAG completo (entidades → Wikipedia → FAISS). El
          resultado honesto: el RAG no superó al baseline — y entender por qué es la parte más
          valiosa del trabajo.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Llama-3.2-3B", "LangChain", "FAISS", "Transformers", "Wikipedia"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CONTEXTO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        <Reveal className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            El problema
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            FEVER (Fact Extraction and VERification) es el dataset de referencia para
            fact-checking automático: afirmaciones generadas desde Wikipedia que deben
            clasificarse como <strong className="text-foreground">SUPPORTS</strong> o{" "}
            <strong className="text-foreground">REFUTES</strong> según la evidencia. Trabajé con
            una muestra balanceada de 500 claims (250 por clase): el azar rinde 50% y ninguna
            métrica se infla por desbalance.
          </p>
        </Reveal>
        <Reveal delay={120} className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            El experimento
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            Primero un baseline zero-shot: el modelo decide solo con su conocimiento
            paramétrico, prompt restrictivo y decodificación determinística (temperature 0).
            Después, el mismo modelo pero alimentado con evidencia real recuperada de Wikipedia
            vía una base vectorial FAISS. La hipótesis obvia: con evidencia debería mejorar.
          </p>
        </Reveal>
      </section>

      {/* PIPELINE */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            El pipeline RAG
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">Cuatro etapas, un cuello de botella.</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-7">
          {pipeline.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 100}
              className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 hover:border-accent/40 transition-colors"
            >
              <span className="font-mono text-sm text-violet">{step.n}</span>
              <h3 className="font-display text-base mt-3">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Resultados
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">La evidencia no alcanzó.</h2>
        </Reveal>

        {/* Cifras principales */}
        <div className="grid grid-cols-2 gap-4 mt-7">
          <Reveal className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Zero-shot · accuracy
            </p>
            <p className="font-display text-4xl md:text-6xl mt-3 tabular-nums">
              <CountUp value={65.4} decimals={1} className="text-violet" />%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">solo conocimiento paramétrico</p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              RAG · accuracy
            </p>
            <p className="font-display text-4xl md:text-6xl mt-3 tabular-nums">
              <CountUp value={64.0} decimals={1} className="text-accent" />%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">con evidencia de Wikipedia</p>
          </Reveal>
        </div>

        {/* Comparación por métrica */}
        <Reveal className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8 mt-4">
          <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2 rounded-full bg-violet" />
              Zero-shot
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2 rounded-full bg-accent" />
              RAG
            </span>
          </div>

          <div className="mt-6 space-y-5 max-w-3xl">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xs font-semibold uppercase tracking-widest">{m.label}</p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-none rounded-full bg-violet" style={{ width: `${m.zs * 80}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">{fmt(m.zs)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-none rounded-full bg-accent" style={{ width: `${m.rag * 80}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">{fmt(m.rag)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-3xl mt-8">
          <p className="leading-7 text-muted-foreground">
            El RAG <strong className="text-foreground">no superó al baseline</strong> (64.0% vs
            65.4%), pero el detalle importa: la evidencia recuperada mejoró la detección de
            afirmaciones falsas (recall de REFUTES: 0.692 → 0.760) y empeoró la confirmación de
            las verdaderas (recall de SUPPORTS: 0.616 → 0.520). Cuando el retrieval trae
            fragmentos parciales o poco alineados, el modelo interpreta la ausencia de evidencia
            como refutación.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            La conclusión de ingeniería: en un sistema RAG,{" "}
            <strong className="text-foreground">
              la calidad de la recuperación domina sobre la capacidad generativa del modelo
            </strong>
            . Chunking, embeddings, top-k y estrategia de consulta son el factor decisivo — no el
            LLM. Las mejoras con más potencial: recuperar por entidad, re-ranking de evidencia y
            chunks alineados a oraciones factuales.
          </p>
        </Reveal>
      </section>

      {/* VERIFICABLE */}
      <Reveal className="mt-16">
        <Link
          href="/projects/rag-fever-fact-checking/notebook"
          className="group relative block rounded-2xl border border-border bg-gradient-to-r from-accent/5 via-transparent to-violet/5 p-7 md:p-10 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
        >
          <ArrowUpRight className="absolute top-7 right-7 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Verifícalo tú mismo
          </p>
          <p className="font-display text-2xl md:text-4xl mt-3 pr-8">
            Ver el notebook, celda por celda →
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Código ejecutado, outputs reales y análisis, renderizados aquí mismo — del curso de
            Procesamiento de Lenguaje Natural del Magíster en Ciencia de Datos (Pontificia
            Universidad Católica de Chile).
          </p>
        </Link>
      </Reveal>

      {/* NAV */}
      <section className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="rounded-xl border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          ← Volver a proyectos
        </Link>
        <Link
          href="/blog/hashes-y-ciencia-de-datos-responsable"
          className="rounded-xl border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          Artículo relacionado: ciencia de datos responsable
        </Link>
      </section>
    </main>
  )
}

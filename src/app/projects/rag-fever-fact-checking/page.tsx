import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    <main>
      {/* CABECERA */}
      <section className="border-b border-ink px-6 md:px-10 py-10 md:py-14">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest flex justify-between flex-wrap gap-2 text-muted-foreground">
          <span>Caso / NLP · Magíster en Ciencia de Datos — UC Chile</span>
          <span className="text-accent">FEVER · 500 claims</span>
        </div>
        <h1 className="font-display text-3xl md:text-6xl mt-6 max-w-5xl">
          Fact-checking con RAG: cuando la evidencia no ayuda
        </h1>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
          Verificación automática de afirmaciones sobre el dataset FEVER: un baseline zero-shot
          con Llama-3.2-3B contra un pipeline RAG completo (entidades → Wikipedia → FAISS). El
          resultado honesto: el RAG no superó al baseline — y entender por qué es la parte más
          valiosa del trabajo.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Llama-3.2-3B", "LangChain", "FAISS", "Transformers", "Wikipedia"].map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      </section>

      {/* CONTEXTO */}
      <section className="border-b border-ink grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 md:p-10 md:border-r border-ink">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            /01 — El problema
          </span>
          <p className="mt-4 leading-7 text-muted-foreground">
            FEVER (Fact Extraction and VERification) es el dataset de referencia para
            fact-checking automático: afirmaciones generadas desde Wikipedia que deben
            clasificarse como <strong className="text-foreground">SUPPORTS</strong> o{" "}
            <strong className="text-foreground">REFUTES</strong> según la evidencia. Trabajé con
            una muestra balanceada de 500 claims (250 por clase), de modo que el azar rinde 50%
            y ninguna métrica se infla por desbalance.
          </p>
        </div>
        <div className="p-6 md:p-10">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            /02 — El experimento
          </span>
          <p className="mt-4 leading-7 text-muted-foreground">
            Primero un baseline zero-shot: el modelo decide solo con su conocimiento
            paramétrico, prompt restrictivo y decodificación determinística (temperature 0).
            Después, el mismo modelo pero alimentado con evidencia real recuperada de Wikipedia
            vía una base vectorial FAISS. La hipótesis obvia: con evidencia debería mejorar.
          </p>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="border-b border-ink">
        <div className="px-6 md:px-10 py-6 border-b border-ink/30 flex items-baseline justify-between">
          <h2 className="font-display text-2xl md:text-4xl">El pipeline RAG</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">/03</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x divide-y md:divide-y-0">
          {pipeline.map((step) => (
            <div key={step.n} className="p-6 md:p-8">
              <span className="font-mono text-xs text-accent">{step.n}</span>
              <h3 className="font-display text-lg mt-3">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="border-b border-ink">
        <div className="px-6 md:px-10 py-6 border-b border-ink/30 flex items-baseline justify-between">
          <h2 className="font-display text-2xl md:text-4xl">Resultados</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">/04</span>
        </div>

        {/* Cifras principales */}
        <div className="grid grid-cols-2 md:divide-x divide-y-0 border-b border-ink/30">
          <div className="p-6 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Zero-shot · accuracy
            </p>
            <p className="font-display text-5xl md:text-7xl mt-3">65.4%</p>
            <p className="mt-2 text-sm text-muted-foreground">solo conocimiento paramétrico</p>
          </div>
          <div className="p-6 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              RAG · accuracy
            </p>
            <p className="font-display text-5xl md:text-7xl mt-3 text-accent">64.0%</p>
            <p className="mt-2 text-sm text-muted-foreground">con evidencia de Wikipedia</p>
          </div>
        </div>

        {/* Comparación por métrica */}
        <div className="px-6 md:px-10 py-8">
          <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2.5 border border-ink" />
              Zero-shot
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2.5 bg-accent" />
              RAG
            </span>
          </div>

          <div className="mt-6 space-y-5 max-w-3xl">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="font-mono text-xs uppercase tracking-widest">{m.label}</p>
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 border border-ink" style={{ width: `${m.zs * 100}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {fmt(m.zs)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 bg-accent" style={{ width: `${m.rag * 100}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {fmt(m.rag)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 py-8 border-t border-ink/30 max-w-3xl">
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
        </div>
      </section>

      {/* VERIFICABLE */}
      <section className="border-b border-ink">
        <Link
          href="/projects/rag-fever-fact-checking/notebook"
          className="group block px-6 md:px-10 py-10 md:py-12 hover:bg-secondary transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            /05 — Verifícalo tú mismo
          </span>
          <p className="font-display text-2xl md:text-4xl mt-4">
            Ver el notebook, celda por celda
            <span className="inline-block transition-transform group-hover:translate-x-2"> →</span>
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Código ejecutado, outputs reales y análisis, renderizados aquí mismo — del curso de
            Procesamiento de Lenguaje Natural del Magíster en Ciencia de Datos (Pontificia
            Universidad Católica de Chile).
          </p>
        </Link>
      </section>

      {/* NAV */}
      <section className="px-6 md:px-10 py-8 flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link href="/projects">← Volver a proyectos</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog/hashes-y-ciencia-de-datos-responsable">
            Artículo relacionado: ciencia de datos responsable
          </Link>
        </Button>
      </section>
    </main>
  )
}

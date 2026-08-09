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
  { label: "Accuracy", zeroshot: "65.4%", rag: "64.0%" },
  { label: "Macro F1", zeroshot: "0.653", rag: "0.638" },
  { label: "Recall SUPPORTS", zeroshot: "0.616", rag: "0.520" },
  { label: "Recall REFUTES", zeroshot: "0.692", rag: "0.760" },
]

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

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-ink/30 text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="text-left px-6 md:px-10 py-3 font-medium">Métrica</th>
                <th className="text-right px-6 py-3 font-medium">Zero-shot</th>
                <th className="text-right px-6 md:pr-10 py-3 font-medium">RAG</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m.label} className="border-b border-ink/20 last:border-b-0">
                  <td className="px-6 md:px-10 py-3">{m.label}</td>
                  <td className="text-right px-6 py-3">{m.zeroshot}</td>
                  <td className="text-right px-6 md:pr-10 py-3 text-accent">{m.rag}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <section className="border-b border-ink px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            /05 — Verifícalo tú mismo
          </span>
          <p className="mt-3 leading-7 text-muted-foreground">
            El notebook completo — código ejecutado, métricas y análisis — está disponible tal
            cual fue entregado en el curso de Procesamiento de Lenguaje Natural del Magíster en
            Ciencia de Datos (Pontificia Universidad Católica de Chile).
          </p>
        </div>
        <Button asChild size="lg">
          <a href="/notebooks/rag-fever-fact-checking-nikolas-cantillo.ipynb" download>
            Descargar notebook ↓
          </a>
        </Button>
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

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/effects/reveal"
import { CountUp } from "@/components/effects/count-up"

const approaches = [
  {
    n: "01",
    title: "RoBERTa fine-tuneado",
    desc: "roberta-base entrenado con ~20k tweets etiquetados: tokenización, Trainer de Hugging Face y evaluación sobre 4.957 ejemplos de test.",
  },
  {
    n: "02",
    title: "Llama-3.2-3B zero-shot",
    desc: "El LLM clasifica sin ejemplos, solo con un prompt restrictivo de moderación que fuerza la salida a un id de clase.",
  },
  {
    n: "03",
    title: "Llama-3.2-3B few-shot",
    desc: "Mismo LLM pero con ejemplos balanceados por clase inyectados en el prompt, seleccionados del set de entrenamiento.",
  },
]

const metrics = [
  { label: "Accuracy", roberta: 0.92, zs: 0.55, fs: 0.5 },
  { label: "Macro F1", roberta: 0.77, zs: 0.498, fs: 0.44 },
]

export default function HateSpeechRobertaVsLlmPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 py-14">
      {/* CABECERA */}
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Caso · NLP
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Moderación de contenido · ~25k tweets · 3 clases
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-6xl mt-6 max-w-4xl text-balance">
          Fine-tuning vs LLMs: el modelo <span className="text-shimmer">pequeño</span> gana
        </h1>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
          Clasificación de tweets en tres clases — hate speech, ofensivo o ninguno — comparando
          un RoBERTa fine-tuneado contra Llama-3.2-3B en zero-shot y few-shot. El resultado va
          contra la intuición de la era LLM: el modelo especializado de 125M de parámetros
          supera por ~37 puntos de accuracy al LLM generalista. Y el few-shot, que "debería"
          ayudar, empeoró las cosas.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["RoBERTa", "Llama-3.2-3B", "Transformers", "Hugging Face", "Fine-tuning"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ENFOQUES */}
      <section className="mt-14">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Tres enfoques, misma tarea
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Entrenar, pedir, o pedir con ejemplos.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          {approaches.map((a, i) => (
            <Reveal
              key={a.n}
              delay={i * 100}
              className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 hover:border-accent/40 transition-colors"
            >
              <span className="font-mono text-sm text-violet">{a.n}</span>
              <h3 className="font-display text-base mt-3">{a.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{a.desc}</p>
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
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">No hubo contienda.</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          <Reveal className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              RoBERTa fine-tuneado
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <CountUp value={92} className="text-accent" />%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">accuracy · 4.957 tweets de test</p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Llama-3.2-3B zero-shot
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <CountUp value={55} className="text-violet" />%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">accuracy · muestra balanceada</p>
          </Reveal>
          <Reveal delay={240} className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Llama-3.2-3B few-shot
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <CountUp value={50} className="text-amber" />%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">accuracy · con ejemplos, y peor</p>
          </Reveal>
        </div>

        {/* Barras comparativas */}
        <Reveal className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8 mt-4">
          <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2 rounded-full bg-accent" />
              RoBERTa
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2 rounded-full bg-violet" />
              Zero-shot
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-6 h-2 rounded-full bg-amber" />
              Few-shot
            </span>
          </div>

          <div className="mt-6 space-y-6 max-w-3xl">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xs font-semibold uppercase tracking-widest">{m.label}</p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-none rounded-full bg-accent" style={{ width: `${m.roberta * 80}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">{m.roberta.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-none rounded-full bg-violet" style={{ width: `${m.zs * 80}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">{m.zs.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-none rounded-full bg-amber" style={{ width: `${m.fs * 80}%` }} />
                    <span className="font-mono text-xs text-muted-foreground shrink-0">{m.fs.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-3xl mt-8">
          <p className="leading-7 text-muted-foreground">
            La lectura fina importa más que el titular. El punto débil de{" "}
            <strong className="text-foreground">todos</strong> los enfoques fue la clase hate
            speech: RoBERTa logró F1 0.46 (el desbalance pesa — solo 286 de 4.957 ejemplos), y
            el LLM fue extremadamente conservador: precisión 1.0 pero recall 0.10 — solo
            etiquetó odio cuando era obvio, y usó "ofensivo" como categoría por defecto para
            todo lo agresivo.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            Y el hallazgo menos intuitivo:{" "}
            <strong className="text-foreground">few-shot empeoró al zero-shot</strong> (0.50 vs
            0.55). Los ejemplos en el prompt no le enseñaron los límites entre clases; le
            agregaron ruido. La conclusión de ingeniería: para clasificación especializada con
            datos etiquetados disponibles, un modelo pequeño fine-tuneado sigue siendo más
            preciso, más barato y más rápido que un LLM generalista — el LLM conviene cuando no
            hay datos o la taxonomía cambia constantemente.
          </p>
        </Reveal>
      </section>

      {/* VERIFICABLE */}
      <Reveal className="mt-16">
        <Link
          href="/projects/hate-speech-roberta-vs-llm/notebook"
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
            Código de entrenamiento, prompts y métricas reales renderizados aquí mismo. Los
            outputs con tweets crudos se omiten por contener lenguaje ofensivo.
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
          href="/projects/rag-fever-fact-checking"
          className="rounded-xl border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          Caso relacionado: fact-checking con RAG
        </Link>
      </section>
    </main>
  )
}

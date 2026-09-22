import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/effects/reveal"

const stages = [
  {
    n: "01",
    title: "Exploración clínica",
    desc: "Dataset de cirrosis de Mayo Clinic: análisis de variables numéricas (bilirrubina, albúmina, protrombina) y categóricas frente al desenlace del paciente, con correlaciones y selección de predictores.",
  },
  {
    n: "02",
    title: "Clasificación con desbalance",
    desc: "Se aplica SMOTE para balancear las clases y se comparan cinco clasificadores —Logistic Regression, Random Forest, Decision Tree, Gradient Boosting y SVM— midiendo accuracy y F1 macro.",
  },
  {
    n: "03",
    title: "Segmentación de pacientes",
    desc: "KMeans y K-Prototypes (para datos mixtos numérico-categóricos), con visualización en 2D vía PCA, para descubrir perfiles de paciente sin usar la etiqueta de desenlace.",
  },
]

// Comparación de clasificadores con SMOTE (test). Accuracy y F1 macro.
const models = [
  { name: "Random Forest", acc: 0.829, f1: 0.829, color: "bg-accent" },
  { name: "Gradient Boosting", acc: 0.776, f1: 0.775, color: "bg-violet" },
  { name: "Decision Tree", acc: 0.664, f1: 0.662, color: "bg-violet" },
  { name: "Support Vector Machine", acc: 0.579, f1: 0.553, color: "bg-violet" },
  { name: "Logistic Regression", acc: 0.566, f1: 0.565, color: "bg-amber" },
]

export default function CirrhosisSurvivalMlPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 py-14">
      {/* CABECERA */}
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Caso · ML clínico
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Cirrosis · Mayo Clinic · clasificación multiclase + clustering
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-6xl mt-6 max-w-4xl text-balance">
          Predecir el desenlace de pacientes con cirrosis
        </h1>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
          Sobre el dataset clínico de cirrosis biliar de Mayo Clinic, un pipeline que clasifica el
          desenlace de cada paciente en tres estados —sigue vivo, recibió trasplante o falleció— a
          partir de variables de laboratorio y clínicas. Un problema desbalanceado y real: se usa
          SMOTE para equilibrar las clases, se comparan cinco modelos y, en paralelo, se segmenta a
          los pacientes con clustering para encontrar perfiles sin mirar la etiqueta.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["scikit-learn", "SMOTE", "Random Forest", "K-Prototypes", "PCA", "imbalanced-learn"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          Proyecto de curso en equipo · Magíster en Ciencia de Datos, UC Chile
        </p>
      </section>

      {/* ETAPAS */}
      <section className="mt-14">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            El problema, en tres frentes
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Explorar, clasificar, y segmentar.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          {stages.map((a, i) => (
            <Reveal
              key={a.n}
              delay={i * 100}
              className="rounded-2xl border border-border bg-secondary/30 p-6 hover:border-accent/40 transition-colors"
            >
              <span className="font-mono text-sm text-violet">{a.n}</span>
              <h3 className="font-display text-base mt-3">{a.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{a.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESULTADOS CLASIFICACIÓN */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Clasificación
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Random Forest, por amplio margen.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          <Reveal className="rounded-2xl border border-accent/40 bg-secondary/30 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Accuracy
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <span className="text-accent">82.9</span>%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Random Forest · 3 clases</p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              F1 macro
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <span className="text-violet">0.83</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">promedio no ponderado entre clases</p>
          </Reveal>
          <Reveal delay={240} className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Modelos comparados
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <span className="text-amber">5</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">sobre clases balanceadas con SMOTE</p>
          </Reveal>
        </div>

        {/* Barras comparativas de F1 macro */}
        <Reveal className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8 mt-4">
          <p className="text-xs font-semibold uppercase tracking-widest">
            F1 macro por modelo · mayor es mejor
          </p>
          <div className="mt-6 space-y-3 max-w-3xl">
            {models.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-xs text-muted-foreground">{m.name}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className={`h-2 rounded-full ${m.color}`}
                    style={{ width: `${m.f1 * 100}%` }}
                  />
                  <span className="font-mono text-xs text-muted-foreground shrink-0 tabular-nums">
                    {m.f1.toFixed(3)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-3xl mt-8">
          <p className="leading-7 text-muted-foreground">
            Random Forest superó a Gradient Boosting, árbol de decisión, SVM y regresión logística
            en las cuatro métricas. La clave no fue solo el modelo: la clase "fallecido" y la de
            "trasplante" estaban fuertemente subrepresentadas frente a la de pacientes vivos, y sin
            corregir ese desbalance cualquier clasificador tiende a apostar siempre por la clase
            mayoritaria. <strong className="text-foreground">SMOTE</strong> generó ejemplos
            sintéticos de las clases minoritarias y elevó el F1 macro, que es la métrica honesta
            cuando importan todas las clases por igual —y en un contexto clínico, la clase que
            menos aparece suele ser la que más pesa.
          </p>
        </Reveal>
      </section>

      {/* CLUSTERS */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Segmentación
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">Perfiles que la clínica reconoce.</h2>
        </Reveal>
        <Reveal className="max-w-3xl mt-6">
          <p className="leading-7 text-muted-foreground">
            En paralelo, sin usar la etiqueta de desenlace, se segmentó a los pacientes con KMeans y
            con <strong className="text-foreground">K-Prototypes</strong> —que maneja variables
            numéricas y categóricas a la vez, algo que KMeans no puede—. Al proyectar los grupos con
            PCA, la primera componente principal queda dominada por la{" "}
            <strong className="text-foreground">bilirrubina, la protrombina y la albúmina</strong>:
            exactamente los marcadores de función hepática que un especialista usaría para estratificar
            gravedad. Que el modelo no supervisado redescubra esa estructura clínica es la mejor señal
            de que la segmentación captura algo real, no ruido.
          </p>
        </Reveal>
      </section>

      {/* VERIFICABLE */}
      <Reveal className="mt-16">
        <Link
          href="/projects/cirrhosis-survival-ml/notebook"
          className="group relative block rounded-2xl border border-border bg-secondary/30 p-7 md:p-10 transition-colors hover:border-accent/40"
        >
          <ArrowUpRight className="absolute top-7 right-7 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Verifícalo tú mismo
          </p>
          <p className="font-display text-2xl md:text-4xl mt-3 pr-8">
            Ver el notebook, celda por celda →
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Exploración, balanceo con SMOTE, comparación de clasificadores y clustering renderizados
            aquí mismo con el código y los resultados reales.
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
          href="/projects/hate-speech-roberta-vs-llm"
          className="rounded-xl border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          Caso relacionado: fine-tuning vs LLMs
        </Link>
      </section>
    </main>
  )
}

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/effects/reveal"
import { CountUp } from "@/components/effects/count-up"

const stages = [
  {
    n: "01",
    title: "Exploración y limpieza",
    desc: "NHANES 2015-2016: análisis de nulos (se descartan variables con >25% de NaN), tratamiento de outliers por IQR, correlaciones, ANOVA y pairplots sobre variables clínicas y demográficas.",
  },
  {
    n: "02",
    title: "Regresión supervisada",
    desc: "Se compara Linear Regression, Random Forest, Gradient Boosting, SVM y KNN con validación cruzada de 5 pliegues, y se ajustan hiperparámetros con GridSearchCV para predecir el IMC.",
  },
  {
    n: "03",
    title: "Segmentación no supervisada",
    desc: "KMeans sobre variables escaladas, con número de clústeres elegido por método del codo y silueta, y visualización en 2D vía PCA para perfilar los grupos de población.",
  },
]

// MSE por validación cruzada (menor es mejor).
const modelScores = [
  { name: "Linear Regression", mse: 0.3855, color: "bg-accent" },
  { name: "Gradient Boosting", mse: 0.6349, color: "bg-violet" },
  { name: "Random Forest", mse: 0.7244, color: "bg-violet" },
  { name: "Support Vector Machine", mse: 0.7286, color: "bg-violet" },
  { name: "K-Nearest Neighbors", mse: 2.9682, color: "bg-amber" },
]

const maxMse = 2.9682

export default function NhanesBmiMlPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 py-14">
      {/* CABECERA */}
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Caso · ML end-to-end
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            NHANES 2015-2016 · salud pública · supervisado + no supervisado
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-6xl mt-6 max-w-4xl text-balance">
          Prediciendo el <span className="text-shimmer">índice de masa corporal</span> con datos de salud pública
        </h1>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
          Un pipeline completo sobre la encuesta NHANES del CDC: desde la limpieza de una base
          real con miles de encuestados hasta un modelo de regresión que predice el IMC y una
          segmentación de la población en perfiles de salud. Dos enfoques paralelos —uno que
          elimina los datos faltantes y otro que los conserva como categoría— para medir cuánto
          cambia el resultado según cómo se traten los NaN.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["scikit-learn", "KMeans", "PCA", "GridSearchCV", "pandas", "ANOVA"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ETAPAS */}
      <section className="mt-14">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Tres etapas, una base de datos
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Limpiar, predecir, y luego segmentar.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          {stages.map((a, i) => (
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

      {/* RESULTADOS SUPERVISADO */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Regresión
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            El modelo más simple ganó.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          <Reveal className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              R² en test
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <CountUp value={98.9} decimals={1} className="text-accent" />%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              varianza del IMC explicada · Linear Regression
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              MSE en test
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <CountUp value={0.37} decimals={2} className="text-violet" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">error cuadrático medio sobre el IMC</p>
          </Reveal>
          <Reveal delay={240} className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Modelos comparados
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <CountUp value={5} className="text-amber" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">evaluados con 5-fold cross-validation</p>
          </Reveal>
        </div>

        {/* Barras comparativas de MSE */}
        <Reveal className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-8 mt-4">
          <p className="text-xs font-semibold uppercase tracking-widest">
            MSE por validación cruzada · menor es mejor
          </p>
          <div className="mt-6 space-y-3 max-w-3xl">
            {modelScores.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-xs text-muted-foreground">{m.name}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className={`h-2 rounded-full ${m.color}`}
                    style={{ width: `${(m.mse / maxMse) * 100}%` }}
                  />
                  <span className="font-mono text-xs text-muted-foreground shrink-0 tabular-nums">
                    {m.mse.toFixed(4)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-3xl mt-8">
          <p className="leading-7 text-muted-foreground">
            La regresión lineal batió a Random Forest, Gradient Boosting, SVM y KNN. Tiene una
            explicación honesta: entre los predictores están el peso, la altura, la circunferencia
            de cintura y el perímetro de brazo — variables que definen o correlacionan casi
            mecánicamente con el IMC. Con relaciones tan lineales, un modelo lineal no solo basta:
            gana en sesgo, en costo y en interpretabilidad frente a los ensembles.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            El segundo enfoque —que conserva las respuestas "no sabe / no responde" como categoría
            en lugar de borrarlas— llegó a un R² de <strong className="text-foreground">0.9894</strong>,
            prácticamente idéntico. La lección de ingeniería: cuando la señal es fuerte, la decisión
            sobre los faltantes casi no mueve la aguja predictiva, pero sí conserva tamaño muestral y
            representatividad de subgrupos, que es lo que importa en datos de salud pública.
          </p>
        </Reveal>
      </section>

      {/* CLUSTERS */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Segmentación
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">Cuatro perfiles de población.</h2>
        </Reveal>
        <Reveal className="max-w-3xl mt-6">
          <p className="leading-7 text-muted-foreground">
            Con el número de clústeres elegido por método del codo y puntuación de silueta, KMeans
            separó a los encuestados en cuatro grupos, proyectados en 2D con PCA. Los perfiles no son
            arbitrarios: un clúster concentra el ingreso familiar más alto y mayor nivel educativo,
            mientras otro agrupa a la población de mayor edad con la presión sistólica más elevada. La
            edad, el ingreso, la educación y el acceso a seguro médico son las variables que más
            diferencian a los grupos — un mapa útil para orientar políticas de salud por segmento.
          </p>
        </Reveal>
      </section>

      {/* VERIFICABLE */}
      <Reveal className="mt-16">
        <Link
          href="/projects/nhanes-bmi-ml/notebook"
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
            Limpieza, gráficos exploratorios, comparación de modelos y clustering renderizados aquí
            mismo con el código y los resultados reales.
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

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/effects/reveal"

export const metadata = {
  title: "Riesgo de precios bajos de la papa Yungay · Nikolas Cantillo",
  description:
    "Quince modelos contra ARIMA en el precio mayorista de la papa Yungay (Lima): ninguno gana en el pronóstico puntual, pero una banda DeepAR calibrada y una alarma P(precio < T) sí sirven para decidir.",
}

const stages = [
  {
    n: "01",
    title: "Panel multifuente",
    desc: "Precio mayorista de la papa Yungay en EMMSA-Lima (2000–2026) cruzado con ocho fuentes: clima ERA5-Land, NDVI MODIS, ENSO, tipo de cambio, inflación e indicadores del Banco Mundial, cada una con su rezago de publicación para no filtrar información del futuro.",
  },
  {
    n: "02",
    title: "Bake-off riguroso",
    desc: "Quince modelos —ARIMA, SARIMAX, XGBoost, LSTM, N-HiTS, NBEATSx, TiDE, DeepAR, TFT y Chronos zero-shot— a 150 días sobre 41 orígenes rolling-origin, con purged CV, IC block-bootstrap, Diebold-Mariano, corrección de Holm y TOST.",
  },
  {
    n: "03",
    title: "Del punto al riesgo",
    desc: "Si el nivel no se puede predecir, su distribución sí: DeepAR produce una banda P10–P90 y una probabilidad P(precio < T) de mes no rentable, que una capa de costo asimétrico convierte en una regla de acción.",
  },
]

// Bake-off multi-origen (n = 41, h = 150 días). MAE en S/kg, menor es mejor.
const models = [
  { name: "Chronos-2 (zero-shot)", mae: 0.355, color: "bg-violet" },
  { name: "LSTM univariado", mae: 0.383, color: "bg-violet" },
  { name: "ARIMA(1,0,3)", mae: 0.385, color: "bg-accent" },
  { name: "XGBoost (purgado)", mae: 0.404, color: "bg-violet" },
  { name: "Persistencia", mae: 0.425, color: "bg-amber" },
  { name: "NBEATSx", mae: 0.442, color: "bg-violet" },
  { name: "TiDE", mae: 0.464, color: "bg-violet" },
  { name: "D-Linear", mae: 0.52, color: "bg-violet" },
]
const MAX_MAE = 0.6

export default function YungayPriceRiskPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-8 py-14">
      {/* CABECERA */}
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Caso · Series de tiempo
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Papa Yungay · EMMSA Lima · pronóstico probabilístico
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-6xl mt-6 max-w-4xl text-balance">
          Cuando el precio no se puede predecir, el riesgo sí
        </h1>
        <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">
          Pronosticar a cinco meses el precio mayorista de la papa Yungay en Lima. Tras enfrentar
          quince modelos —clásicos, de deep learning y fundacionales— bajo un protocolo estricto,
          ninguno supera de forma robusta a un ARIMA: la serie se comporta casi como una caminata
          aleatoria. En lugar de seguir persiguiendo el número exacto, el proyecto replantea el
          entregable: una banda de cuantiles calibrada y una alarma de precios no rentables que
          sí ayudan a decidir a un productor o comprador.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["ARIMA", "DeepAR", "Chronos", "neuralforecast", "XGBoost", "Diebold-Mariano", "block-bootstrap"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ),
          )}
        </div>
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          Actividad Final de Graduación en equipo · Magíster en Ciencia de Datos, UC Chile · julio 2026
        </p>
      </section>

      {/* ETAPAS */}
      <section className="mt-14">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            El proyecto, en tres pasos
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Integrar, competir, y replantear.
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

      {/* BAKE-OFF */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Pronóstico puntual
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Ningún modelo le gana a ARIMA.
          </h2>
        </Reveal>

        <Reveal className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8 mt-7">
          <p className="text-xs font-semibold uppercase tracking-widest">
            MAE a 150 días (S/kg) · 41 orígenes · menor es mejor
          </p>
          <div className="mt-6 space-y-3 max-w-3xl">
            {models.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-32 sm:w-48 shrink-0 text-xs text-muted-foreground">{m.name}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className={`h-2 rounded-full ${m.color}`}
                    style={{ width: `${(m.mae / MAX_MAE) * 100}%` }}
                  />
                  <span className="font-mono text-xs text-muted-foreground shrink-0 tabular-nums">
                    {m.mae.toFixed(3)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Selección de 8 de los 17 modelos y baselines evaluados.
          </p>
        </Reveal>

        <Reveal className="max-w-3xl mt-8 space-y-5">
          <p className="leading-7 text-muted-foreground">
            Solo Chronos-2 y un LSTM univariado quedan por debajo de ARIMA, y por márgenes que el
            test de Diebold-Mariano no distingue del ruido: tras la corrección de Holm, ningún modelo
            difiere significativamente de la referencia (todos los p ≥ 0.08). La explicación está en
            la serie misma: su autocorrelación a un rezago es{" "}
            <strong className="text-foreground">0.9934</strong> y la razón de varianzas es compatible
            con una caminata aleatoria. A cinco meses el mejor pronóstico se parece mucho al último
            precio, y ARIMA ya lo aproxima sin costo.
          </p>
          <p className="leading-7 text-muted-foreground">
            La lección más transferible vino de una auditoría: en la fase preliminar, un XGBoost
            parecía el gran ganador con un MAE de 0.068. Era{" "}
            <strong className="text-foreground">fuga de target</strong>: filas cuyo valor futuro
            aún no era observable en el origen. Con purged CV su MAE sube a 0.404, seis veces peor y
            en línea con el resto. Una fuga sutil convierte un modelo mediocre en campeón aparente.
          </p>
        </Reveal>
      </section>

      {/* RIESGO */}
      <section className="mt-16">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
            Pronóstico probabilístico
          </p>
          <h2 className="font-display text-2xl md:text-3xl mt-2.5">
            Una alarma calibrada de precios bajos.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          <Reveal className="rounded-2xl border border-accent/40 bg-secondary/30 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Brier de la alarma
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <span className="text-accent">0.104</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              vs 0.310 de la climatología · menor es mejor
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Cobertura bajo P20
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <span className="text-violet">0.203</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">nominal 0.20 · 305 casos fuera de muestra</p>
          </Reveal>
          <Reveal delay={240} className="rounded-2xl border border-border bg-secondary/30 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Ahorro de costo
            </p>
            <p className="font-display text-4xl md:text-5xl mt-3 tabular-nums">
              <span className="text-amber">≈37</span>%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">vs ignorar el riesgo · backtest pre-2021</p>
          </Reveal>
        </div>

        <Reveal className="max-w-3xl mt-8 space-y-5">
          <p className="leading-7 text-muted-foreground">
            A un productor no le sirve tanto el precio exacto como saber cuán probable es que caiga
            bajo su costo (<code className="font-mono text-sm">precio &lt; T</code>) y hasta dónde
            podría bajar en un escenario pesimista. DeepAR modela una distribución completa en cada
            mes, y de ella salen la banda P10/P20/P50/P90 y la probabilidad de mes no rentable. La
            banda está <strong className="text-foreground">bien calibrada</strong>: cuando dice
            “con 80% de confianza no bajará de P20”, acierta con esa frecuencia.
          </p>
          <p className="leading-7 text-muted-foreground">
            Hay matices que el caso no esconde. En el régimen actual los meses bajo 0.8 S/kg son
            raros (~5%) y, en ese umbral, la alarma no supera a “nunca alarmar”; su valor aparece
            desde T ≥ 0.9, con un Brier Skill Score de 0.4–0.5. En el régimen pre-2021, donde los
            precios bajos sí eran frecuentes, el BSS es 0.279 (IC95 [0.16, 0.40]) y, con un costo
            asimétrico 5:1 entre perder un mes malo y una falsa alarma, actuar según la alarma
            reduce cerca de 37% el costo esperado.
          </p>
          <p className="leading-7 text-muted-foreground">
            En el pronóstico operativo de 2026, el modelo solo asignó riesgo a enero (13%) y cerca de
            1% al resto de los meses. Ningún mes cayó bajo 0.8: no hubo falsos avisos de precio bajo.
          </p>
        </Reveal>
      </section>

      {/* VERIFICABLE */}
      <Reveal className="mt-16">
        <Link
          href="/projects/yungay-price-risk/notebook"
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
            El capítulo de riesgo: umbral de rentabilidad, calibración de la banda, alarma frente a
            la climatología, pronóstico 2026, decisión con costo asimétrico y pruebas de robustez,
            con el código y los gráficos reales.
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
          href="/projects/cirrhosis-survival-ml"
          className="rounded-xl border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
        >
          Caso relacionado: ML clínico con datos desbalanceados
        </Link>
      </section>
    </main>
  )
}

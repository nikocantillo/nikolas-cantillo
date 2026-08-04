import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShareActions } from "@/components/blog/share-actions"
import { ReadingProgress } from "@/components/blog/reading-progress"

export default function AiYLosVedasPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <ReadingProgress />
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary">AI / Astrologia</Badge>
          <span className="text-sm text-muted-foreground">Abr 2026 · 8 min de lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4">
          AI y astrologia vedica: entre tradicion, datos y criterio
        </h1>

        <ShareActions
          title="AI y astrologia vedica: entre tradicion, datos y criterio"
          path="/blog/ai-y-los-vedas"
        />

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Hablar de AI y astrologia vedica puede sonar provocador: por un lado tenemos modelos,
          datos y estadistica; por el otro, una tradicion simbolica milenaria como Jyotish. Pero
          justo ahi aparece una conversacion interesante: que puede aportar la inteligencia
          artificial para organizar, analizar y estudiar patrones en este campo, y donde estan sus
          limites.
        </p>

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Este articulo no intenta validar ni invalidar creencias personales. El objetivo es
          tecnico-practico: pensar como un sistema de AI podria trabajar con datos de astrologia
          vedica de forma responsable, transparente y sin prometer certezas que no puede sostener.
        </p>
      </div>

      <Separator className="my-10" />

      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6 md:p-8 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1) Donde AI si puede aportar valor</h2>
            <p className="text-muted-foreground leading-7">
              En astrologia vedica hay volumen de informacion: cartas natales, transitos, dashas,
              combinaciones de casas, planetas y periodos. AI puede ayudar a estructurar este
              universo de variables y detectar regularidades que, manualmente, tomarian mucho tiempo
              de revisar.
            </p>
            <p className="text-muted-foreground leading-7">
              Por ejemplo, un sistema puede agrupar miles de casos historicos por configuraciones
              similares y mostrar patrones frecuentes en areas como carrera, relaciones o periodos
              de cambio. Eso no reemplaza al analista humano, pero si puede acelerar insight.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2) El principal riesgo: confundir patron con destino</h2>
            <p className="text-muted-foreground leading-7">
              El problema aparece cuando un modelo probabilistico se comunica como una verdad
              absoluta. AI trabaja con probabilidades y correlaciones, no con certezas metafisicas.
              Si una plataforma entrega predicciones deterministas, puede generar dependencia,
              ansiedad o malas decisiones personales.
            </p>
            <p className="text-muted-foreground leading-7">
              Por eso, la interfaz importa tanto como el modelo: hay que mostrar rangos,
              incertidumbre y recomendaciones de uso responsable. La narrativa del producto define
              gran parte del impacto etico.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3) Como diseñar un sistema serio en este tema</h2>
            <p className="text-muted-foreground leading-7">
              Si se construye una app de AI para astrologia vedica, el enfoque deberia incluir:
              calidad de datos, trazabilidad de reglas, evaluacion de consistencia, explicaciones
              claras y limites de uso explicitos.
            </p>
            <p className="text-muted-foreground leading-7">
              Tecnologicamente, puede combinarse una capa simbolica basada en reglas (framework
              astrologico) con una capa de machine learning para detectar patrones historicos. Ese
              modelo hibrido suele ser mas interpretable que una caja negra pura.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4) Etica minima para AI en astrologia vedica</h2>
            <p className="text-muted-foreground leading-7">
              Hay principios basicos que no deberian negociarse: privacidad de datos personales,
              lenguaje no alarmista, no inducir decisiones medicas/legales/financieras sin
              validacion externa y siempre permitir criterio humano.
            </p>
            <p className="text-muted-foreground leading-7">
              Tambien es clave incluir disclaimers honestos: una herramienta de este tipo puede
              apoyar reflexion personal, pero no sustituye acompañamiento profesional ni define el
              futuro de una persona.
            </p>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Cierre</h2>
            <p className="text-muted-foreground leading-7">
              La conversacion entre AI y astrologia vedica no tiene por que ser extrema ni ingenua.
              Puede ser un espacio de investigacion aplicada, siempre que mantengamos una idea
              central: tecnologia potente requiere comunicacion responsable. Si hay datos,
              predicciones y personas involucradas, la prioridad no es impresionar, sino cuidar.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/blog">Volver al blog</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Hablar sobre este tema</Link>
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export default function ForwardDeployedEngineerPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary">Career / Engineering</Badge>
          <span className="text-sm text-muted-foreground">Abr 2026 · 7 min de lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4">
          Forward Deployed Engineer: el rol puente entre producto y tecnologia
        </h1>

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Cuando una empresa trabaja con software complejo, datos e inteligencia artificial, no
          siempre basta con tener un equipo tecnico muy fuerte y otro de negocio muy claro en sus
          objetivos. Entre ambos mundos suele aparecer una brecha: tiempos de traduccion largos,
          decisiones con poco contexto compartido y soluciones que no llegan bien a produccion.
        </p>

        <p className="text-muted-foreground mt-4 text-base leading-7">
          El Forward Deployed Engineer (FDE) aparece precisamente para cerrar esa brecha. No es
          solo un desarrollador que implementa funcionalidades ni un consultor que define
          recomendaciones. Es un perfil hibrido que se involucra con el cliente o con los equipos
          internos de negocio, entiende el problema en profundidad y construye soluciones tecnicas
          aplicables en escenarios reales.
        </p>
      </div>

      <Separator className="my-10" />

      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6 md:p-8 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Que hace realmente un FDE</h2>
            <p className="text-muted-foreground leading-7">
              El trabajo de un Forward Deployed Engineer suele combinar discovery, arquitectura e
              implementacion. En la practica, participa en conversaciones de producto, revisa
              procesos operativos, identifica restricciones tecnicas y construye una primera version
              funcional que ya genera valor.
            </p>
            <p className="text-muted-foreground leading-7">
              En proyectos de AI, por ejemplo, un FDE puede definir junto al equipo de negocio que
              flujo automatizar, disenar la integracion con sistemas existentes, construir la API y
              validar que las respuestas del modelo cumplan estandares de calidad, seguridad y
              trazabilidad.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Por que este rol se volvio estrategico</h2>
            <p className="text-muted-foreground leading-7">
              En muchos equipos, las soluciones fracasan no por falta de tecnologia, sino por falta
              de aterrizaje operacional. El FDE reduce ese riesgo porque trabaja desde el primer
              dia con restricciones reales: datos incompletos, procesos legacy, requerimientos
              regulatorios y tiempos de negocio exigentes.
            </p>
            <p className="text-muted-foreground leading-7">
              Tambien acelera el ciclo de aprendizaje: al estar cerca del usuario final, puede
              iterar mas rapido sobre decisiones clave y evitar meses de construccion en una
              direccion que no genera impacto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Habilidades clave de un buen FDE</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 leading-7">
              <li>
                <span className="font-medium text-foreground">Base tecnica solida:</span> backend,
                datos, arquitectura y buenas practicas de software para construir con velocidad sin
                perder calidad.
              </li>
              <li>
                <span className="font-medium text-foreground">Contexto de producto:</span>{" "}
                traducir objetivos de negocio en decisiones de diseno e implementacion.
              </li>
              <li>
                <span className="font-medium text-foreground">Comunicacion clara:</span> explicar
                trade-offs tecnicos a stakeholders no tecnicos y alinear expectativas.
              </li>
              <li>
                <span className="font-medium text-foreground">Enfoque en produccion:</span> pensar
                en observabilidad, confiabilidad, seguridad y mantenimiento desde el inicio.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Forward Deployed Engineer en AI y Data</h2>
            <p className="text-muted-foreground leading-7">
              En productos con LLMs y pipelines de datos, este rol es especialmente util porque
              conecta tres capas que rara vez se coordinan bien por separado: necesidad de negocio,
              calidad de datos y comportamiento real del sistema en produccion.
            </p>
            <p className="text-muted-foreground leading-7">
              Un FDE no solo pregunta si el modelo responde bien, tambien valida si la solucion se
              integra con el flujo operativo, si es auditable y si puede mantenerse cuando aumenten
              el volumen y la complejidad del uso.
            </p>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Cierre</h2>
            <p className="text-muted-foreground leading-7">
              El Forward Deployed Engineer es, en esencia, un constructor de impacto: alguien capaz
              de unir estrategia, implementacion y ejecucion real. En un contexto donde las
              empresas quieren llevar AI a produccion con resultados concretos, este perfil deja de
              ser un lujo y pasa a ser una ventaja competitiva.
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

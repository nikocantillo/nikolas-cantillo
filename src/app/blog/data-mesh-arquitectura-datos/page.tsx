import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShareActions } from "@/components/blog/share-actions"

export default function DataMeshArquitecturaDatosPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary">Data Architecture</Badge>
          <span className="text-sm text-muted-foreground">Abr 2026 · 9 min de lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4">
          Data Mesh: arquitectura de datos para escalar equipos y decisiones
        </h1>

        <ShareActions
          title="Data Mesh: arquitectura de datos para escalar equipos y decisiones"
          path="/blog/data-mesh-arquitectura-datos"
        />

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Muchas empresas empiezan su estrategia de datos con un equipo central que concentra todo:
          ingestion, modelado, calidad, catalogo y consumo. Al inicio funciona. Pero cuando crecen
          los dominios, los casos de uso y la velocidad del negocio, ese modelo se convierte en
          cuello de botella.
        </p>

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Data Mesh propone una alternativa: distribuir la responsabilidad de los datos hacia los
          dominios de negocio, sin perder estandares comunes. No es una herramienta ni un simple
          framework; es una arquitectura organizacional y tecnica para escalar datos en empresas
          complejas.
        </p>
      </div>

      <Separator className="my-10" />

      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6 md:p-8 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1) El problema que Data Mesh intenta resolver</h2>
            <p className="text-muted-foreground leading-7">
              En arquitecturas centralizadas, el equipo de data recibe requests de toda la empresa:
              nuevos dashboards, tablas curadas, pipelines para ML, reglas de calidad y mas. La
              demanda crece mas rapido que la capacidad del equipo central.
            </p>
            <p className="text-muted-foreground leading-7">
              El resultado suele ser conocido: backlog infinito, poca claridad de ownership, datos
              desactualizados y consumidores frustrados. Data Mesh busca romper ese patron
              distribuyendo ownership y acercando la produccion de datos a quienes mejor entienden
              el contexto del dominio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2) Principio clave: datos como producto</h2>
            <p className="text-muted-foreground leading-7">
              En Data Mesh, cada dominio (por ejemplo: ventas, riesgo, operaciones) publica data
              products con contratos claros. Un data product no es solo una tabla: incluye
              documentacion, SLA, esquema versionado, calidad medible y responsables identificados.
            </p>
            <p className="text-muted-foreground leading-7">
              Este cambio es fuerte porque obliga a pensar en consumidores reales. Si un dominio
              publica datos, debe cuidar discoverability, confiabilidad e interoperabilidad.
              Basicamente, aplica disciplina de producto al mundo de datos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3) Governance federada, no anarquia</h2>
            <p className="text-muted-foreground leading-7">
              Un error comun es interpretar Data Mesh como "cada equipo hace lo que quiere". No es
              asi. El modelo correcto es governance federada: decisiones locales por dominio, bajo
              estandares globales compartidos.
            </p>
            <p className="text-muted-foreground leading-7">
              Esos estandares suelen cubrir nomenclatura, seguridad, clasificacion de datos, politicas
              de acceso, observabilidad, y reglas minimas de calidad. La federacion permite
              autonomia sin perder control.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4) Plataforma self-serve como acelerador</h2>
            <p className="text-muted-foreground leading-7">
              Para que los dominios puedan ser dueños de sus data products, necesitan una plataforma
              que reduzca friccion: templates de pipelines, CI/CD, controles de calidad, catalogo,
              lineage y monitoreo listos para usar.
            </p>
            <p className="text-muted-foreground leading-7">
              Sin esa capa, Data Mesh se vuelve una carga operativa. Con esa capa, los equipos de
              dominio pueden entregar valor sin reinventar infraestructura en cada proyecto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5) Roadmap realista de adopcion</h2>
            <p className="text-muted-foreground leading-7">
              Migrar a Data Mesh no ocurre en un trimestre. Un camino pragmatico suele ser:
              seleccionar 1-2 dominios piloto, definir contratos de datos, medir calidad, establecer
              ownership formal y recien despues expandir el modelo.
            </p>
            <p className="text-muted-foreground leading-7">
              Tambien conviene definir metricas de exito desde el inicio: lead time para publicar
              datos, incidentes de calidad, tiempo de onboarding de consumidores y nivel de
              reutilizacion de data products.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6) Errores frecuentes al implementar Data Mesh</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 leading-7">
              <li>
                Lanzar una reorganizacion grande sin pilotos ni casos concretos de valor.
              </li>
              <li>
                Definir ownership en slides, pero no en procesos reales de operacion y soporte.
              </li>
              <li>
                Pedir autonomia de dominio sin invertir en plataforma self-serve.
              </li>
              <li>
                No alinear incentivos: el dominio publica datos, pero nadie mide ni recompensa esa
                responsabilidad.
              </li>
            </ul>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Cierre</h2>
            <p className="text-muted-foreground leading-7">
              Data Mesh no es una moda para reemplazar el data warehouse. Es un modelo para escalar
              decisiones en organizaciones donde los datos ya son parte central del negocio. Cuando
              se implementa con governance, plataforma y ownership real, permite pasar de un equipo
              saturado a una red de dominios que colaboran con responsabilidad compartida.
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

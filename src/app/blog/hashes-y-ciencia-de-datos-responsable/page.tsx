import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShareActions } from "@/components/blog/share-actions"

export default function HashesCienciaDatosResponsablePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary">Data Engineering / Ethics</Badge>
          <span className="text-sm text-muted-foreground">Ago 2026 · 8 min de lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4">
          Hashes de archivos y ciencia de datos responsable: integridad, trazabilidad y privacidad
        </h1>

        <ShareActions
          title="Hashes de archivos y ciencia de datos responsable: integridad, trazabilidad y privacidad"
          path="/blog/hashes-y-ciencia-de-datos-responsable"
        />

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Cada vez que descargas un dataset, versionas un modelo o compartes un archivo, hay una
          pregunta silenciosa detras: ¿como se que este archivo es exactamente el que deberia ser?
          La respuesta tecnica son las funciones hash: una huella digital unica que identifica el
          contenido de un archivo, byte por byte.
        </p>

        <p className="text-muted-foreground mt-4 text-base leading-7">
          Pero los hashes no son solo un detalle de infraestructura. Son una pieza central de la
          ciencia de datos responsable: permiten garantizar integridad, auditar pipelines,
          reproducir experimentos y proteger datos sensibles. En este articulo conectamos ambos
          mundos: el mecanismo tecnico y la responsabilidad que habilita.
        </p>
      </div>

      <Separator className="my-10" />

      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6 md:p-8 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1) Que es el hash de un archivo</h2>
            <p className="text-muted-foreground leading-7">
              Una funcion hash toma cualquier entrada (un archivo de 1 KB o de 100 GB) y produce una
              salida de tamaño fijo llamada digest. Por ejemplo, SHA-256 siempre devuelve 256 bits,
              que solemos ver como 64 caracteres hexadecimales. El mismo archivo produce siempre el
              mismo hash; si cambia un solo byte, el hash resultante es completamente distinto.
            </p>
            <p className="text-muted-foreground leading-7">
              Tres propiedades hacen utiles a los hashes criptograficos: son deterministas (misma
              entrada, misma salida), son unidireccionales (no puedes reconstruir el archivo desde
              el hash) y son resistentes a colisiones (es practicamente imposible encontrar dos
              archivos distintos con el mismo hash). Algoritmos comunes: SHA-256 y SHA-3 para uso
              general, BLAKE3 cuando importa la velocidad, y MD5 o SHA-1 solo como checksum rapido,
              nunca para seguridad, porque ya tienen colisiones conocidas.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2) Integridad: saber que el dato no cambio</h2>
            <p className="text-muted-foreground leading-7">
              El uso mas directo es verificar integridad. Cuando descargas un dataset y el proveedor
              publica su SHA-256, puedes recalcularlo localmente y confirmar que el archivo llego
              completo y sin alteraciones: ni corrupcion en la transferencia, ni modificaciones
              maliciosas en el camino.
            </p>
            <p className="text-muted-foreground leading-7">
              En pipelines de datos esto se traduce en practicas concretas: calcular el hash de cada
              archivo al ingerirlo, guardarlo como metadato, y validarlo antes de cada procesamiento.
              Herramientas como DVC, Git LFS o los object stores tipo S3 usan exactamente este
              mecanismo: el contenido se identifica por su hash, no por su nombre.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3) Trazabilidad y reproducibilidad</h2>
            <p className="text-muted-foreground leading-7">
              La ciencia de datos responsable exige poder responder: ¿con que version exacta de los
              datos se entreno este modelo? Los nombres de archivo mienten (dataset_final_v2.csv es
              un clasico), pero los hashes no. Si registras el hash del dataset, del codigo y de los
              artefactos del modelo, tienes un linaje verificable de extremo a extremo.
            </p>
            <p className="text-muted-foreground leading-7">
              Esto habilita reproducibilidad real: cualquier persona puede confirmar que esta usando
              exactamente los mismos insumos del experimento original. Tambien habilita auditoria:
              ante un resultado cuestionado, puedes demostrar que datos entraron, cuando, y que
              nadie los altero despues. Sin hashes, esa cadena de confianza depende de la memoria
              del equipo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4) Hashing y privacidad: util pero no magico</h2>
            <p className="text-muted-foreground leading-7">
              En datos personales, el hashing aparece como tecnica de seudonimizacion: reemplazar un
              email o cedula por su hash permite hacer joins y deduplicar sin exponer el valor
              original. Es una practica valida, pero aqui la responsabilidad exige precision: hashear
              no es anonimizar.
            </p>
            <p className="text-muted-foreground leading-7">
              Si el espacio de valores es pequeño o conocido (emails, telefonos, documentos de
              identidad), un atacante puede hashear todos los valores posibles y revertir la tabla
              (ataque de diccionario o rainbow table). Por eso los marcos regulatorios como GDPR
              consideran los datos hasheados como seudonimizados, no anonimos: siguen siendo datos
              personales. Las mitigaciones minimas son usar una sal o clave secreta (HMAC), rotar
              esas claves y controlar su acceso, y evaluar tecnicas mas fuertes como tokenizacion o
              privacidad diferencial cuando el riesgo lo amerita.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5) Buenas practicas para equipos de datos</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 leading-7">
              <li>
                Calcula y registra el hash (SHA-256 o superior) de cada dataset en el momento de la
                ingesta, y valida antes de procesar.
              </li>
              <li>
                Versiona datos y modelos por contenido (DVC, MLflow, lakeFS), no por nombre de
                archivo ni fecha.
              </li>
              <li>
                Documenta el linaje: hash del dato + hash del codigo + hash del modelo resultante,
                enlazados en un registro auditable.
              </li>
              <li>
                Para identificadores personales, usa HMAC con clave secreta gestionada, nunca un
                hash simple sin sal.
              </li>
              <li>
                No uses MD5 ni SHA-1 en contextos donde alguien pueda tener incentivos para forzar
                una colision.
              </li>
              <li>
                Trata los datos hasheados de personas como datos personales: aplican las mismas
                politicas de acceso y retencion.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6) Errores frecuentes</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 leading-7">
              <li>
                Asumir que un dataset con emails hasheados ya es anonimo y puede compartirse sin
                controles.
              </li>
              <li>
                Verificar el hash una sola vez en la descarga y nunca mas, aunque el archivo pase
                por varios sistemas.
              </li>
              <li>
                Guardar la sal o la clave del HMAC en el mismo repositorio que los datos.
              </li>
              <li>
                Confiar en el nombre o timestamp del archivo como prueba de version en un reporte o
                una auditoria.
              </li>
            </ul>
          </section>

          <section className="space-y-4 border-t pt-8">
            <h2 className="text-2xl font-semibold">Cierre</h2>
            <p className="text-muted-foreground leading-7">
              Los hashes son una herramienta simple con consecuencias grandes: convierten la
              confianza en algo verificable. Un equipo de datos responsable no dice "confia en que
              este es el dataset correcto"; dice "aqui esta el hash, verificalo tu mismo". Y al mismo
              tiempo, entiende los limites: un hash protege la integridad del dato, pero no convierte
              datos personales en anonimos. Usar bien ambas caras (garantia tecnica y honestidad
              sobre sus limites) es exactamente lo que significa hacer ciencia de datos responsable.
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

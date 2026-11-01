import { ArticleLayout } from "@/components/blog/article-layout"
import { articleMetadata } from "@/lib/posts"
import { Figure } from "@/components/blog/figure"

export const metadata = articleMetadata("/blog/hashes-y-ciencia-de-datos-responsable")

export default function HashesCienciaDatosResponsablePage() {
  return (
    <ArticleLayout href="/blog/hashes-y-ciencia-de-datos-responsable">
      <p>
        Cada vez que descargas un dataset, versionas un modelo o compartes un archivo, hay una
        pregunta silenciosa detras: ¿como se que este archivo es exactamente el que deberia ser?
        La respuesta tecnica son las funciones hash: una huella digital unica que identifica el
        contenido de un archivo, byte por byte.
      </p>

      <p>
        Pero los hashes no son solo un detalle de infraestructura. Son una pieza central de la
        ciencia de datos responsable: permiten garantizar integridad, auditar pipelines,
        reproducir experimentos y proteger datos sensibles. En este articulo conectamos ambos
        mundos: el mecanismo tecnico y la responsabilidad que habilita.
      </p>

      <section>
        <h2>Que es el hash de un archivo</h2>
        <p>
          Una funcion hash toma cualquier entrada (un archivo de 1 KB o de 100 GB) y produce una
          salida de tamaño fijo llamada digest. Por ejemplo, SHA-256 siempre devuelve 256 bits,
          que solemos ver como 64 caracteres hexadecimales. El mismo archivo produce siempre el
          mismo hash; si cambia un solo byte, el hash resultante es completamente distinto.
        </p>

        <Figure src="/blog/hashes-y-ciencia-de-datos-responsable/fig-01.svg" caption="Efecto avalancha: cambiar un solo byte del archivo produce un hash irreconocible." />

        <p>
          Tres propiedades hacen utiles a los hashes criptograficos: son deterministas (misma
          entrada, misma salida), son unidireccionales (no puedes reconstruir el archivo desde
          el hash) y son resistentes a colisiones (es practicamente imposible encontrar dos
          archivos distintos con el mismo hash). Algoritmos comunes: SHA-256 y SHA-3 para uso
          general, BLAKE3 cuando importa la velocidad, y MD5 o SHA-1 solo como checksum rapido,
          nunca para seguridad, porque ya tienen colisiones conocidas.
        </p>
      </section>

      <section>
        <h2>Integridad: saber que el dato no cambio</h2>
        <p>
          El uso mas directo es verificar integridad. Cuando descargas un dataset y el proveedor
          publica su SHA-256, puedes recalcularlo localmente y confirmar que el archivo llego
          completo y sin alteraciones: ni corrupcion en la transferencia, ni modificaciones
          maliciosas en el camino.
        </p>

        <Figure src="/blog/hashes-y-ciencia-de-datos-responsable/fig-02.svg" caption="Verificar un dataset descargado consiste en recalcular su hash y compararlo con el publicado." />

        <p>
          En pipelines de datos esto se traduce en practicas concretas: calcular el hash de cada
          archivo al ingerirlo, guardarlo como metadato, y validarlo antes de cada procesamiento.
          Herramientas como DVC, Git LFS o los object stores tipo S3 usan exactamente este
          mecanismo: el contenido se identifica por su hash, no por su nombre.
        </p>
      </section>

      <blockquote>Los hashes son una herramienta simple con consecuencias grandes: convierten la confianza en algo verificable.</blockquote>

      <section>
        <h2>Trazabilidad y reproducibilidad</h2>
        <p>
          La ciencia de datos responsable exige poder responder: ¿con que version exacta de los
          datos se entreno este modelo? Los nombres de archivo mienten (dataset_final_v2.csv es
          un clasico), pero los hashes no. Si registras el hash del dataset, del codigo y de los
          artefactos del modelo, tienes un linaje verificable de extremo a extremo.
        </p>

        <Figure src="/blog/hashes-y-ciencia-de-datos-responsable/fig-03.svg" caption="Enlazar los hashes de datos, código y modelo da un linaje verificable que los nombres de archivo no pueden ofrecer." />

        <p>
          Esto habilita reproducibilidad real: cualquier persona puede confirmar que esta usando
          exactamente los mismos insumos del experimento original. Tambien habilita auditoria:
          ante un resultado cuestionado, puedes demostrar que datos entraron, cuando, y que
          nadie los altero despues. Sin hashes, esa cadena de confianza depende de la memoria
          del equipo.
        </p>
      </section>

      <section>
        <h2>Hashing y privacidad: util pero no magico</h2>
        <p>
          En datos personales, el hashing aparece como tecnica de seudonimizacion: reemplazar un
          email o cedula por su hash permite hacer joins y deduplicar sin exponer el valor
          original. Es una practica valida, pero aqui la responsabilidad exige precision: hashear
          no es anonimizar.
        </p>

        <Figure src="/blog/hashes-y-ciencia-de-datos-responsable/fig-04.svg" caption="Un hash simple se revierte con un diccionario de valores posibles; el HMAC con clave secreta eleva la barrera, aunque los datos siguen siendo personales." />

        <p>
          Si el espacio de valores es pequeño o conocido (emails, telefonos, documentos de
          identidad), un atacante puede hashear todos los valores posibles y revertir la tabla
          (ataque de diccionario o rainbow table). Por eso los marcos regulatorios como GDPR
          consideran los datos hasheados como seudonimizados, no anonimos: siguen siendo datos
          personales. Las mitigaciones minimas son usar una sal o clave secreta (HMAC), rotar
          esas claves y controlar su acceso, y evaluar tecnicas mas fuertes como tokenizacion o
          privacidad diferencial cuando el riesgo lo amerita.
        </p>
      </section>

      <section>
        <h2>Buenas practicas para equipos de datos</h2>
        <ul>
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

      <section>
        <h2>Errores frecuentes</h2>
        <ul>
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

      <section>
        <h2>Cierre</h2>
        <p>
          Los hashes son una herramienta simple con consecuencias grandes: convierten la
          confianza en algo verificable. Un equipo de datos responsable no dice “confia en que
          este es el dataset correcto”; dice “aqui esta el hash, verificalo tu mismo”. Y al mismo
          tiempo, entiende los limites: un hash protege la integridad del dato, pero no convierte
          datos personales en anonimos. Usar bien ambas caras (garantia tecnica y honestidad
          sobre sus limites) es exactamente lo que significa hacer ciencia de datos responsable.
        </p>
      </section>
    </ArticleLayout>
  )
}

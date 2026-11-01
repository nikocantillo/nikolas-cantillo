import Link from "next/link"
import { ArticleLayout } from "@/components/blog/article-layout"

const SOURCE_URL = "https://humanistreview.ai/issue-1/acemoglu-ai-replace-workers/"

export default function AcemogluIaProTrabajadorPage() {
  return (
    <ArticleLayout href="/blog/acemoglu-ia-pro-trabajador">
      <p>
        Pocas preguntas generan tanta ansiedad hoy como si la inteligencia artificial nos va a
        dejar sin trabajo. Daron Acemoglu, economista del MIT, responde en el primer número de The
        Humanist Review of AI con un ensayo que se aleja tanto del entusiasmo como del
        catastrofismo: la IA no está condenada a reemplazarnos, pero tampoco va a ayudarnos sola.
        Depende de para qué la construyamos.
      </p>

      <p>
        Este escrito es un resumen comentado de ese ensayo,{" "}
        <a href={SOURCE_URL} target="_blank" rel="noreferrer">
          «Will AI replace workers? Not if we build it right»
        </a>{" "}
        (Daron Acemoglu, The Humanist Review of AI, Issue 01, 15 de julio de 2026). Las ideas son
        suyas; el orden, la síntesis y la lectura final son míos. Recomiendo leer el original
        completo.
      </p>

      <section>
        <h2>La tesis: la industria persigue el objetivo equivocado</h2>
        <p>
          Para Acemoglu, el problema no es la tecnología sino la meta. Buena parte de la industria
          mide el progreso por cuánto se acerca una máquina a igualar al ser humano y por cuántos
          trabajos puede automatizar por completo. Él propone otro norte, que resume en la bajada
          del ensayo:
        </p>
        <blockquote>«Instead of replacing workers, it should make them better at their jobs.»</blockquote>
        <p>
          A esa alternativa la llama <strong>IA pro-trabajador</strong>: sistemas diseñados para
          complementar a las personas, hacerlas más productivas y abrirles tareas y capacidades
          nuevas, en lugar de sustituirlas.
        </p>
      </section>

      <section>
        <h2>La productividad todavía no aparece</h2>
        <p>
          El ensayo empieza enfriando las expectativas. Los resultados de laboratorio en
          programación o radiología son llamativos, pero en el trabajo real la evidencia es más
          modesta: tiempo perdido depurando código generado, profesionales a quienes les cuesta
          integrar la herramienta con su propio criterio y empresas que adoptan IA sin ver
          ganancias claras. Acemoglu recuerda la vieja paradoja de Solow sobre los computadores,
          que se veían en todas partes menos en las estadísticas de productividad.
        </p>
        <p>
          Su comparación histórica es la electricidad: pasaron décadas entre las primeras centrales
          y su uso masivo en fábricas, porque había que reorganizar la producción entera. Con la IA
          ocurre algo parecido, y por eso él mismo estimó que solo una fracción pequeña de las
          tareas (del orden de un 5 % en diez años) sería automatizada. Reconoce que los modelos
          avanzaron más rápido de lo que esperaba, pero sostiene que, por ahora, la predicción se
          sostiene.
        </p>
      </section>

      <section>
        <h2>Lo que enseña el reconocimiento de voz</h2>
        <p>
          El caso más personal del ensayo es el dictado por voz. Acemoglu lo usó desde fines de los
          noventa y vio cómo esos programas alcanzaban una precisión altísima para luego quedarse
          prácticamente estancados durante dos décadas en el uso cotidiano: las empresas que los
          compraban priorizaron mercados corporativos y médicos, y el consumidor dejó de importar.
        </p>
        <p>
          La lección tiene dos partes. Primero, un avance técnico no basta: hacen falta
          aplicaciones, modelos de negocio y retroalimentación de usuarios. Segundo, el último
          tramo de fiabilidad es el más difícil, y ahí un error pequeño puede cambiar el sentido de
          todo. La automatización total de un oficio exige resolver justamente ese tramo, además del
          juicio en decisiones delicadas y la interacción social.
        </p>
      </section>

      <section>
        <h2>Complementar en lugar de imitar</h2>
        <p>
          El argumento de fondo es que la inteligencia humana y la artificial son distintas. Las
          personas aprenden con pocos ejemplos, formulan hipótesis y aprenden en contacto con
          otros; los modelos aprenden de volúmenes enormes de datos y son excelentes reconociendo
          patrones, pero sin el filtro social que corrige sus errores. Si son distintas, lo
          sensato es combinarlas, no copiar una con la otra.
        </p>
        <p>
          Acemoglu enlaza esta idea con la «simbiosis hombre-computador» que planteó J. C. R.
          Licklider en 1960 y da un ejemplo concreto: herramientas que detectan dónde se traba cada
          estudiante y le sugieren al docente cómo agruparlos para enseñar mejor. Según el autor,
          su equipo ya trabaja en prototipos así, construidos con modelos medianos entrenados con
          currículos y conocimiento de docentes expertos. La ganancia sería doble: más
          productividad y menos desplazamiento y desigualdad.
        </p>
      </section>

      <section>
        <h2>Por qué la industria insiste en automatizar</h2>
        <p>
          Si la alternativa es mejor, ¿por qué no domina? El ensayo identifica cuatro fuerzas:
        </p>
        <ul>
          <li>
            <strong>Modelos de negocio:</strong> las grandes tecnológicas ganan vendiendo software
            a empresas y con publicidad, no con herramientas que potencien a los trabajadores.
          </li>
          <li>
            <strong>Concentración:</strong> unas pocas firmas controlan capital, datos y talento, y
            las startups con otras ideas suelen terminar adquiridas.
          </li>
          <li>
            <strong>Un problema de coordinación:</strong> las empresas esperan que las tecnológicas
            les ofrezcan herramientas complementarias, y las tecnológicas creen que las empresas
            solo quieren automatizar.
          </li>
          <li>
            <strong>Ideología:</strong> desde el «juego de imitación» de Turing, la meta de igualar
            al humano se volvió la vara con que se mide todo.
          </li>
        </ul>
      </section>

      <section>
        <h2>Qué propone</h2>
        <p>
          Acemoglu advierte que no hay una política mágica y que lo primero es un cambio de
          perspectiva. Aun así, sugiere direcciones concretas: dejar de favorecer fiscalmente el
          capital frente al trabajo (en Estados Unidos, dice, el trabajo tributa bastante más),
          financiar proyectos de demostración sencillos que prueben que la IA pro-trabajador
          funciona, aplicar y actualizar la ley de competencia, gravar la publicidad digital y
          crear mercados de datos donde los expertos que generan datos de calidad tengan
          protección y sean remunerados.
        </p>
      </section>

      <section>
        <h2>Una lectura desde la ciencia de datos</h2>
        <p>
          Lo que más me interesa del ensayo es que traslada la discusión desde la pregunta «¿qué
          puede hacer el modelo?» a «¿para qué y con quién lo diseñamos?». Es una pregunta de
          producto y de datos, no solo de capacidad. En mi propio trabajo con{" "}
          <Link href="/projects/hate-speech-roberta-vs-llm">fine-tuning frente a LLMs generalistas</Link>,
          un modelo pequeño entrenado con datos específicos superó con holgura a uno grande sin
          especializar; la intuición de Acemoglu sobre modelos medianos alimentados con
          conocimiento experto va en la misma dirección.
        </p>
        <p>
          También coincide con algo que se repite en los proyectos reales: el valor aparece cuando
          la herramienta se integra al flujo de trabajo de una persona que sigue tomando las
          decisiones, y se pierde cuando se intenta sacar a esa persona del circuito antes de
          resolver el último tramo de fiabilidad.
        </p>
      </section>

      <section>
        <h2>Cierre</h2>
        <p>
          La pregunta de si la IA reemplazará a los trabajadores no tiene una respuesta técnica
          sino una decisión detrás. Acemoglu sostiene que todavía podemos tomarla: construir IA que
          haga más capaces a las personas en lugar de prescindir de ellas. Para el argumento
          completo, con sus datos y referencias, vale la pena leer{" "}
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">
            el ensayo original en The Humanist Review of AI
          </a>
          .
        </p>
      </section>
    </ArticleLayout>
  )
}

import { NotebookViewer, type NotebookCell } from "@/components/notebook-viewer"
import notebook from "@/data/nhanes-bmi-notebook.json"

export const metadata = {
  title: "Notebook: Predicción del IMC con NHANES · Nikolas Cantillo",
  description:
    "Notebook renderizado: limpieza, regresión y clustering sobre la encuesta NHANES 2015-2016 para predecir el índice de masa corporal, con código y resultados reales.",
}

export default function NhanesBmiNotebookPage() {
  return (
    <NotebookViewer
      cells={notebook.cells as NotebookCell[]}
      breadcrumb={{ label: "Caso NHANES", href: "/projects/nhanes-bmi-ml" }}
      title={
        <>
          El notebook, <span className="text-shimmer">celda por celda</span>
        </>
      }
      meta="scikit-learn · KMeans · PCA"
      intro="Análisis completo sobre NHANES 2015-2016 tal cual fue desarrollado: exploración y limpieza de datos, comparación de modelos de regresión para predecir el IMC y segmentación de la población con KMeans. Código y resultados reales; se omite la cabecera institucional del curso."
    />
  )
}

import { NotebookViewer, type NotebookCell } from "@/components/notebook-viewer"
import notebook from "@/data/cirrhosis-notebook.json"

export const metadata = {
  title: "Notebook: Predicción del desenlace en cirrosis · Nikolas Cantillo",
  description:
    "Notebook renderizado: clasificación multiclase del desenlace de pacientes con cirrosis (SMOTE + 5 modelos) y segmentación con K-Prototypes, con código y resultados reales.",
}

export default function CirrhosisNotebookPage() {
  return (
    <NotebookViewer
      cells={notebook.cells as NotebookCell[]}
      breadcrumb={{ label: "Caso cirrosis", href: "/projects/cirrhosis-survival-ml" }}
      title={
        <>
          El notebook, <span className="text-shimmer">celda por celda</span>
        </>
      }
      meta="scikit-learn · SMOTE · K-Prototypes"
      intro="Análisis completo sobre el dataset de cirrosis de Mayo Clinic tal cual fue desarrollado: exploración clínica, balanceo de clases con SMOTE, comparación de clasificadores para predecir el desenlace del paciente y segmentación con clustering. Código y resultados reales; se omite la cabecera institucional del curso."
    />
  )
}

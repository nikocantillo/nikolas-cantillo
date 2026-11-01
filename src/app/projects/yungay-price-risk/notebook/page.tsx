import { NotebookViewer, type NotebookCell } from "@/components/notebook-viewer"
import notebook from "@/data/yungay-risk-notebook.json"

export const metadata = {
  title: "Notebook: Riesgo de precios bajos de la papa Yungay · Nikolas Cantillo",
  description:
    "Notebook renderizado: pronóstico por cuantiles con DeepAR, calibración de la banda P10/P20, alarma P(precio < T) frente a la climatología y decisión con costo asimétrico, con código y resultados reales.",
}

export default function YungayRiskNotebookPage() {
  return (
    <NotebookViewer
      cells={notebook.cells as NotebookCell[]}
      breadcrumb={{ label: "Caso papa Yungay", href: "/projects/yungay-price-risk" }}
      title={<>El notebook, celda por celda</>}
      meta="DeepAR · cuantiles · Brier · costo asimétrico"
      intro="El capítulo de riesgo del proyecto tal cual fue desarrollado: como ningún modelo supera a ARIMA en el pronóstico puntual a cinco meses, se pasa a estimar el riesgo de precios bajos con una banda de cuantiles calibrada y una probabilidad P(precio < T). El cómputo pesado vive en un script del repositorio; aquí se cargan e interpretan sus resultados. Se omite la cabecera del notebook."
    />
  )
}

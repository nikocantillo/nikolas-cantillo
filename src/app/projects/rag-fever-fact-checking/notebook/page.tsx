import { NotebookViewer, type NotebookCell } from "@/components/notebook-viewer"
import notebook from "@/data/rag-fever-notebook.json"

export const metadata = {
  title: "Notebook: Fact-checking con RAG (FEVER) · Nikolas Cantillo",
  description:
    "Notebook renderizado del caso de fact-checking con RAG sobre FEVER: código, outputs y análisis, celda por celda.",
}

export default function RagFeverNotebookPage() {
  return (
    <NotebookViewer
      cells={notebook.cells as NotebookCell[]}
      breadcrumb={{ label: "Caso FEVER", href: "/projects/rag-fever-fact-checking" }}
      title={
        <>
          El notebook, <span className="text-shimmer">celda por celda</span>
        </>
      }
      meta="Ejecutado · Tesla T4"
      intro="Fact-checking sobre FEVER tal cual fue desarrollado: código, outputs reales y análisis. Se omiten celdas de credenciales e instrucciones, y se filtra el ruido de progreso de los outputs."
    />
  )
}

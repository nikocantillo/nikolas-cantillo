import { NotebookViewer, type NotebookCell } from "@/components/notebook-viewer"
import notebook from "@/data/roberta-hate-notebook.json"

export const metadata = {
  title: "Notebook: Fine-tuning vs LLMs en moderación de contenido · Nikolas Cantillo",
  description:
    "Notebook renderizado: RoBERTa fine-tuneado contra Llama-3.2-3B (zero-shot y few-shot) clasificando hate speech, con código y métricas reales.",
}

export default function HateSpeechNotebookPage() {
  return (
    <NotebookViewer
      cells={notebook.cells as NotebookCell[]}
      breadcrumb={{ label: "Caso moderación", href: "/projects/hate-speech-roberta-vs-llm" }}
      title={
        <>
          El notebook, <span className="text-shimmer">celda por celda</span>
        </>
      }
      meta="RoBERTa · Llama-3.2-3B"
      intro="Clasificación de hate speech tal cual fue desarrollada: código, entrenamiento y métricas reales. Los outputs que muestran tweets crudos del dataset se omiten en la versión web por contener lenguaje ofensivo; el resto está intacto."
    />
  )
}

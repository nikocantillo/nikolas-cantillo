"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function PdfDemoPage() {
    const [text, setText] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSummarize() {
        setLoading(true)
        setResult("")

        const res = await fetch("/api/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        })

        const data = await res.json()
        setResult(data.summary)
        setLoading(false)
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-3xl font-semibold">Demo: Resumen de documentos</h1>
            <p className="text-muted-foreground mt-2">
                Pega el contenido de un PDF y genera un resumen usando un modelo de lenguaje.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card>
                    <CardContent className="p-6 flex flex-col gap-4">
                        <Textarea
                            placeholder="Pega aquí el texto del documento..."
                            rows={12}
                            value={text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setText(e.target.value)
                            }
                        />
                        <Button onClick={handleSummarize} disabled={!text || loading}>
                            {loading ? "Resumiendo..." : "Generar resumen"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        {result ? (
                            <p className="whitespace-pre-wrap text-sm">{result}</p>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                El resumen aparecerá aquí.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

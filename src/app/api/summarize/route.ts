import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { text } = await req.json()

  if (!text) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 })
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente que resume documentos técnicos de forma clara y estructurada.",
      },
      {
        role: "user",
        content: `Resume el siguiente texto:\n\n${text}`,
      },
    ],
  })

  return NextResponse.json({
    summary: completion.choices[0].message.content,
  })
}

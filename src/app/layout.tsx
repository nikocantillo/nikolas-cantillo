import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Nikolas Cantillo · Data Science & AI",
  description:
    "Personal site of Nikolas Cantillo. Data Science, AI Engineering, LLMs/RAG, and scalable data systems.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}

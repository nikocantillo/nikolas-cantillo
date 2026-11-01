import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const grotesk = Inter({
  variable: "--font-grotesk",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
})

// URL pública del sitio, para que og:image y og:url sean absolutas (Facebook, LinkedIn…).
// NEXT_PUBLIC_SITE_URL manda; en Vercel se usa el dominio de producción automáticamente.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nikolas Cantillo · Data Science & AI",
  description:
    "Personal site of Nikolas Cantillo. Data Science, AI Engineering, LLMs/RAG, and scalable data systems.",
  openGraph: {
    siteName: "Nikolas Cantillo",
    locale: "es_CL",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${grotesk.variable} ${plexMono.variable} min-h-screen font-sans antialiased flex flex-col`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

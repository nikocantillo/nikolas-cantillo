import type { Metadata } from "next"

export type Post = {
  title: string
  excerpt: string
  tag: string
  href: string
  date: string
  readTime: string
  deco: string
}

export const posts: Post[] = [
  {
    title: "¿La IA reemplazará a los trabajadores? El argumento de Daron Acemoglu",
    excerpt:
      "Resumen comentado del ensayo de Acemoglu en The Humanist Review of AI: por qué la industria persigue la meta equivocada y qué sería una IA pro-trabajador.",
    tag: "AI / Economía",
    href: "/blog/acemoglu-ia-pro-trabajador",
    date: "Oct 2026",
    readTime: "6 min",
    deco: "complementar > reemplazar",
  },
  {
    title: "Hashes de archivos y ciencia de datos responsable: integridad, trazabilidad y privacidad",
    excerpt:
      "Que es el hash de un archivo, como garantiza integridad y reproducibilidad en pipelines, y por que hashear datos personales no es lo mismo que anonimizarlos.",
    tag: "Data Engineering / Ethics",
    href: "/blog/hashes-y-ciencia-de-datos-responsable",
    date: "Ago 2026",
    readTime: "8 min",
    deco: "sha256 · 9f2a4c…e81b",
  },
  {
    title: "Data Mesh: arquitectura de datos para escalar equipos y decisiones",
    excerpt:
      "Como pasar de un modelo centralizado a dominios responsables de data products con governance federada y plataforma self-serve.",
    tag: "Data Architecture",
    href: "/blog/data-mesh-arquitectura-datos",
    date: "Abr 2026",
    readTime: "9 min",
    deco: "data-as-product",
  },
  {
    title: "AI y astrologia vedica: entre tradicion, datos y criterio",
    excerpt:
      "Como usar IA para analizar patrones en astrologia vedica sin confundir correlacion con verdad absoluta.",
    tag: "AI / Astrologia",
    href: "/blog/ai-y-los-vedas",
    date: "Abr 2026",
    readTime: "8 min",
    deco: "datos + criterio",
  },
  {
    title: "Forward Deployed Engineer: el rol puente entre producto y tecnología",
    excerpt:
      "Qué hace un FDE, por qué es clave en productos de datos e IA, y qué habilidades técnicas y humanas lo vuelven diferencial.",
    tag: "Career / Engineering",
    href: "/blog/forward-deployed-engineer",
    date: "Abr 2026",
    readTime: "7 min",
    deco: "codigo ⇄ producto",
  },
]

// Numeración tipo revista: el escrito más antiguo es el Nº 01.
export function issueNumber(href: string) {
  const i = posts.findIndex((p) => p.href === href)
  return String(posts.length - i).padStart(2, "0")
}

// Metadata de cada escrito para buscadores y redes. La imagen la aporta el archivo
// opengraph-image.png de la carpeta del escrito (lo genera scripts/illustrate.ts).
export function articleMetadata(href: string): Metadata {
  const post = posts.find((p) => p.href === href)
  if (!post) return {}
  return {
    title: `${post.title} · Nikolas Cantillo`,
    description: post.excerpt,
    alternates: { canonical: href },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: href,
      siteName: "Nikolas Cantillo",
      locale: "es_CL",
      authors: ["Nikolas Cantillo"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  }
}

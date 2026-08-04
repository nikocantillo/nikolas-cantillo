import { Hash, Network, Sparkles, Rocket, type LucideIcon } from "lucide-react"

export type Post = {
  title: string
  excerpt: string
  tag: string
  href: string
  date: string
  readTime: string
  icon: LucideIcon
  gradient: string
  deco: string
}

export const posts: Post[] = [
  {
    title: "Hashes de archivos y ciencia de datos responsable: integridad, trazabilidad y privacidad",
    excerpt:
      "Que es el hash de un archivo, como garantiza integridad y reproducibilidad en pipelines, y por que hashear datos personales no es lo mismo que anonimizarlos.",
    tag: "Data Engineering / Ethics",
    href: "/blog/hashes-y-ciencia-de-datos-responsable",
    date: "Ago 2026",
    readTime: "8 min",
    icon: Hash,
    gradient: "from-indigo-500/25 via-violet-500/15 to-cyan-400/25",
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
    icon: Network,
    gradient: "from-cyan-500/25 via-sky-500/15 to-indigo-400/25",
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
    icon: Sparkles,
    gradient: "from-violet-500/25 via-fuchsia-500/15 to-amber-400/25",
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
    icon: Rocket,
    gradient: "from-emerald-500/25 via-teal-500/15 to-cyan-400/25",
    deco: "codigo ⇄ producto",
  },
]

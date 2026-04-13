import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const posts = [
  {
    title: "Forward Deployed Engineer: el rol puente entre producto y tecnología",
    excerpt:
      "Qué hace un FDE, por qué es clave en productos de datos e IA, y qué habilidades técnicas y humanas lo vuelven diferencial.",
    tag: "Career / Engineering",
    href: "/blog/forward-deployed-engineer",
    date: "Abr 2026",
    readTime: "7 min",
  },
]

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-2xl border bg-gradient-to-b from-muted/40 to-background p-6 md:p-10">
        <Badge variant="secondary">Blog tecnico</Badge>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4">Blog</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-7">
          Articulos tecnicos sobre Data, AI Engineering y construccion de sistemas en produccion.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={posts[0].href}>
              Leer articulo destacado
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Proponer tema</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Ultimos articulos</h2>
          <p className="text-muted-foreground mt-2">Ideas practicas y aprendizajes de proyectos reales.</p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block rounded-xl border p-5 md:p-6 transition-colors hover:border-foreground/40"
            >
              <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-muted-foreground">
                <div>
                  {post.date} · {post.readTime}
                </div>
                <Badge variant="outline">{post.tag}</Badge>
              </div>

              <h3 className="mt-3 text-xl md:text-2xl font-semibold leading-tight">{post.title}</h3>

              <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl">{post.excerpt}</p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium group-hover:underline">
                Leer articulo
                <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

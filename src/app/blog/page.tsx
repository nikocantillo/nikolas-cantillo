import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary">Blog tecnico</Badge>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4">Blog</h1>
        <p className="text-muted-foreground mt-3">
          Articulos tecnicos sobre Data, AI Engineering y construccion de sistemas en produccion.
        </p>
      </div>

      <div className="flex items-end justify-between flex-wrap gap-6 mt-10">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Ultimos articulos</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Ideas practicas y aprendizajes de proyectos reales.
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">Proponer tema</Link>
        </Button>
      </div>

      <Separator className="my-10" />

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.href} className="transition-colors hover:border-foreground/30">
            <CardContent className="p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-muted-foreground">
                <div>
                  {post.date} · {post.readTime}
                </div>
                <Badge variant="outline">{post.tag}</Badge>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold leading-tight">{post.title}</h3>

              <p className="text-sm md:text-base text-muted-foreground max-w-3xl">{post.excerpt}</p>

              <div>
                <Button asChild variant="outline">
                  <Link href={post.href}>Leer articulo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

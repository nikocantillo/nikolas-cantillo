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
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Articulos tecnicos sobre Data, AI Engineering y construccion de sistemas en produccion.
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">Proponer tema</Link>
        </Button>
      </div>

      <Separator className="my-10" />

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.href}>
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-xl font-semibold leading-tight">{post.title}</h2>
                <Badge variant="outline">{post.tag}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">{post.excerpt}</p>

              <div className="text-xs text-muted-foreground">
                {post.date} · {post.readTime}
              </div>

              <div>
                <Button asChild variant="outline" size="sm">
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

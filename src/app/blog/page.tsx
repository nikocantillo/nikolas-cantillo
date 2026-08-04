"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { posts } from "@/lib/posts"

const tags = ["Todos", ...Array.from(new Set(posts.map((p) => p.tag)))]

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("Todos")

  const filtered = activeTag === "Todos" ? posts : posts.filter((p) => p.tag === activeTag)
  const showFeatured = activeTag === "Todos"
  const featured = posts[0]
  const rest = showFeatured ? filtered.slice(1) : filtered

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/40 to-background p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_60%)]"
        />
        <div className="relative">
          <Badge variant="secondary">
            <BookOpen className="size-3.5" />
            Blog técnico
          </Badge>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4">
            Ideas sobre <span className="text-gradient">datos, IA y producción</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-7">
            Artículos prácticos sobre Data, AI Engineering y construcción de sistemas reales.
            Sin humo: aprendizajes de proyectos de verdad.
          </p>
        </div>
      </section>

      {/* FILTRO POR TAG */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              activeTag === tag
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:border-foreground/40"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* DESTACADO */}
      {showFeatured && (
        <Link
          href={featured.href}
          className="group mt-6 block rounded-2xl border overflow-hidden transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
            <div className="p-6 md:p-8 flex flex-col justify-center gap-4 order-2 md:order-1">
              <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                <Badge variant="outline">{featured.tag}</Badge>
                <span>
                  {featured.date} · {featured.readTime} de lectura
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-7">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                Leer artículo destacado
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>

            <div
              className={cn(
                "relative min-h-44 md:min-h-full bg-gradient-to-br order-1 md:order-2",
                featured.gradient
              )}
            >
              <featured.icon className="absolute inset-0 m-auto size-20 text-foreground/15 group-hover:text-foreground/30 group-hover:scale-110 transition-all duration-300" />
              <span className="absolute left-5 bottom-4 font-mono text-xs text-muted-foreground">
                {featured.deco}
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* GRID DE ARTÍCULOS */}
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-xl border overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={cn("h-32 relative bg-gradient-to-br", post.gradient)}>
                <post.icon className="absolute right-5 bottom-4 size-12 text-foreground/15 group-hover:text-foreground/35 group-hover:scale-110 transition-all duration-300" />
                <span className="absolute left-5 bottom-4 font-mono text-xs text-muted-foreground">
                  {post.deco}
                </span>
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>
                    {post.date} · {post.readTime}
                  </span>
                  <Badge variant="outline">{post.tag}</Badge>
                </div>

                <h3 className="text-lg md:text-xl font-semibold leading-snug">{post.title}</h3>

                <p className="text-sm text-muted-foreground leading-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Leer artículo
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {rest.length === 0 && !showFeatured && (
          <p className="mt-10 text-center text-muted-foreground">
            No hay artículos con ese tag todavía.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-400/5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">¿Hay un tema que te gustaría leer aquí?</h2>
          <p className="text-muted-foreground mt-1.5 leading-7">
            Proponme un tema de datos o IA y lo convierto en el próximo artículo.
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">Proponer tema</Link>
        </Button>
      </section>
    </main>
  )
}

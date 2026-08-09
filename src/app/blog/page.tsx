"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
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
    <main className="mx-auto max-w-6xl px-5 md:px-8 py-14">
      {/* CABECERA */}
      <section>
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
          Blog técnico
        </p>
        <h1 className="font-display text-4xl md:text-6xl mt-3">
          Aprendizajes <span className="text-shimmer">documentados</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground leading-7">
          Artículos prácticos sobre Data, AI Engineering y sistemas reales. Sin humo:
          lo que funciona y, sobre todo, lo que no.
        </p>
      </section>

      {/* FILTRO */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-[13px] transition-all",
              activeTag === tag
                ? "border-accent bg-accent text-accent-foreground font-semibold shadow-glow"
                : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
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
          className="group relative block mt-8 rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-7 md:p-10 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
        >
          <ArrowUpRight className="absolute top-7 right-7 size-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <div className="flex items-center gap-3 flex-wrap">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              Destacado
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {featured.date} · {featured.readTime} · {featured.deco}
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl mt-5 max-w-4xl leading-tight pr-8">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-7">{featured.excerpt}</p>
          <p className="mt-6 text-sm font-semibold text-accent">Leer artículo →</p>
        </Link>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {rest.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group relative block rounded-2xl border border-border bg-gradient-to-br from-secondary to-transparent p-6 md:p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
          >
            <ArrowUpRight className="absolute top-6 right-6 size-4 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="flex items-center gap-3 flex-wrap">
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet">
                {post.tag}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {post.date} · {post.readTime}
              </span>
            </div>
            <h3 className="font-display text-lg md:text-xl mt-4 leading-snug pr-6">
              {post.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-6 line-clamp-3">
              {post.excerpt}
            </p>
            <p className="mt-4 font-mono text-xs text-accent">{post.deco}</p>
          </Link>
        ))}
      </div>

      {rest.length === 0 && !showFeatured && (
        <p className="mt-14 text-center text-muted-foreground">
          No hay artículos con ese tag todavía.
        </p>
      )}

      {/* CTA */}
      <section className="mt-16 rounded-2xl border border-border bg-gradient-to-r from-accent/5 via-transparent to-violet/5 p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <h2 className="font-display text-xl md:text-2xl">
            ¿Hay un tema que te gustaría leer aquí?
          </h2>
          <p className="text-muted-foreground mt-1.5 leading-7">
            Proponme un tema de datos o IA y lo convierto en el próximo artículo.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-xl bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:shadow-glow-strong hover:-translate-y-0.5 transition-all"
        >
          Proponer tema
        </Link>
      </section>
    </main>
  )
}

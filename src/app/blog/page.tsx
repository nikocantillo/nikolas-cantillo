"use client"

import Link from "next/link"
import { useState } from "react"
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
    <main>
      {/* CABECERA */}
      <section className="border-b-2 border-ink px-6 md:px-10 py-10 md:py-14">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest flex justify-between text-muted-foreground">
          <span>Blog / Índice</span>
          <span className="text-accent">{posts.length} artículos</span>
        </div>
        <h1 className="font-display text-[13vw] md:text-8xl mt-6">
          El <span className="text-outline">Blog</span>
        </h1>
        <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
          Artículos prácticos sobre Data, AI Engineering y construcción de sistemas reales. Sin
          humo: aprendizajes de proyectos de verdad.
        </p>
      </section>

      {/* FILTRO */}
      <div className="border-b-2 border-ink flex flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "px-4 md:px-6 py-3 font-mono text-[10px] md:text-xs uppercase tracking-widest border-r-2 border-ink transition-colors",
              activeTag === tag
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {activeTag === tag && <span className="text-accent mr-1.5">●</span>}
            {tag}
          </button>
        ))}
      </div>

      {/* DESTACADO */}
      {showFeatured && (
        <Link
          href={featured.href}
          className="group block border-b-2 border-ink px-6 md:px-10 py-10 md:py-14 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <div className="flex items-baseline justify-between flex-wrap gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary-foreground/60">
            <span>Destacado — {featured.tag}</span>
            <span>
              {featured.date} · {featured.readTime} · {featured.deco}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-6xl mt-5 max-w-5xl">{featured.title}</h2>
          <p className="mt-5 max-w-3xl leading-7 text-muted-foreground group-hover:text-primary-foreground/70">
            {featured.excerpt}
          </p>
          <span className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-accent group-hover:text-primary-foreground">
            Leer artículo{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </span>
        </Link>
      )}

      {/* LISTA */}
      <section>
        {rest.map((post, i) => (
          <Link
            key={post.href}
            href={post.href}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 px-6 md:px-10 py-7 border-b border-ink/30 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span className="font-mono text-sm text-accent">
              {String(i + (showFeatured ? 2 : 1)).padStart(2, "0")}
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary-foreground/60">
                {post.date} · {post.readTime} · {post.tag}
              </div>
              <h3 className="font-display text-xl md:text-3xl mt-1.5">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground group-hover:text-primary-foreground/70 max-w-3xl">
                {post.excerpt}
              </p>
            </div>
            <span className="font-display text-2xl md:text-4xl transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        ))}

        {rest.length === 0 && !showFeatured && (
          <p className="px-6 md:px-10 py-14 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            No hay artículos con ese tag todavía.
          </p>
        )}
      </section>

      {/* CTA */}
      <section>
        <Link
          href="/contact"
          className="group block px-6 md:px-10 py-12 md:py-16 hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent group-hover:text-accent-foreground">
            Proponer tema
          </span>
          <p className="font-display text-[7vw] md:text-5xl mt-3">
            ¿Qué te gustaría leer aquí?
            <span className="inline-block transition-transform group-hover:translate-x-3"> →</span>
          </p>
        </Link>
      </section>
    </main>
  )
}

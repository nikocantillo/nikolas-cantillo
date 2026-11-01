"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { posts, issueNumber } from "@/lib/posts"
import { ArticleCover } from "@/components/blog/article-cover"

const tags = ["Todos", ...Array.from(new Set(posts.map((p) => p.tag)))]

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("Todos")

  const filtered = activeTag === "Todos" ? posts : posts.filter((p) => p.tag === activeTag)
  const showFeatured = activeTag === "Todos"
  const featured = posts[0]
  const rest = showFeatured ? filtered.slice(1) : filtered

  return (
    <main className="mx-auto max-w-[1200px] px-6 pt-10 md:pt-16 pb-[12vh]">
      {/* CABECERA */}
      <header className="text-center">
        <p className="text-[13px] uppercase tracking-[0.14em] text-foreground/60">
          {posts.length} escritos · datos, arquitectura e IA
        </p>
        <h1 className="font-display mt-5 text-[clamp(3rem,8vw,6.5rem)] leading-none">Escritos</h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug text-foreground/70">
          Artículos prácticos sobre datos e inteligencia artificial. Lo que funciona y, sobre todo,
          lo que no.
        </p>
      </header>

      {/* FILTRO */}
      <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-y border-black/10 py-4 text-[14px]">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "transition-opacity",
              activeTag === tag
                ? "font-medium opacity-100 text-accent"
                : "opacity-60 hover:opacity-100"
            )}
          >
            {tag}
          </button>
        ))}
      </nav>

      {/* DESTACADO */}
      {showFeatured && (
        <Link
          href={featured.href}
          className="group mt-14 grid items-center gap-8 md:grid-cols-[1.3fr_1fr] md:gap-12"
        >
          <ArticleCover seed={featured.href} className="aspect-[16/10] w-full rounded-[1.25rem]" />
          <div>
            <p className="text-[13px] uppercase tracking-[0.14em] text-foreground/60">
              Nº {issueNumber(featured.href)} · {featured.tag}
            </p>
            <h2 className="font-display mt-4 text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.08] group-hover:text-accent transition-colors">
              {featured.title}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-foreground/70">{featured.excerpt}</p>
            <p className="mt-6 text-[14px] text-foreground/55">
              Por <span className="font-medium">Nikolas Cantillo</span> · {featured.date}{" "}
              · {featured.readTime}
            </p>
          </div>
        </Link>
      )}

      {/* GRILLA */}
      <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-black/10 pt-14 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link key={post.href} href={post.href} className="group block">
            <ArticleCover seed={post.href} className="aspect-[16/10] w-full rounded-[1rem]" />
            <p className="mt-5 text-[12.5px] uppercase tracking-[0.12em] text-foreground/55">
              Nº {issueNumber(post.href)} · {post.tag}
            </p>
            <h3 className="font-display mt-2 text-[1.7rem] leading-tight group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-foreground/70 line-clamp-3">
              {post.excerpt}
            </p>
            <p className="mt-4 text-[13.5px] text-foreground/55">
              {post.date} · {post.readTime}
            </p>
          </Link>
        ))}
      </div>

      {rest.length === 0 && !showFeatured && (
        <p className="mt-14 text-center text-foreground/60">No hay escritos con ese tema todavía.</p>
      )}

      {/* PROPONER TEMA */}
      <section className="mt-24 border-t border-black/10 pt-14 text-center">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)]">
          ¿Hay un tema que te gustaría leer aquí?
        </h2>
        <p className="mx-auto mt-3 max-w-[50ch] text-[17px] text-foreground/70">
          Proponme un tema de datos o IA y lo convierto en el próximo escrito.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="pill-link">
            Proponer tema
          </Link>
        </div>
      </section>
    </main>
  )
}

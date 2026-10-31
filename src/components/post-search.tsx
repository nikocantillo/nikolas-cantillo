"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { posts } from "@/lib/posts"

// Minúsculas y sin tildes, para que "vedica" encuentre "védica".
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

export function PostSearch({ initial = 4 }: { initial?: number }) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return posts.slice(0, initial)
    return posts.filter((p) => normalize(`${p.title} ${p.excerpt} ${p.tag}`).includes(q))
  }, [query, initial])

  return (
    <>
      <label className="relative mb-10 block max-w-[480px]">
        <span className="sr-only">Buscar escritos</span>
        <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-foreground/45" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar escritos"
          className="h-12 w-full rounded-full border border-black/15 bg-transparent pl-12 pr-5 text-[15px] outline-none transition-colors placeholder:text-foreground/45 focus:border-accent/50"
        />
      </label>

      {results.length === 0 ? (
        <p className="text-[16px] text-foreground/60">
          No hay escritos que coincidan con «{query}».
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {results.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col rounded-[1.25rem] border border-black/10 p-7 transition-colors hover:bg-card"
            >
              <span className="text-[13px] uppercase tracking-[0.08em] text-foreground/55">
                {post.tag}
              </span>
              <h3 className="font-display mt-3 text-[1.6rem] leading-tight group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/70 line-clamp-3">
                {post.excerpt}
              </p>
              <span className="mt-auto pt-5 text-[13.5px] text-foreground/55">
                {post.date} · {post.readTime}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

export type SearchItem = {
  title: string
  href: string
  kind: string
  text: string
}

// Minúsculas y sin tildes, para que "vedica" encuentre "védica".
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return items.filter((it) => normalize(`${it.title} ${it.kind} ${it.text}`).includes(q))
  }, [query, items])

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Buscar trabajos y escritos</span>
        <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-foreground/45" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar trabajos y escritos"
          className="h-14 w-full rounded-full border border-black/15 bg-transparent pl-12 pr-5 text-[16px] outline-none transition-colors placeholder:text-foreground/45 focus:border-accent/50"
        />
      </label>

      {query.trim() &&
        (results.length === 0 ? (
          <p className="mt-5 px-5 text-[15px] text-foreground/60">
            No hay resultados para «{query}».
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-black/10 rounded-[1.25rem] border border-black/10">
            {results.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="group flex items-baseline justify-between gap-4 px-6 py-4 transition-colors hover:bg-card"
                >
                  <span className="font-display text-[1.3rem] leading-snug group-hover:text-accent transition-colors">
                    {it.title}
                  </span>
                  <span className="shrink-0 text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
                    {it.kind}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
    </div>
  )
}

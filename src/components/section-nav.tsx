"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Item = { id: string; label: string }

// Índice fijo a la izquierda que marca con un punto la sección visible.
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const it of items) {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Secciones"
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden min-[1100px]:block"
    >
      <ul className="flex flex-col gap-1 text-[15px]">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cn(
                "relative inline-block transition-all duration-200",
                active === it.id
                  ? "pl-2 font-medium text-foreground opacity-100 before:absolute before:left-0 before:content-['·']"
                  : "text-foreground opacity-60 hover:opacity-100"
              )}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

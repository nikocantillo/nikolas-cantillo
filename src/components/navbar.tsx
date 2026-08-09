"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink bg-background">
      <div className="flex items-stretch justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 md:px-6 py-3 font-display text-base hover:text-accent transition-colors"
        >
          Nikolas Cantillo
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5 hidden sm:inline">
            — Data & AI
          </span>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-stretch">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-5 text-sm border-l border-border transition-colors",
                isActive(item.href)
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Links mobile */}
      <nav className="md:hidden flex items-stretch border-t border-border">
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 text-center py-2 text-xs transition-colors",
              i > 0 && "border-l border-border",
              isActive(item.href)
                ? "text-accent font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

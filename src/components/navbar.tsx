"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <Link href="/" className="font-display text-[15px] hover:text-accent transition-colors">
          nikolas<span className="text-accent">.</span>cantillo
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 md:px-4 py-1.5 text-[13px] md:text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "ml-1 md:ml-2 rounded-full px-3.5 md:px-4 py-1.5 text-[13px] md:text-sm font-semibold transition-all",
              "bg-accent text-accent-foreground shadow-glow hover:shadow-glow-strong"
            )}
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  )
}

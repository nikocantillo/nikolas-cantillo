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
    <header className="sticky top-0 z-50 w-full border-b border-ink bg-background">
      <div className="flex items-stretch justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 md:px-6 py-3 font-display text-sm md:text-base border-r border-ink hover:bg-secondary transition-colors"
        >
          Nikolas&nbsp;Cantillo
          <span className="text-accent">®</span>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-stretch">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-5 font-mono text-xs uppercase tracking-widest border-l border-ink transition-colors",
                isActive(item.href) ? "bg-secondary" : "hover:bg-secondary"
              )}
            >
              {isActive(item.href) && <span className="text-accent mr-1.5">●</span>}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Links mobile */}
      <nav className="md:hidden flex items-stretch border-t border-ink">
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 text-center py-2 font-mono text-[10px] uppercase tracking-wider transition-colors",
              i > 0 && "border-l border-ink",
              isActive(item.href) ? "bg-secondary" : "hover:bg-secondary"
            )}
          >
            {isActive(item.href) && <span className="text-accent mr-1">●</span>}
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

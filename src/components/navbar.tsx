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
          className="flex items-center gap-2 px-4 md:px-6 py-3 font-display text-sm md:text-base border-r-2 border-ink hover:bg-primary hover:text-primary-foreground transition-colors"
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
                "flex items-center px-5 font-mono text-xs uppercase tracking-widest border-l-2 border-ink transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary hover:text-primary-foreground"
              )}
            >
              {isActive(item.href) && <span className="text-accent mr-1.5">●</span>}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Links mobile */}
      <nav className="md:hidden flex items-stretch border-t-2 border-ink">
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 text-center py-2 font-mono text-[10px] uppercase tracking-wider transition-colors",
              i > 0 && "border-l-2 border-ink",
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

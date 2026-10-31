"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
    {/* En la home el header flota sobre la portada; en el resto reserva su alto */}
    {pathname !== "/" && <div className="h-20" />}
    <header className="absolute top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-[22px] hover:text-accent transition-colors">
          Nikolas Cantillo
        </Link>

        <nav className="flex items-center gap-4 md:gap-7 text-[14px] md:text-[15px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-opacity",
                isActive(item.href)
                  ? "opacity-100 font-medium"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
    </>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <Link href="/" className="font-semibold tracking-tight">
            Nikolas Cantillo
          </Link>

          {/* Center: Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA */}
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/contact">Contact</Link>
            </Button>

            {/* Mobile: simple menu via links (minimalist) */}
            <Button asChild variant="outline" className="md:hidden">
              <Link href="/about">Menu</Link>
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <Separator className="mb-3" />
          <nav className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
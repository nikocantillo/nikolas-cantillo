import Link from "next/link"
import { Github } from "lucide-react"
import { posts } from "@/lib/posts"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-3">
          <p className="font-display text-base">
            nikolas<span className="text-accent">.</span>cantillo
          </p>
          <p className="text-sm text-muted-foreground leading-6 max-w-xs">
            Data Science, AI Engineering y sistemas en producción. Proyectos reales y notebooks
            verificables.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Navegación
          </p>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Últimos artículos
          </p>
          <ul className="space-y-2 text-sm">
            {posts.slice(0, 3).map((post) => (
              <li key={post.href}>
                <Link
                  href={post.href}
                  className="text-muted-foreground hover:text-accent transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 md:px-8 py-4 flex items-center justify-between flex-wrap gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Nikolas Cantillo · Bogotá</span>
          <a
            href="https://github.com/nikocantillo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Github className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

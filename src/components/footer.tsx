import Link from "next/link"
import { posts } from "@/lib/posts"

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-ink mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-ink">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Índice
          </p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-xl hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-ink">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Últimos artículos
          </p>
          <ul className="mt-4 space-y-3">
            {posts.slice(0, 3).map((post) => (
              <li key={post.href}>
                <Link
                  href={post.href}
                  className="text-sm leading-snug hover:text-accent transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Contacto
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Data Science, AI Engineering y sistemas en producción.
            </p>
          </div>
          <a
            href="https://github.com/nikocantillo"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="border-t border-ink px-6 py-3 flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Nikolas Cantillo
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Bogotá · Remoto
        </span>
      </div>
    </footer>
  )
}

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
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="size-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              Nikolas Cantillo
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-6">
              Data Science, AI Engineering y sistemas en producción. Proyectos, demos y
              aprendizajes reales.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navegación</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Últimos artículos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {posts.slice(0, 2).map((post) => (
                <li key={post.href}>
                  <Link href={post.href} className="hover:text-foreground transition-colors line-clamp-2">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex items-center justify-between flex-wrap gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Nikolas Cantillo</span>
          <a
            href="https://github.com/nikocantillo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

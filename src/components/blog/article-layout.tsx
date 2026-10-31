import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, issueNumber } from "@/lib/posts"
import { ArticleCover } from "@/components/blog/article-cover"
import { ShareActions } from "@/components/blog/share-actions"
import { ReadingProgress } from "@/components/blog/reading-progress"

// Maqueta de artículo tipo revista: cabecera centrada, portada abstracta,
// cuerpo en columna estrecha con capitular, ficha de autor y relacionados.
export function ArticleLayout({ href, children }: { href: string; children: React.ReactNode }) {
  const post = posts.find((p) => p.href === href)
  if (!post) notFound()
  const related = posts.filter((p) => p.href !== href).slice(0, 2)

  return (
    <main className="px-6 pb-[12vh]">
      <ReadingProgress />

      {/* CABECERA */}
      <header className="mx-auto max-w-[900px] pt-10 md:pt-16 text-center">
        <p className="text-[13px] uppercase tracking-[0.14em] text-foreground/60">
          <Link href="/blog" className="hover:text-accent transition-colors">
            Escritos
          </Link>
          <span className="mx-2.5">·</span>Nº {issueNumber(href)}
          <span className="mx-2.5">·</span>
          {post.tag}
        </p>
        <h1 className="font-display mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-balance">
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-[clamp(1.15rem,1.6vw,1.4rem)] leading-snug text-foreground/70 text-balance">
          {post.excerpt}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 text-[15px]">
          <span className="relative size-9 overflow-hidden rounded-full">
            <Image src="/nikolascantillo.jpeg" alt="" fill className="object-cover" />
          </span>
          <span>
            Por <em className="font-display text-[1.15em]">Nikolas Cantillo</em>
          </span>
        </div>
      </header>

      {/* PORTADA */}
      <figure className="mx-auto mt-12 md:mt-16 max-w-[1200px]">
        <ArticleCover seed={href} className="aspect-[16/9] w-full rounded-[1.25rem]" />
      </figure>

      {/* METADATOS + COMPARTIR */}
      <div className="mx-auto mt-8 flex max-w-[680px] flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6 text-[14px] text-foreground/60">
        <span>
          Nº {issueNumber(href)} <span className="mx-2">·</span> {post.date}
          <span className="mx-2">·</span> {post.readTime} de lectura
        </span>
        <ShareActions title={post.title} path={href} />
      </div>

      {/* CUERPO */}
      <article className="article-prose mx-auto mt-12 max-w-[680px]">{children}</article>

      {/* AUTOR */}
      <aside className="mx-auto mt-20 flex max-w-[680px] items-center gap-6 border-y border-black/10 py-8">
        <span className="relative size-20 shrink-0 overflow-hidden rounded-full">
          <Image src="/nikolascantillo.jpeg" alt="Nikolas Cantillo" fill className="object-cover" />
        </span>
        <div>
          <p className="font-display text-[1.6rem] italic leading-none">Nikolas Cantillo</p>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">
            Científico de datos y Principal Consultant en Oracle. Magíster en Ciencia de Datos,
            Pontificia Universidad Católica de Chile.{" "}
            <Link href="/about" className="text-accent hover:underline underline-offset-4">
              Más sobre mí
            </Link>
          </p>
        </div>
      </aside>

      {/* RELACIONADOS */}
      <section className="mx-auto mt-20 max-w-[1000px]">
        <h2 className="text-[13px] uppercase tracking-[0.14em] text-foreground/60">
          Sigue leyendo
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {related.map((r) => (
            <Link key={r.href} href={r.href} className="group block">
              <ArticleCover seed={r.href} className="aspect-[16/9] w-full rounded-[1rem]" />
              <p className="mt-4 text-[12.5px] uppercase tracking-[0.12em] text-foreground/55">
                Nº {issueNumber(r.href)} · {r.tag}
              </p>
              <h3 className="font-display mt-2 text-[1.6rem] leading-tight group-hover:text-accent transition-colors">
                {r.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/blog" className="pill-link">
            Todos los escritos
          </Link>
        </div>
      </section>
    </main>
  )
}

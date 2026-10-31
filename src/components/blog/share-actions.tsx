"use client"

import { useState } from "react"
import { Check, Link2, Share2 } from "lucide-react"

type ShareActionsProps = {
  title: string
  path: string
}

export function ShareActions({ title, path }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)

  const getUrl = () => {
    if (typeof window === "undefined") {
      return path
    }
    return `${window.location.origin}${path}`
  }

  const copyLink = async () => {
    const url = getUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const shareLink = async () => {
    const url = getUrl()
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // User canceled or platform blocked share; fallback to copy.
      }
    }
    await copyLink()
  }

  const btn =
    "inline-flex size-10 items-center justify-center rounded-full border border-black/15 text-foreground/70 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-foreground"

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={shareLink} aria-label="Compartir" className={btn}>
        <Share2 className="size-4" />
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Enlace copiado" : "Copiar enlace"}
        className={btn}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  )
}

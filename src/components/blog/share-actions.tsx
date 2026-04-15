"use client"

import { useState } from "react"
import { Check, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      <Button type="button" variant="outline" size="sm" onClick={shareLink}>
        <Share2 className="size-4" />
        Compartir
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copiado" : "Copy link"}
      </Button>
    </div>
  )
}

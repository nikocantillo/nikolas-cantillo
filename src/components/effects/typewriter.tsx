"use client"

import { useEffect, useState } from "react"

export function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("")

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0] ?? "")
      return
    }
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timer: number

    const step = () => {
      const word = phrases[phraseIndex]
      setText(word.slice(0, charIndex))
      if (!deleting && charIndex < word.length) {
        charIndex++
        timer = window.setTimeout(step, 42)
      } else if (!deleting) {
        deleting = true
        timer = window.setTimeout(step, 2100)
      } else if (charIndex > 0) {
        charIndex--
        timer = window.setTimeout(step, 16)
      } else {
        deleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        timer = window.setTimeout(step, 300)
      }
    }
    step()
    return () => window.clearTimeout(timer)
  }, [phrases])

  return (
    <span className="font-mono text-sm md:text-lg text-muted-foreground">
      {text}
      <span className="text-accent animate-pulse">▍</span>
    </span>
  )
}

"use client"

import { useEffect, useRef } from "react"

export function CountUp({
  value,
  decimals = 0,
  className,
}: {
  value: number
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const format = (v: number) =>
      v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(value)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 1200)
          el.textContent = format(value * (1 - Math.pow(1 - k, 3)))
          if (k < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, decimals])

  return (
    <span ref={ref} className={className}>
      0
    </span>
  )
}

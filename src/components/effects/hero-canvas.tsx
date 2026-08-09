"use client"

import { useEffect, useRef } from "react"

type Particle = { x: number; y: number; vx: number; vy: number; violet: boolean }

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = window.devicePixelRatio || 1
    let W = 0
    let H = 0
    let raf = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      W = canvas.width = canvas.offsetWidth * dpr
      H = canvas.height = canvas.offsetHeight * dpr
    }
    resize()

    const N = Math.min(90, Math.floor(window.innerWidth / 14))
    const pts: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      violet: Math.random() > 0.75,
    }))

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - r.left) / r.width
      mouse.y = (e.clientY - r.top) / r.height
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      if (!reduced) {
        for (const p of pts) {
          p.x += p.vx
          p.y += p.vy
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          if (Math.hypot(dx, dy) < 0.16) {
            p.x += dx * 0.012
            p.y += dy * 0.012
          }
          if (p.x < 0 || p.x > 1) p.vx *= -1
          if (p.y < 0 || p.y > 1) p.vy *= -1
        }
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 0.11) {
            ctx.strokeStyle = `rgba(56, 225, 212, ${(1 - d / 0.11) * 0.16})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x * W, a.y * H)
            ctx.lineTo(b.x * W, b.y * H)
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.violet ? "rgba(167, 139, 250, 0.75)" : "rgba(56, 225, 212, 0.75)"
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, 1.6 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(tick)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

"use client"

import { useEffect, useRef } from "react"

type Node = { x: number; y: number; ring: number }
type Edge = { a: number; b: number; ring: number }

const CYAN = "56, 225, 212"
const VIOLET = "167, 139, 250"
const AMBER = "251, 191, 93"

export function GraphMandala({ size = 560 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr

    const SYMMETRIES = [6, 8, 10, 12]
    let symIdx = Math.floor(Math.random() * SYMMETRIES.length)
    let nodes: Node[] = []
    let edges: Edge[] = []
    let progress = 0
    let rotation = 0
    let holdTime = 0
    let fade = 1
    let phase: "drawing" | "hold" | "fading" = "drawing"
    let raf = 0

    const build = (sym: number) => {
      const RINGS = 4
      nodes = [{ x: 0, y: 0, ring: 0 }]
      edges = []
      const ringStart: number[] = [0]

      for (let r = 1; r <= RINGS; r++) {
        ringStart.push(nodes.length)
        const offset = (r % 2) * (Math.PI / sym)
        for (let i = 0; i < sym; i++) {
          const angle = (i / sym) * Math.PI * 2 + offset
          const radius = r / RINGS
          nodes.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, ring: r })
        }
      }

      // Centro → primer anillo
      for (let i = 0; i < sym; i++) edges.push({ a: 0, b: ringStart[1] + i, ring: 1 })

      for (let r = 1; r <= RINGS; r++) {
        const start = ringStart[r]
        // Polígono del anillo
        for (let i = 0; i < sym; i++) {
          edges.push({ a: start + i, b: start + ((i + 1) % sym), ring: r })
        }
        // Tejido hacia el siguiente anillo
        if (r < RINGS) {
          const next = ringStart[r + 1]
          for (let i = 0; i < sym; i++) {
            edges.push({ a: start + i, b: next + i, ring: r + 1 })
            edges.push({ a: start + i, b: next + ((i + 1) % sym), ring: r + 1 })
          }
        }
        // Cuerdas en estrella (anillos pares)
        if (r % 2 === 0) {
          const skip = Math.max(2, Math.floor(sym / 3))
          for (let i = 0; i < sym; i++) {
            edges.push({ a: start + i, b: start + ((i + skip) % sym), ring: r })
          }
        }
      }
      edges.sort((e1, e2) => e1.ring - e2.ring)
    }

    build(SYMMETRIES[symIdx])

    const scale = (size / 2) * 0.92 * dpr
    const cx = (size / 2) * dpr

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(cx, cx)
      ctx.rotate(rotation)
      ctx.globalAlpha = fade

      const total = edges.length
      const visible = progress * total

      for (let k = 0; k < total; k++) {
        if (k >= visible) break
        const e = edges[k]
        const a = nodes[e.a]
        const b = nodes[e.b]
        const f = Math.min(1, visible - k)
        const color = e.ring % 2 === 0 ? VIOLET : CYAN
        ctx.strokeStyle = `rgba(${color}, ${0.28 * f})`
        ctx.lineWidth = 1 * dpr
        ctx.beginPath()
        ctx.moveTo(a.x * scale, a.y * scale)
        ctx.lineTo(a.x * scale + (b.x - a.x) * scale * f, a.y * scale + (b.y - a.y) * scale * f)
        ctx.stroke()
      }

      for (const n of nodes) {
        const nodeReveal = Math.min(1, Math.max(0, progress * 4 - n.ring * 0.85))
        if (nodeReveal <= 0) continue
        const color = n.ring === 0 ? AMBER : n.ring % 2 === 0 ? VIOLET : CYAN
        ctx.fillStyle = `rgba(${color}, ${0.85 * nodeReveal})`
        ctx.shadowColor = `rgba(${color}, 0.6)`
        ctx.shadowBlur = 8 * dpr
        ctx.beginPath()
        ctx.arc(n.x * scale, n.y * scale, (n.ring === 0 ? 3 : 2) * dpr, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      ctx.restore()
    }

    const tick = () => {
      if (phase === "drawing") {
        progress = Math.min(1, progress + 0.0045)
        if (progress >= 1) phase = "hold"
      } else if (phase === "hold") {
        holdTime += 1
        if (holdTime > 420) {
          phase = "fading"
          holdTime = 0
        }
      } else {
        fade -= 0.012
        if (fade <= 0) {
          symIdx = (symIdx + 1) % SYMMETRIES.length
          build(SYMMETRIES[symIdx])
          progress = 0
          fade = 1
          phase = "drawing"
        }
      }
      rotation += 0.0008
      draw()
      raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      progress = 1
      draw()
    } else {
      tick()
    }

    return () => cancelAnimationFrame(raf)
  }, [size])

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ width: size, height: size }}
      className="max-w-full"
    />
  )
}

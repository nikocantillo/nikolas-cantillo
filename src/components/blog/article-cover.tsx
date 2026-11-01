import Image from "next/image"
import { covers } from "@/lib/covers"

// Portada abstracta tipo "papel rasgado": dos planos de color separados por un
// borde irregular. Determinista a partir de `seed`, así cada escrito tiene la suya.

const palettes = [
  { base: "#f3e3dc", tear: "#c34109", edge: "#f09885" },
  { base: "#1a1919", tear: "#f09885", edge: "#f3e3dc" },
  { base: "#f6d9cc", tear: "#8a3a14", edge: "#e8a58a" },
  { base: "#efe5de", tear: "#e07a5f", edge: "#fffbf7" },
  { base: "#c34109", tear: "#f3e3dc", edge: "#ffffff" },
]

function rng(seed: string) {
  let h = 2166136261
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

// Borde vertical: onda amplia + dientes finos de rasgado.
function tearPath(rand: () => number, w: number, h: number, offset = 0) {
  const x0 = w * (0.38 + rand() * 0.24)
  const amp = w * (0.04 + rand() * 0.06)
  const freq = 1 + rand() * 1.5
  const phase = rand() * Math.PI * 2
  const steps = 90
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const y = (h / steps) * i
    const x = x0 + offset + Math.sin((i / steps) * Math.PI * freq + phase) * amp + (rand() - 0.5) * 14
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M${w},0 L${pts.join(" L")} L${w},${h} Z`
}

export function ArticleCover({ seed, className }: { seed: string; className?: string }) {
  // Portada ilustrada (scripts/illustrate.ts --cover) si existe; si no, papel rasgado.
  const cover = covers[seed]
  if (cover) {
    return (
      <Image
        src={cover}
        alt=""
        width={1200}
        height={675}
        unoptimized
        className={`object-cover ${className ?? ""}`}
      />
    )
  }

  const w = 1200
  const h = 675
  const rand = rng(seed)
  const p = palettes[Math.floor(rand() * palettes.length)]
  const id = `grain-${seed.replace(/[^a-z0-9]/gi, "")}`
  // Mismo flujo aleatorio para ambos trazos: el borde claro es el rasgado desplazado.
  const edge = tearPath(rng(`${seed}:tear`), w, h, -12)
  const tear = tearPath(rng(`${seed}:tear`), w, h)

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={p.base} />
      <path d={edge} fill={p.edge} />
      <path d={tear} fill={p.tear} />
      <path d={tear} fill={p.tear} filter={`url(#${id})`} />
    </svg>
  )
}

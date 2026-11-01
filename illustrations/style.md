# Spec de estilo — diagramas del blog "Escritos"

Fuente de verdad para todo SVG en `public/blog/<slug>/`. Valores tomados de
`src/app/globals.css` (sitio editorial: fondo blanco, tinta casi negra, acento óxido,
titulares en serif, cuerpo en grotesca). El script `scripts/illustrate.ts` lo envía
completo al modelo y valida cada figura contra él.

## Lienzo

- `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 H" width="680" height="H">`.
  Ancho fijo 680 (= columna de texto del artículo). `H` lo eliges tú según el contenido.
- Fondo transparente: no dibujes un rectángulo de fondo.
- Márgenes internos de 40px: todo el contenido entre x=40 y x=640, y entre y=40 y y=H-40.
- Coordenadas absolutas. Prohibido `transform` en cualquier elemento.
- Primeros hijos del `<svg>`: `<title>` y `<desc>` en español, luego `<style>`, luego `<defs>`.
- Raíz con `role="img"`.

## Paleta (modo claro, la que ve hoy el lector)

Máximo 3 colores por diagrama además del neutro.

| Rol | Trazo / color base | Relleno (tint ~12%) | Texto sobre el relleno |
|---|---|---|---|
| Neutro | `#111010` tinta · `#5e5853` gris · `#ddd4cd` borde (token `--ink`) | `#f8f5f2` | `#111010` / `#5e5853` |
| Acento (óxido) | `#c34109` | `#f8e8e1` | `#7a2905` |
| Secundario (azul-petróleo) | `#1f6a8c` | `#e4edf1` | `#12415a` |
| Alerta / contraste (ocre) | `#a6791f` | `#f4efe4` | `#6b4e12` |

Uso: el acento marca lo que el lector debe mirar primero; el secundario, la contraparte o el
mecanismo de soporte; la alerta, el riesgo, el ataque o el error. El neutro, todo lo demás.

## Modo oscuro

El sitio hoy es solo claro, pero tiene preparada la variante `.dark` de Tailwind (clase en un
ancestro). Las figuras se incrustan inline en la página, así que el bloque `.dark …` del
`<style>` canónico se activa solo si algún día el sitio añade modo oscuro. No se usa
`prefers-color-scheme`, para no pintar figuras oscuras sobre la página blanca. Colores
oscuros (derivados de la paleta, solo para ese caso): rellenos `#232120` `#3a1d10` `#10283a`
`#33280f`; trazos `#4a4542` `#e07a5f` `#5b9bbd` `#c9a24a`; textos `#f3eeea` `#a39c96` `#f09885`
`#9cc4da` `#e0c27a`.

## Clases (usa SOLO estas; no escribas colores ni tamaños a mano)

El script reemplaza cualquier `<style>` que escribas por el bloque canónico de abajo. Por eso
los colores, tamaños y pesos se aplican con `class`, nunca con `fill="#…"`, `stroke="#…"`,
`font-size` o `style=""`. Los únicos valores literales permitidos en `fill`/`stroke` son
`none`.

Cajas (`<rect>`):
- `b-neutral`, `b-accent`, `b-secondary`, `b-alert` → relleno tint + trazo 1px del color.
- Siempre `rx="6"`.

Texto (`<text>`), combina UNA clase de tamaño con UNA de color:
- Tamaño/peso: `t-label` (14px, 400) · `t-strong` (14px, 500) · `t-sub` (12px, 400) ·
  `t-mono` (12px, 400, monoespaciada: hashes, código, valores).
- Color: `c-ink` · `c-muted` · `c-accent` · `c-secondary` · `c-alert`
  (dentro de una caja de color usa el `c-` de ese color: es el tono oscuro).

Líneas y flechas (`<line>`, `<path>`, `<polyline>`):
- `l-neutral`, `l-accent`, `l-secondary`, `l-alert` (trazo 1px, sin relleno).
- `l-dashed` se puede añadir para relaciones débiles o hipotéticas.
- Flechas: un único `<marker id="arrow">` en `<defs>` con `<path class="m-arrow" d="M0,0 L8,4 L0,8 Z"/>`,
  `viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto"`.
  Referéncialo solo con `marker-end="url(#arrow)"` (nunca `marker-start`): la flecha apunta
  en el sentido en que dibujas la línea, así que trázala desde el origen hacia el destino.

## Tipografía

- Sans del sitio (Inter Tight) con fallback `system-ui, sans-serif`; mono para hashes/código.
- Solo dos tamaños: 14px (etiquetas) y 12px (subtítulos). Pesos 400 y 500.
- Sentence case siempre. Prohibido texto en mayúsculas sostenidas y texto rotado.
- Una caja lleva una etiqueta (14px) y, opcionalmente, un subtítulo (12px) de ≤ 5 palabras.
- Centra el texto en su caja con `text-anchor="middle"` y `dominant-baseline="central"`.
- Idioma de las etiquetas: el del artículo.

## Estructura

- Cada caja es un `<g>` que contiene su `<rect>` y sus `<text>`. Texto fuera de cajas va
  suelto (sin `<g>`), p. ej. una nota o una etiqueta de flecha.
- Máximo 5 cajas por diagrama.
- Ancho de texto estimado: ~8px por carácter a 14px, ~7px a 12px; padding de 24px dentro de
  cada caja. Ningún texto se sale de su caja ni toca otro texto.
- Ninguna flecha cruza cajas ajenas; las flechas van de borde a borde.

## Tipos permitidos

- **Flujo** (`flow`): pasos en secuencia, izquierda→derecha o arriba→abajo.
- **Estructural** (`structural`): contención o capas (una caja que agrupa otras).
- **Comparación** (`comparison`): dos columnas lado a lado con el mismo esquema.
- **Ilustrativo** (`illustrative`): una metáfora espacial simple, sin dibujos figurativos.

## Prohibido

Degradados, sombras, filtros, `<image>`, emojis, iconos dibujados a mano, texto rotado,
mayúsculas sostenidas, `transform`, colores fuera de la paleta, tamaños distintos de 12/14.

## Bloque `<style>` canónico (lo inyecta el script)

```css
text { font-family: "Inter Tight", system-ui, sans-serif; }
.t-label { font-size: 14px; font-weight: 400; }
.t-strong { font-size: 14px; font-weight: 500; }
.t-sub { font-size: 12px; font-weight: 400; }
.t-mono { font-size: 12px; font-weight: 400; font-family: "IBM Plex Mono", ui-monospace, monospace; }
.c-ink { fill: #111010; } .c-muted { fill: #5e5853; }
.c-accent { fill: #7a2905; } .c-secondary { fill: #12415a; } .c-alert { fill: #6b4e12; }
.b-neutral { fill: #f8f5f2; stroke: #ddd4cd; stroke-width: 1; }
.b-accent { fill: #f8e8e1; stroke: #c34109; stroke-width: 1; }
.b-secondary { fill: #e4edf1; stroke: #1f6a8c; stroke-width: 1; }
.b-alert { fill: #f4efe4; stroke: #a6791f; stroke-width: 1; }
.l-neutral { fill: none; stroke: #5e5853; stroke-width: 1; }
.l-accent { fill: none; stroke: #c34109; stroke-width: 1; }
.l-secondary { fill: none; stroke: #1f6a8c; stroke-width: 1; }
.l-alert { fill: none; stroke: #a6791f; stroke-width: 1; }
.l-dashed { stroke-dasharray: 4 3; }
.m-arrow { fill: #5e5853; }
.dark .c-ink { fill: #f3eeea; } .dark .c-muted { fill: #a39c96; }
.dark .c-accent { fill: #f09885; } .dark .c-secondary { fill: #9cc4da; } .dark .c-alert { fill: #e0c27a; }
.dark .b-neutral { fill: #232120; stroke: #4a4542; }
.dark .b-accent { fill: #3a1d10; stroke: #e07a5f; }
.dark .b-secondary { fill: #10283a; stroke: #5b9bbd; }
.dark .b-alert { fill: #33280f; stroke: #c9a24a; }
.dark .l-neutral, .dark .m-arrow { stroke: #a39c96; }
.dark .m-arrow { fill: #a39c96; }
.dark .l-accent { stroke: #e07a5f; } .dark .l-secondary { stroke: #5b9bbd; } .dark .l-alert { stroke: #c9a24a; }
```

## Accesibilidad

`role="img"`, `<title>` (qué es la figura, ≤ 10 palabras) y `<desc>` (qué muestra y qué
debe entender el lector, 1–2 frases), en español.

## Figuras manuales

Un SVG que contenga `<!-- manual -->` fue editado a mano: el script nunca lo sobrescribe.

# Ilustraciones del blog

Diagramas SVG generados con Claude para los escritos de `src/app/blog/<slug>/page.tsx`.

- `illustrations/style.md` — spec de estilo (fuente de verdad): paleta real del sitio,
  tipografía, clases permitidas y el bloque `<style>` canónico que se inyecta en cada SVG.
- `scripts/illustrate.ts` — CLI que planifica, genera, valida e inserta las figuras.
- `src/components/blog/figure.tsx` — `<Figure>` incrusta el SVG inline con su pie.

## Configuración

Crea `.env.local` en la raíz (ya está en `.gitignore`; nunca se commitea):

```
ANTHROPIC_API_KEY=sk-ant-...
# opcional, por defecto claude-sonnet-5-5
ILLUSTRATE_MODEL=claude-sonnet-5-5
```

## Uso

```
npm run illustrate -- <slug>             # un escrito
npm run illustrate -- --all              # todos los que aún no tienen figuras
npm run illustrate -- <slug> --force     # regenerar aunque no haya cambios
npm run illustrate -- <slug> --dry-run   # solo mostrar el plan (1 llamada, no escribe nada)
npm run illustrate -- <slug> --cover     # portada ilustrada (imagen principal)
npm run illustrate -- --all --cover      # portadas para todos los que no tienen
npm run illustrate -- --all --og         # rehacer las imágenes para redes (sin API)
```

## Versión móvil de los diagramas

Cada figura tiene además `fig-NN.mobile.svg`: el mismo diagrama rehecho en una columna de
320px (spec en `illustrations/mobile-style.md`), generado a partir del SVG de escritorio y
validado igual que él. En pantallas de hasta 640px `<Figure>` muestra esa versión a tamaño
real; si una figura no tiene versión móvil, se muestra la de escritorio con scroll lateral.
Se regenera sola cuando cambia el SVG de escritorio o algún spec.

## Portadas

`--cover` genera `public/blog/<slug>/cover.svg` con el spec de `illustrations/cover-style.md`:
una ilustración editorial abstracta (papel rasgado, capas, una metáfora visual de la idea
del escrito, sin texto) en la paleta de las portadas. Se valida (XML, 1200×675, paleta,
sin texto ni imágenes, solo el filtro de grano) y se registra en `src/lib/covers.ts`, que
`ArticleCover` consulta: si un escrito no tiene portada generada, sigue usando el papel
rasgado automático. Además escribe `src/app/blog/<slug>/opengraph-image.png` (1200×630,
recorte central de la portada): Next la publica como `og:image` para Facebook, LinkedIn y X.
Misma caché (por texto del escrito + spec) y mismo `<!-- manual -->`.

Por cada escrito:

1. **Plan** (1 llamada): elige 2–4 conceptos y el H2 tras el que va cada figura.
2. **Generación** (1 llamada por figura) con el spec completo como system prompt.
3. **Validación**: XML válido, `role="img"`, `<title>`, `<desc>`, ancho 680, colores solo de
   la paleta, sin filtros/degradados/imágenes/`transform`, tamaños 12/14, y geometría real:
   cada `<text>` se renderiza con resvg para comprobar que no se sale del viewBox ni de su
   caja y que no se superpone a otro texto; las líneas rectas no cruzan cajas ajenas.
   Si falla, hasta 2 reintentos con la lista exacta de errores; si sigue fallando, la figura
   no se inserta y se reporta.
4. **Salida**: `public/blog/<slug>/fig-NN.svg`, `manifest.json` (id, pie, H2, modelo y
   SHA-256 de la sección y del spec) y un `<Figure>` insertado tras el primer párrafo del H2.
   Previews PNG en `illustrations/.previews/` (ignorado por git).

Al final imprime figuras creadas/saltadas/fallidas, tokens y costo estimado.

## Caché y ediciones a mano

- Si no cambió ni el texto de la sección ni `style.md`, la figura no se regenera (salvo
  `--force`). Editar `style.md` invalida todas las figuras.
- Si editas un SVG a mano, añade `<!-- manual -->` dentro del archivo: el script no lo toca.
- Para quitar una figura, borra su `<Figure …/>` del post y su archivo SVG.

## Notas

- La medición de texto usa fuentes del sistema (Segoe UI / Consolas en Windows), algo más
  anchas que Inter Tight: si cabe al validar, cabe en el sitio.
- El sitio hoy es solo claro; el `<style>` canónico trae reglas `.dark …` listas para cuando
  exista un modo oscuro por clase.

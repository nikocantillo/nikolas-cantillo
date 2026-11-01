# Spec de estilo — portadas de los escritos

Fuente de verdad para `public/blog/<slug>/cover.svg`, la imagen principal de cada escrito
(cabecera del artículo, listado del blog, home y "Sigue leyendo"). Las genera
`npm run illustrate -- <slug> --cover`. Distinto de `style.md`: aquí no hay diagramas ni
texto, sino una ilustración editorial abstracta, en la línea de las revistas de ensayo.

## Lienzo

- `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">`.
- El primer elemento visible es un `<rect>` de fondo que cubre todo el lienzo.
- Se recorta a 16:10 en las tarjetas: deja lo esencial dentro del área central
  (x 75–1125); nada importante pegado a los bordes.
- Raíz con `role="img"`, y `<title>` y `<desc>` en español (qué representa la ilustración).

## Paleta (exacta, la de las portadas actuales del sitio)

`#f3e3dc` durazno · `#f6d9cc` durazno claro · `#efe5de` hueso · `#fffbf7` papel ·
`#ffffff` blanco · `#c34109` óxido · `#e07a5f` óxido claro · `#f09885` salmón ·
`#8a3a14` óxido oscuro · `#1a1919` noche · `#111010` tinta.

Usa entre 3 y 5 de estos colores por portada. Colores directos en `fill`/`stroke`
(aquí sí se permiten literales, siempre de esta lista).

## Lenguaje visual

- Abstracción editorial de papel cortado y rasgado, coherente con las portadas actuales del
  sitio: al menos una forma con borde rasgado (un `<path>` irregular con muchos puntos y
  pequeños dientes), y capas de papel superpuestas donde una franja clara de 6–14px asoma
  bajo el borde de la capa de encima, como el canto de una hoja rota.
- Mezcla esos bordes orgánicos con alguna forma limpia (círculo, arco, banda) para dar
  contraste. Evita la geometría pura sin ningún borde rasgado.
- Composición asimétrica con aire generoso y un foco claro.
- Una metáfora visual de la idea central del escrito, legible sin palabras (p. ej. dos
  piezas que encajan para "complementar", una forma partida para "integridad", capas para
  "linaje"). Simple: 3–8 formas principales, no un collage recargado.
- Debe funcionar en miniatura (tarjeta de ~350px de ancho): contraste alto entre masas.
- Textura opcional: un único `<filter id="grain">` de ruido (`feTurbulence` +
  `feColorMatrix` + `feComposite`) aplicado a una o dos formas, con opacidad baja.

## Prohibido

Texto, letras, números, logotipos, rostros o figuras humanas realistas, manos dibujadas,
iconos (engranajes, cerebros, robots, chips), fotorrealismo, degradados, sombras,
`<image>`, `<foreignObject>`, `<script>`, colores fuera de la paleta.

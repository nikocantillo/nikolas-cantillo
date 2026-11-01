# Variante móvil de los diagramas

Complemento de `style.md` para `public/blog/<slug>/fig-NN.mobile.svg`, la versión que ve el
lector en pantallas de hasta 640px. Todo lo de `style.md` sigue vigente (paleta, clases,
tamaños 12/14, `rx="6"`, flechas, accesibilidad, prohibiciones) **excepto el lienzo**, que
se reemplaza por esto:

- `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 H" width="320" height="H" role="img">`.
  Ancho fijo 320 (≈ la columna de texto en un celular): se muestra a tamaño real, así que
  14px se leen como 14px.
- Márgenes internos de 16px: contenido entre x=16 y x=304. Cajas de 288px de ancho como
  máximo.
- Una sola columna, de arriba abajo. Lo que en escritorio va lado a lado se apila:
  - flujo horizontal → flujo vertical, flechas hacia abajo;
  - comparación → los dos bloques uno debajo del otro, cada uno con su encabezado;
  - estructural → el contenedor envuelve sus cajas apiladas.
- Mismas etiquetas, colores y clases que la versión de escritorio. Si una etiqueta no cabe
  (~8px por carácter a 14px, ~7px a 12px, con 16px de padding), pártela en dos `<text>`
  en líneas distintas antes que acortarla; acórtala solo si no cambia el significado.
- Separación vertical generosa (≥ 24px entre cajas) para que las flechas y sus etiquetas
  respiren.

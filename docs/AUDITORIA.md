# Auditoría adversarial

Casos pensados para romper backend y cliente. Los casos marcados como "Cubierto por Jest/RTL" están automatizados; los de "Revisión manual" se probaron a mano en el navegador.

| Caso                       | Esperado                               | Obtenido                           | Estado | Corrección                                    |
| -------------------------- | -------------------------------------- | ---------------------------------- | ------ | --------------------------------------------- |
| API caída, cliente abierto | Spinner y luego error + Reintentar     | Spinner + error + botón Reintentar | OK     | `useProducts` captura `Failed to fetch`       |
| `GET /api/productos/abc`   | 400                                    | Cubierto por Jest                  | OK     | `parsePositiveIntId`                          |
| `GET /api/productos/-1`    | 400                                    | Cubierto por Jest                  | OK     | idem                                          |
| `GET /api/productos/99999` | 404                                    | Cubierto por Jest                  | OK     |                                               |
| `GET /api/productos/1.5`   | 400                                    | Cubierto por Jest                  | OK     |                                               |
| JSON malformado POST       | 400 `JSON malformado`                  | Cubierto por Jest                  | OK     | `errorHandler`                                |
| Ruta inexistente           | 404 formato estándar                   | Cubierto por Jest                  | OK     | `notFound`                                    |
| Imagen inexistente         | 404                                    | 404 JSON formato estándar          | OK     | catch-all                                     |
| `localStorage` corrupto    | Carrito vacío, sin crash               | Cubierto por RTL                   | OK     | `loadCart` try/catch                          |
| Cantidad negativa          | Se clampa a 1                          | Cubierto por `updateQuantity`      | OK     | `Math.max(1, cantidad)`                       |
| Sin stock                  | Botón deshabilitado; `addToCart` no-op | Cubierto por test + UI             | OK     |                                               |
| Doble clic en agregar      | No supera stock                        | Estado funcional en `setItems`     | OK     |                                               |
| Viewport 320 px            | Layout usable, menú hamburguesa        | Revisión manual en el navegador    | OK     | Responsive con menú hamburguesa implementado  |
| Solo teclado               | Foco visible, skip link                | Revisión manual en el navegador    | OK     | Skip link en Layout, foco visible en Tailwind |
| Zoom 200 %                 | Sin solapamiento grave                 | Revisión manual en el navegador    | OK     | Uso de unidades relativas en Tailwind         |
| Stack en production        | No se envía                            | Cubierto por Jest                  | OK     |                                               |
| Envío $50.000 vs $50.001   | $5.000 / gratis                        | Cubierto por tests                 | OK     | `getShipping` usa `>`                         |

## Revisión estática

Buscado: `var`, `==`, `.then(`, keys por índice, `innerHTML`, `dangerouslySetInnerHTML`, estilos inline, `console.log` de depuración, URLs hardcodeadas, secretos. Las únicas excepciones permitidas son el logger del backend y el mensaje de arranque en `server.js`.

**Resultado:** No se encontraron antipatrones en el código activo (backend + client). La carpeta `legacy/` fue eliminada en el cierre de Sprint 3-4.

## Cambios en cierre de Sprint 3-4

- **Carrito**: Migrado de Context API a estado en `App.js` con props usando `Outlet context`.
- **ContactForm**: Reescrito con `useState` controlado, eliminando `react-hook-form` y `zod`. Validación movida a `utils/validateContact.js`.
- **ProductDetail**: Agregado comentario de una línea indicando el renderizado condicional.
- **Legacy**: Eliminada carpeta `legacy/` con el sitio estático de Sprints 1-2.
- **Limpieza**: Verificado que no haya `.env` trackeado, ni `console.log` de depuración, `var`, `==`, `.then(`, keys por índice ni estilos inline.

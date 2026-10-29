# Uso de IA

Registro para el “humano en el circuito”: qué se delegó, cómo se validó y qué se corrigió.

| Qué se pidió                                         | Qué produjo la IA                                                  | Cómo se validó                                                                       | Qué se corrigió                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Migrar el estático a monorepo + API + React          | Árbol `backend/` y `client/`, contrato, tests de API               | Lectura de `AGENTS.md`, consigna y `docs/api-contract.md`; `npm test` / lint / build | La sesión se cortó por límite de uso: scripts raíz seguían en placeholder, sin Husky ni README de Sprint 3-4 |
| Filtros del catálogo                                 | Primer intento llamaba `onChange` dentro de `useMemo`              | Revisión de reglas de hooks                                                          | Estado de filtros elevado a `ProductList`                                                                    |
| Botones con navegación                               | `Button` envolviendo `Link` (botón anidado inválido)               | Revisión a11y / HTML                                                                 | `Button` acepta `to` y renderiza `Link`                                                                      |
| Datos de marca                                       | Textos de contacto del manual; materiales ajustados a taller local | Contraste con el manual de marca (`docs/brand-kit`) y el sitio estático original     | Se reemplazaron las imágenes provisorias por las fotos reales del kit de marca (`backend/public/images`)     |
| Commits Conventional / reescribir historial a inglés | No se ejecutó                                                      | Pedido del equipo                                                                    | Lo hace una persona del equipo; la IA solo propone mensajes                                                  |
| Cierre Sprint 3-4                                    | Migración de carrito a props, ContactForm con useState, limpieza   | Revisión de consigna, verificación de cambios en tests y README                      | Tests actualizados para eliminar dependencias de Context API y react-hook-form                               |

## Qué no debe hacer la IA

- `git commit` / `git push` / reescribir historial.
- Inventar precios, certificaciones o contactos que no estén en el manual de marca o en el sitio original.
- Cambiar el contrato de la API sin acuerdo.

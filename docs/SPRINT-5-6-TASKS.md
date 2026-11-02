# Sprint 5 y 6 — Informe de tareas (puedes borrar este archivo)

Objetivo cumplido: "Persistencia de Datos y CRUD Completo" — API Express conectada a MongoDB con Mongoose, CRUD completo de productos y frontend React con formularios + React Router.

## Estado final: TODAS LAS FASES COMPLETADAS Y VERIFICADAS EN VIVO

- [x] FASE 1 — Backend: base y conexión (`config/db.js`, server.js, CORS con allowlist, health check, 404)
- [x] FASE 2 — Backend: modelo `Product` (Mongoose) + CRUD completo + `seed.js` con 8 productos reales del proyecto
- [x] FASE 3 — Frontend: `services/api.js` (5 funciones del CRUD, normaliza ids de Mongo)
- [x] FASE 4 — Frontend: rutas (`/productos/:id`, `/productos/:id/editar`, `/admin/crear-producto`), Navbar
- [x] FASE 5 — Frontend: `ProductoForm` controlado, `useNavigate`, confirm eliminar, estados de UI, `vercel.json`, build OK
- [x] FASE 6 — README.md completo (endpoints, variables, guía de deploy)

## Verificaciones corridas (todos los resultados son reales)

| Verificación                                                                                                   | Resultado                                                                                        |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Jest backend (11 tests)                                                                                        | 11/11 ✅                                                                                         |
| Jest cliente (29 tests)                                                                                        | 29/29 ✅                                                                                         |
| `npm run build` (client)                                                                                       | Compiled successfully ✅                                                                         |
| ESLint                                                                                                         | 0 errores ✅                                                                                     |
| Arranque falla limpio sin DB                                                                                   | mensaje claro + exit 1 ✅                                                                        |
| Seed en MongoDB real (local 7.0.14)                                                                            | 8 productos cargados ✅                                                                          |
| GET todos / por id / 404 / 400                                                                                 | ✅ vía curl en vivo                                                                              |
| POST válido (201) / POST sin nombre (400) / PUT (200) / PUT precio negativo (400) / DELETE (200, repetido 404) | ✅ vía curl en vivo                                                                              |
| **Ciclo completo UI → API → DB en navegador**                                                                  | crear (POST 201 + navigate) / editar (PUT + detalle precargado) / eliminar (confirm + DELETE) ✅ |

## Estado del despliegue

- [x] Frontend publicado en Vercel: https://muebleria-hermanos-jota-sprint-5-6.vercel.app
- [x] Backend publicado en Render: https://muebleria-jota-api-q4ez.onrender.com
- [x] Verificación HTTP del frontend y `GET /api/productos` realizada el 1 de noviembre de 2026.

La configuración de producción (por ejemplo, `MONGODB_URI` y `CLIENT_URL`) se administra en el panel del proveedor y no se incluye en el repositorio. Para repetir el despliegue, seguir los pasos de la sección **Deploy paso a paso** del README.

## Adaptaciones respecto al documento original del sprint

- CRA (no Vite) → `REACT_APP_API_URL` en lugar de `VITE_API_URL`
- Puertos: backend 4000 / client 3000 (convención existente del proyecto; evita el salto de puerto de CRA)
- Contrato de respuesta: `{ mensaje }` y arrays directos, documentado en `docs/api-contract.md`
- `_id` de Mongo normalizado a `id` en `services/api.js` para mantener carrito y estilos intactos

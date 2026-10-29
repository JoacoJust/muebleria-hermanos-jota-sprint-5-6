# Sprint 5 y 6 — Lista de tareas (borrar al final del sprint)

Estado del sprint "Persistencia de Datos y CRUD Completo". ✅ COMPLETADO — puedes borrar este archivo.

- [x] FASE 1 — Backend: base y conexión
- [x] FASE 2 — Backend: modelo Mongoose + CRUD + seed (node --check OK, 11/11 tests OK; curl vivo pendiente de MONGODB_URI real)
- [x] FASE 3 — Frontend: services/api.js
- [x] FASE 4 — Frontend: rutas React Router + Navbar
- [x] FASE 5 — Frontend: ProductoForm, useNavigate, confirm eliminar, vercel.json (build `Compiled successfully`, 29/29 tests client)
- [x] FASE 6 — README.md
- [x] Informe final entregado en la conversación

Adaptaciones registradas:
- CRA (no Vite): variable `REACT_APP_API_URL` (no `VITE_API_URL`).
- Puertos: backend 4000 / client 3000 (como estaba el proyecto); el documento del sprint proponía 3000/5173 (Vite) pero colisiona con CRA.
- Ids de MongoDB (`_id` string) normalizados en `services/api.js` para no reescribir carrito y estilos.

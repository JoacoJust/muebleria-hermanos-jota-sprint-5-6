# Contrato de API — Hermanos Jota

Fuente de verdad para el backend. Cualquier cambio requiere acuerdo del equipo.

Base URL (desarrollo): `http://localhost:4000`

> **Sprint 5-6:** la API persiste en MongoDB Atlas vía Mongoose. El formato cambió
> respecto del Sprint 3-4: los listados devuelven el array directamente y los
> errores usan `{ "mensaje": "..." }`. El cliente normaliza los campos de
> Mongoose (`_id` → `id`, `imagenUrl` → `imagen`, `stock` → `cantidad`, `enStock`)
> en `client/src/services/api.js`.

Formato de éxito: el recurso directamente (objeto o array).

Formato de error: `{ "mensaje": "..." }`.

---

## Esquema `Product` (Mongoose)

| Campo         | Tipo     | Notas                                       |
| ------------- | -------- | ------------------------------------------- |
| `_id`         | ObjectId | Generado por MongoDB                        |
| `nombre`      | string   | **required**, trimmed                       |
| `descripcion` | string   | Trimmed                                     |
| `precio`      | number   | **required**, min 0                         |
| `stock`       | number   | Default 0, min 0                            |
| `imagenUrl`   | string   | Ruta `/images/<archivo>` o URL externa      |
| `createdAt`   | Date     | Timestamp de Mongoose                       |
| `updatedAt`   | Date     | Timestamp de Mongoose                       |

---

## `GET /` y `GET /api/health`

`GET /` → 200 `{ "mensaje": "API Mueblería Jota funcionando" }`

`GET /api/health` → 200 `{ "success": true, "data": { "status": "ok", "uptime": 12.34 } }` (compatibilidad)

---

## `GET /api/productos`

Listado completo del catálogo.

**Respuesta 200** — array directo:

```json
[
  {
    "_id": "665f1c2b9a1e4f0012345678",
    "nombre": "Silla Ejecutiva Premium",
    "descripcion": "Silla ergonómica con soporte lumbar ajustable",
    "precio": 25000,
    "stock": 8,
    "imagenUrl": "/images/silla-trabajo-belgrano.png",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

## `GET /api/productos/:id`

**Respuesta 200** — el producto.

**400** — `{ "mensaje": "El id no es válido" }` si el id no es un ObjectId.

**404** — `{ "mensaje": "Producto no encontrado" }`.

---

## `POST /api/productos`

Body JSON con los campos del esquema (nombre y precio obligatorios).

**Respuesta 201** — producto creado.

**400** — `{ "mensaje": "El nombre es obligatorio" }` (primer error de validación de Mongoose).

---

## `PUT /api/productos/:id`

Body JSON parcial. Usa `findByIdAndUpdate` con `runValidators: true`.

**Respuesta 200** — documento actualizado.

**400** id inválido o validación: `{ "mensaje": "..." }`.

**404** — `{ "mensaje": "Producto no encontrado" }`.

---

## `DELETE /api/productos/:id`

**Respuesta 200** — `{ "mensaje": "Producto eliminado" }`.

**400** — id inválido. **404** — no existe.

---

## Rutas inexistentes

**404** — `{ "mensaje": "Ruta no encontrada" }`.

## Errores inesperados

**500** — `{ "mensaje": "Error del servidor" }`.

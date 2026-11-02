# Mueblería Hermanos Jota

Plataforma de e-commerce para muebles artesanales de fabricación argentina, desarrollada durante el Sprint 5-6 del curso de Desarrollo Web Full Stack (ITBA).

En este sprint se implementó **persistencia de datos y CRUD completo**: la API Express se conecta a **MongoDB Atlas** con **Mongoose**, y el frontend React **crea, edita, elimina y lista** productos mediante formularios y React Router.

## Despliegues

- **Frontend (Vercel):** https://muebleria-hermanos-jota-sprint-5-6.vercel.app
- **Backend (Render):** https://muebleria-jota-api-q4ez.onrender.com

El frontend y el endpoint público del catálogo fueron comprobados el **1 de noviembre de 2026**. El servicio gratuito de Render puede tardar en responder después de un período sin actividad.

## Arquitectura

```
┌─────────────────┐      fetch       ┌──────────────────┐     Mongoose      ┌──────────────────┐
│   React (SPA)   │  ──────────────► │   API Express    │ ─────────────────► │  MongoDB Atlas   │
│ client/   :3000 │  ◄────────────── │ backend/   :4000 │ ◄───────────────── │     (cloud)      │
└─────────────────┘      JSON        └──────────────────┘     consultas      └──────────────────┘
```

- El cliente React (`client/`) habla React Router y consume la API con `fetch` a través de `services/api.js`.
- La API Express (`backend/`) expone `/api/productos` y usa Mongoose para persistir.
- MongoDB Atlas guarda la colección `productos`.

## Stack

| Capa     | Tecnologías                                                              |
| -------- | ------------------------------------------------------------------------ |
| Frontend | React (CRA), React Router DOM 6, Tailwind CSS, lucide-react              |
| API      | Node.js 20+, Express 4, CORS, Helmet, dotenv, nodemon (dev)              |
| Datos    | Mongoose 8, MongoDB Atlas                                                |
| Calidad  | ESLint, Prettier, Jest + Supertest (API), React Testing Library (client) |

## Endpoints

Base: `/api/productos` — Cuerpo de respuesta en errores: `{ "mensaje": "..." }`

| Método | Ruta                 | Descripción               | Códigos de respuesta             |
| ------ | -------------------- | ------------------------- | -------------------------------- |
| GET    | `/`                  | Health check de la API    | 200                              |
| GET    | `/api/productos`     | Lista todos los productos | 200, 500                         |
| GET    | `/api/productos/:id` | Detalle de un producto    | 200, 400 (id inválido), 404, 500 |
| POST   | `/api/productos`     | Crea un producto          | 201, 400 (validación), 500       |
| PUT    | `/api/productos/:id` | Actualiza un producto     | 200, 400, 404, 500               |
| DELETE | `/api/productos/:id` | Elimina un producto       | 200, 400, 404, 500               |

Modelo de datos (`Product`): `nombre` (required), `descripcion`, `precio` (required, min 0), `stock` (default 0, min 0), `imagenUrl`, más los `timestamps` de Mongoose (`createdAt` / `updatedAt`).

## Cómo correr en local

Requisitos: Node.js 20+ y npm.

```bash
# Ejecutá los siguientes comandos desde la raíz del repositorio ya clonado.
npm install

# 2. Configurar los servicios
#    backend/.env debe contener un MONGODB_URI válido (puede ser Atlas o local).
#    client/.env define la URL de la API. Los ejemplos están versionados y no
#    contienen credenciales:
cp backend/.env.example backend/.env   # luego editá MONGODB_URI
cp client/.env.example client/.env

# 3. Cargar datos de ejemplo (vacía la colección y carga 8 productos)
#    Atención: seed elimina los productos existentes de esa base antes de cargar.
npm run seed -w hermanos-jota-backend

# 4. Levantar los dos servicios
npm run dev        # API en http://localhost:4000 + SPA en http://localhost:3000

# O por separado:
npm run dev -w hermanos-jota-backend
npm start -w hermanos-jota-client
```

## Variables de entorno

### Backend (`backend/.env`)

| Variable      | Descripción                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MONGODB_URI` | Connection string de MongoDB Atlas (reemplazá `<password>` y el nombre de la base). Ej.: `mongodb+srv://usuario:password@cluster.mongodb.net/muebleria-jota?retryWrites=true&w=majority` |
| `PORT`        | Puerto de la API (4000 por defecto).                                                                                                                                                     |
| `CLIENT_URL`  | Origen del frontend permitido por CORS (en local: `http://localhost:3000`).                                                                                                              |

### Frontend (`client/.env`)

| Variable            | Descripción                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `REACT_APP_API_URL` | URL base de la API (en local: `http://localhost:4000`; en prod: URL de Render). |

> El proyecto usa Create React App, por eso la variable usa el prefijo `REACT_APP_`.

## Deploy paso a paso

### 1) MongoDB Atlas

1. Crear cuenta en [mongodb.com/atlas](https://www.mongodb.com/atlas) y un cluster gratuito (M0).
2. Pestaña **Database Access** → crear un usuario de base de datos (usuario + contraseña).
3. Pestaña **Network Access** → `Add IP Address` → `Allow Access From Anywhere` (0.0.0.0/0), necesario para Render/Vercel.
4. Copiar el **connection string** (Drivers → Connect) y reemplazar `<password>` y el nombre de la base (`muebleria-jota`).

### 2) Render (backend)

1. Crear cuenta en [render.com](https://render.com) → **New → Web Service** → conectar el repo de GitHub.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. En **Environment Variables** cargar `MONGODB_URI` (el string de Atlas) y `CLIENT_URL` = `https://muebleria-hermanos-jota-sprint-5-6.vercel.app`.
6. Desplegar y probar: `https://muebleria-jota-api-q4ez.onrender.com/api/productos`.

### 3) Vercel (frontend)

1. Crear cuenta en [vercel.com](https://vercel.com) → **Add New → Project** → importar el repo.
2. **Root Directory:** `client`
3. En **Environment Variables** cargar `REACT_APP_API_URL` = `https://muebleria-jota-api-q4ez.onrender.com`.
4. Deploy: el `vercel.json` del client ya tiene el rewrite de SPA para React Router.

### 4) Volver a Render

- En el servicio del backend, actualizar `CLIENT_URL` con la URL final del frontend y redeploy (si no, CORS bloquea las peticiones del browser).

> **Nota importante:** el plan gratuito de Render **duerme** el servicio tras inactividad: la primera petición puede tardar ~50 s en responder. Si el catálogo carga vacío o con error al inicio, esperá y reintenta.

## Tests

Los tests del backend corren contra una base de datos en memoria con `mongodb-memory-server`; no necesitan conectarse a MongoDB Atlas. Desde la raíz del monorepo:

```bash
npm test          # Tests de backend y cliente
npm run lint      # ESLint
npm run build     # Build de producción del cliente
```

Para correr una suite por separado:

```bash
npm test -w hermanos-jota-backend
npm test -w hermanos-jota-client
```

El flujo de integración continua ejecuta instalación, lint, tests y build en cada push a `main` y en cada pull request.

## Estructura de carpetas

```
/
├── client/                      SPA React (CRA)
│   ├── src/
│   │   ├── components/            Navbar, Layout, ProductCard, ProductoForm, etc.
│   │   ├── pages/                 Home, Catalog, ProductPage, CrearProducto, EditarProducto, ContactPage, CartPage, NotFound
│   │   ├── services/api.js        Única capa de fetch hacia la API
│   │   └── hooks/                 useProducts, useProduct, useCart
│   ├── .env.example
│   └── vercel.json                rewrite SPA para React Router
├── backend/
│   ├── src/
│   │   ├── config/db.js             conexión Mongoose
│   │   ├── models/Product.js        esquema del producto
│   │   ├── controllers/productController.js  CRUD
│   │   ├── routes/productRoutes.js  rutas /api/productos
│   │   ├── seed.js                  datos de ejemplo
│   │   ├── app.js / server.js       app Express y arranque
│   │   └── middlewares/             logger, notFound, errorHandler
│   ├── public/images/               imágenes servidas por la API
│   ├── tests/api.test.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Equipo

| Integrante         | GitHub                                                   |
| ------------------ | -------------------------------------------------------- |
| Joaquín Just       | [@JoacoJust](https://github.com/JoacoJust)               |
| Ruiz Diaz Agostina | [@ruizdiazagostina](https://github.com/ruizdiazagostina) |
| Marcos Ford        | [@MarcosFord5](https://github.com/MarcosFord5)           |
| Rocio Lazo         | [@Rociolazo](https://github.com/Rociolazo)               |
| Leandro Avalos     | [@Leandro-Gast](https://github.com/Leandro-Gast)         |

## Licencia

MIT — ver [LICENSE](LICENSE).

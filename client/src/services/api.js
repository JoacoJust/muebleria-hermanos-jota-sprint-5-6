const API_BASE = process.env.REACT_APP_API_URL || "";

/**
 * Capa única de acceso a la API: ningún componente hace fetch directo
 * ni construye URLs por su cuenta. Todos los errores se lanzan como
 * Error con el campo "mensaje" que devuelve la API (o uno genérico).
 */
async function manejarRespuesta(response) {
  if (!response.ok) {
    let mensaje = "No pudimos completar la solicitud";
    try {
      const body = await response.json();
      if (body && typeof body.mensaje === "string" && body.mensaje) {
        mensaje = body.mensaje;
      } else if (body && typeof body.message === "string" && body.message) {
        mensaje = body.message;
      }
    } catch {
      // respuesta no JSON (por ejemplo, el servidor dormido)
    }
    const error = new Error(mensaje);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Puente entre lo que devuelve hoy la API (campos de Mongoose: _id,
 * imagenUrl, stock) y lo que ya consume la UI (imagen, cantidad, enStock).
 * Así el carrito, las tarjetas y el detalle siguen funcionando igual.
 */
function normalizarProducto(producto) {
  if (!producto || typeof producto !== "object") {
    return producto;
  }

  const stock = producto.stock ?? producto.cantidad ?? 0;

  return {
    ...producto,
    id: producto.id ?? producto._id,
    imagen: producto.imagenUrl ?? producto.imagen ?? "",
    stock,
    cantidad: stock,
    enStock: stock > 0,
    precioFinal: producto.precioFinal ?? producto.precio,
  };
}

async function pedirRuta(path, opciones = {}) {
  const response = await fetch(`${API_BASE}${path}`, opciones);
  return manejarRespuesta(response);
}

export async function getProductos({ signal } = {}) {
  const productos = await pedirRuta("/api/productos", { signal });
  return Array.isArray(productos) ? productos.map(normalizarProducto) : [];
}

export async function getProductoById(id, { signal } = {}) {
  return normalizarProducto(await pedirRuta(`/api/productos/${id}`, { signal }));
}

export async function crearProducto(producto) {
  return pedirRuta("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

export async function actualizarProducto(id, producto) {
  return pedirRuta(`/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

export async function eliminarProducto(id) {
  return pedirRuta(`/api/productos/${id}`, { method: "DELETE" });
}

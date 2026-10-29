import { useState } from "react";
import { Button } from "../ui/Button";

const CAMPOS_INICIALES = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  imagenUrl: "",
};

const claseInput =
  "rounded-md border border-brand-borde px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-siena";

const claseError = "text-sm text-red-600";

/**
 * Formulario CONTROLADO: cada campo vive en un solo objeto de estado con
 * value + onChange. Se reutiliza para crear y para editar (initial cambia).
 * La validación de cliente exige nombre y precio y evita números negativos;
 * el objeto enviado ya llega con precio y stock como Number.
 */
export function ProductoForm({ onSubmit, label = "Guardar", initial = CAMPOS_INICIALES }) {
  const [form, setForm] = useState(initial);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState(null);

  function manejarCambio(campo) {
    return (event) => {
      setForm((actual) => ({ ...actual, [campo]: event.target.value }));
    };
  }

  function validar() {
    const nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (form.precio === "" || Number.isNaN(Number(form.precio))) {
      nuevosErrores.precio = "El precio es obligatorio y debe ser numérico";
    } else if (Number(form.precio) < 0) {
      nuevosErrores.precio = "El precio no puede ser negativo";
    }

    if (form.stock !== "" && Number(form.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo";
    }

    return nuevosErrores;
  }

  async function manejarEnvio(event) {
    event.preventDefault();

    const nuevosErrores = validar();
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setEnviando(true);
    setErrorServidor(null);

    try {
      await onSubmit({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: form.stock === "" ? 0 : Number(form.stock),
        imagenUrl: form.imagenUrl.trim(),
      });
    } catch (error) {
      setErrorServidor(error.message || "No pudimos guardar el producto");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="grid max-w-xl gap-6" onSubmit={manejarEnvio} noValidate>
      <label className="flex flex-col gap-1 text-sm" htmlFor="producto-nombre">
        Nombre *
        <input
          id="producto-nombre"
          type="text"
          value={form.nombre}
          onChange={manejarCambio("nombre")}
          className={claseInput}
        />
        {errores.nombre ? <span className={claseError}>{errores.nombre}</span> : null}
      </label>

      <label className="flex flex-col gap-1 text-sm" htmlFor="producto-descripcion">
        Descripción
        <textarea
          id="producto-descripcion"
          rows="3"
          value={form.descripcion}
          onChange={manejarCambio("descripcion")}
          className={claseInput}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm" htmlFor="producto-precio">
        Precio *
        <input
          id="producto-precio"
          type="number"
          min="0"
          step="500"
          value={form.precio}
          onChange={manejarCambio("precio")}
          className={claseInput}
        />
        {errores.precio ? <span className={claseError}>{errores.precio}</span> : null}
      </label>

      <label className="flex flex-col gap-1 text-sm" htmlFor="producto-stock">
        Stock
        <input
          id="producto-stock"
          type="number"
          min="0"
          step="1"
          value={form.stock}
          onChange={manejarCambio("stock")}
          className={claseInput}
        />
        {errores.stock ? <span className={claseError}>{errores.stock}</span> : null}
      </label>

      <label className="flex flex-col gap-1 text-sm" htmlFor="producto-imagen">
        URL de imagen
        <input
          id="producto-imagen"
          type="text"
          value={form.imagenUrl}
          onChange={manejarCambio("imagenUrl")}
          placeholder="/images/escritorio-costa.png"
          className={claseInput}
        />
      </label>

      {errorServidor ? (
        <div role="alert" className="rounded-md border border-brand-rosa bg-white p-4 text-red-700">
          {errorServidor}
        </div>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={enviando}>
          {enviando ? "Guardando…" : label}
        </Button>
      </div>
    </form>
  );
}

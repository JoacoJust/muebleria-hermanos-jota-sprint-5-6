import { Link, useNavigate } from "react-router-dom";
import { crearProducto } from "../services/api";
import { ProductoForm } from "../components/product/ProductoForm";

export function CrearProducto() {
  const navigate = useNavigate();

  async function manejarGuardar(datos) {
    await crearProducto(datos);
    navigate("/productos");
  }

  return (
    <section>
      <h1 className="font-display text-4xl uppercase tracking-[0.1em]">Crear producto</h1>
      <p className="mt-2 text-brand-muted">
        Completá el formulario para sumar una pieza nueva al catálogo.
      </p>

      <div className="mt-8">
        <ProductoForm label="Crear producto" onSubmit={manejarGuardar} />
      </div>

      <Link to="/productos" className="mt-6 inline-block text-brand-siena underline">
        Volver al catálogo
      </Link>
    </section>
  );
}

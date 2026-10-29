import { Link, useNavigate, useParams } from "react-router-dom";
import { actualizarProducto } from "../services/api";
import { ProductoForm } from "../components/product/ProductoForm";
import { useProduct } from "../hooks/useProduct";
import { Spinner } from "../components/ui/Spinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";

export function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producto, loading, error, notFound } = useProduct(id);

  async function manejarGuardar(datos) {
    await actualizarProducto(id, datos);
    navigate(`/productos/${id}`);
  }

  if (loading) {
    return <Spinner label="Cargando el producto" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (notFound || !producto) {
    return (
      <section>
        <h1 className="font-display text-3xl uppercase tracking-[0.1em]">Producto no encontrado</h1>
        <Link to="/productos" className="mt-4 inline-block text-brand-siena underline">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="font-display text-4xl uppercase tracking-[0.1em]">Editar producto</h1>
      <p className="mt-2 text-brand-muted">{producto.nombre}</p>

      <div className="mt-8">
        {/* key fuerza un form "fresco" con los datos ya cargados de la API */}
        <ProductoForm
          key={producto.id}
          label="Guardar cambios"
          onSubmit={manejarGuardar}
          initial={{
            nombre: producto.nombre ?? "",
            descripcion: producto.descripcion ?? "",
            precio: producto.precio ?? "",
            stock: producto.stock ?? "",
            imagenUrl: producto.imagenUrl ?? "",
          }}
        />
      </div>

      <Link to={`/productos/${id}`} className="mt-6 inline-block text-brand-siena underline">
        Volver al detalle
      </Link>
    </section>
  );
}

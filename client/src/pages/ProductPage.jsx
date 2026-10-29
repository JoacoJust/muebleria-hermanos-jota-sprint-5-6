import { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ProductDetail } from "../components/product/ProductDetail";
import { useProduct } from "../hooks/useProduct";
import { eliminarProducto } from "../services/api";
import { Button } from "../components/ui/Button";
import { ErrorMessage } from "../components/ui/ErrorMessage";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producto, loading, error, notFound, reintentar } = useProduct(id);
  const { addToCart } = useOutletContext();
  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState(null);

  async function manejarEliminar() {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) {
      return;
    }

    setEliminando(true);
    setErrorEliminar(null);

    try {
      await eliminarProducto(id);
      navigate("/productos");
    } catch (err) {
      setErrorEliminar(err.message || "No pudimos eliminar el producto");
    } finally {
      setEliminando(false);
    }
  }

  // Las acciones de admin solo se muestran cuando hay un producto cargado.
  function acciones() {
    if (!producto) {
      return null;
    }

    return (
      <>
        <Button variant="outline" to={`/productos/${id}/editar`}>
          Editar
        </Button>
        <button
          type="button"
          onClick={manejarEliminar}
          disabled={eliminando}
          className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-sans text-sm font-medium uppercase tracking-[0.08em] text-red-700 transition duration-200 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-siena disabled:cursor-not-allowed disabled:text-brand-muted motion-reduce:transition-none"
        >
          {eliminando ? "Eliminando…" : "Eliminar"}
        </button>
      </>
    );
  }

  return (
    <>
      <ProductDetail
        producto={producto}
        loading={loading}
        error={error}
        notFound={notFound}
        onRetry={reintentar}
        addToCart={addToCart}
        acciones={acciones()}
      />
      {errorEliminar ? <ErrorMessage message={errorEliminar} /> : null}
      {notFound && !loading ? (
        <Link to="/admin/crear-producto" className="mt-4 inline-block text-brand-siena underline">
          Crear un producto
        </Link>
      ) : null}
    </>
  );
}

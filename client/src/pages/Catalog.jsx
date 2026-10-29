import { useOutletContext } from "react-router-dom";
import { ProductList } from "../components/catalog/ProductList";
import { useProducts } from "../hooks/useProducts";

export function Catalog() {
  const { productos, loading, error, reintentar } = useProducts();
  const { addToCart } = useOutletContext();

  return (
    <section>
      <h1 className="mb-8 font-display text-4xl uppercase tracking-[0.1em]">Catálogo</h1>
      <ProductList
        productos={productos}
        loading={loading}
        error={error}
        onRetry={reintentar}
        addToCart={addToCart}
      />
    </section>
  );
}

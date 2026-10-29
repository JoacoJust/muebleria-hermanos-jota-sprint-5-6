import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { EmptyState } from "../ui/EmptyState";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Spinner } from "../ui/Spinner";

export function ProductList({ productos, loading, error, onRetry, showFilters = true, addToCart }) {
  const [query, setQuery] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");

  const filtrados = useMemo(() => {
    return productos.filter((producto) => {
      const matchQuery = producto.nombre.toLowerCase().includes(query.trim().toLowerCase());
      const matchPrice = maxPrecio === "" || producto.precioFinal <= Number(maxPrecio);
      return matchQuery && matchPrice;
    });
  }, [productos, query, maxPrecio]);

  if (loading) {
    return <Spinner label="Cargando el catálogo" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (productos.length === 0) {
    return (
      <EmptyState title="Sin productos">
        Todavía no hay piezas en el catálogo.
        <Link
          to="/admin/crear-producto"
          className="mt-4 block font-medium text-brand-siena underline"
        >
          Crear el primer producto
        </Link>
      </EmptyState>
    );
  }

  return (
    <div>
      {showFilters ? (
        <ProductFilters
          query={query}
          maxPrecio={maxPrecio}
          onQuery={setQuery}
          onMaxPrecio={setMaxPrecio}
        />
      ) : null}
      {filtrados.length === 0 ? (
        <EmptyState title="Sin resultados">Probá con otra búsqueda o categoría.</EmptyState>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((producto) => (
            <li key={producto.id}>
              <ProductCard {...producto} addToCart={addToCart} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

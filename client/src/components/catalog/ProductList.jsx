import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { EmptyState } from "../ui/EmptyState";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Spinner } from "../ui/Spinner";

export function ProductList({ productos, loading, error, onRetry, showFilters = true, addToCart }) {
  const [query, setQuery] = useState("");
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [soloStock, setSoloStock] = useState(false);

  const filtrados = useMemo(() => {
    const resultado = productos.filter((producto) => {
      const precio = producto.precioFinal ?? producto.precio ?? 0;
      const matchQuery =
        query.trim() === "" || producto.nombre.toLowerCase().includes(query.trim().toLowerCase());
      const matchMin = minPrecio === "" || precio >= Number(minPrecio);
      const matchMax = maxPrecio === "" || precio <= Number(maxPrecio);
      const matchStock = !soloStock || producto.enStock;
      return matchQuery && matchMin && matchMax && matchStock;
    });

    const ordenados = [...resultado];
    if (orden === "precio-asc") {
      ordenados.sort((a, b) => (a.precioFinal ?? a.precio ?? 0) - (b.precioFinal ?? b.precio ?? 0));
    } else if (orden === "precio-desc") {
      ordenados.sort((a, b) => (b.precioFinal ?? b.precio ?? 0) - (a.precioFinal ?? a.precio ?? 0));
    } else if (orden === "nombre") {
      ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    }

    return ordenados;
  }, [productos, query, minPrecio, maxPrecio, orden, soloStock]);

  function limpiarFiltros() {
    setQuery("");
    setMinPrecio("");
    setMaxPrecio("");
    setOrden("relevancia");
    setSoloStock(false);
  }

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
          minPrecio={minPrecio}
          maxPrecio={maxPrecio}
          orden={orden}
          soloStock={soloStock}
          onQuery={setQuery}
          onMinPrecio={setMinPrecio}
          onMaxPrecio={setMaxPrecio}
          onOrden={setOrden}
          onSoloStock={setSoloStock}
          onLimpiar={limpiarFiltros}
          resultados={filtrados.length}
          total={productos.length}
          precioMaxGlobal={Math.max(...productos.map((p) => p.precioFinal ?? p.precio ?? 0))}
        />
      ) : null}
      {filtrados.length === 0 ? (
        <EmptyState title="Sin resultados">
          Probá con otra búsqueda o ajustá los filtros.
          {showFilters ? (
            <button
              type="button"
              onClick={limpiarFiltros}
              className="mt-4 font-medium text-brand-siena underline"
            >
              Limpiar filtros
            </button>
          ) : null}
        </EmptyState>
      ) : (
        <>
          {showFilters ? (
            <p className="mb-4 text-sm text-brand-muted">
              {filtrados.length} de {productos.length} piezas
            </p>
          ) : null}
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((producto) => (
              <li key={producto.id}>
                <ProductCard {...producto} addToCart={addToCart} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

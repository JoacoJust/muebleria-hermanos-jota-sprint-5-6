import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency, imageUrl } from "../../utils/format";
import { Button } from "../ui/Button";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Spinner } from "../ui/Spinner";

export function ProductDetail({
  producto,
  loading,
  error,
  notFound,
  onRetry,
  addToCart,
  acciones = null,
}) {
  const [qty, setQty] = useState(1);

  // Renderizado condicional: loading → error → notFound → detalle
  if (loading) {
    return <Spinner label="Cargando el mueble" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (notFound || !producto) {
    return (
      <div>
        <h1 className="font-display text-3xl uppercase tracking-[0.1em]">Este mueble no existe</h1>
        <Link to="/productos" className="mt-4 inline-block text-brand-siena underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const max = producto.cantidad;

  return (
    <article className="grid gap-10 lg:grid-cols-2">
      <img
        src={imageUrl(producto.imagen)}
        alt={producto.nombre}
        width="800"
        height="600"
        className="w-full rounded-lg border border-brand-borde object-cover"
      />
      <div>
        {producto.categoria ? (
          <p className="text-sm uppercase tracking-[0.08em] text-brand-muted">
            {producto.categoria}
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.1em]">{producto.nombre}</h1>
        <p className="mt-4 leading-relaxed">{producto.descripcion}</p>
        <p className="mt-6 text-2xl font-medium">{formatCurrency(producto.precioFinal)}</p>
        {producto.descuento > 0 ? (
          <p className="text-brand-muted line-through">{formatCurrency(producto.precio)}</p>
        ) : null}
        <p className="mt-2">
          {producto.enStock
            ? `Stock disponible: ${producto.stock ?? producto.cantidad}`
            : "Sin stock"}
        </p>

        {acciones ? <div className="mt-6 flex flex-wrap gap-3">{acciones}</div> : null}

        <div className="mt-6 flex items-center gap-3">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            max={max || 1}
            value={qty}
            disabled={!producto.enStock}
            onChange={(event) => setQty(Number(event.target.value))}
            className="w-20 rounded-md border border-brand-borde px-2 py-2"
          />
        </div>
        <Button
          className="mt-4"
          disabled={!producto.enStock}
          onClick={() => addToCart(producto, qty)}
        >
          Agregá al carrito
        </Button>

        {producto.detalles ? (
          <>
            <h2 className="mt-10 font-display text-xl uppercase tracking-[0.1em]">Ficha técnica</h2>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {Object.entries(producto.detalles).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-brand-muted">{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
        <Link to="/productos" className="mt-8 inline-block text-brand-siena underline">
          Volver al catálogo
        </Link>
      </div>
    </article>
  );
}

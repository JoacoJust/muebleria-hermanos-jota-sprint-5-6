import { Link } from "react-router-dom";
import { formatCurrency, imageUrl } from "../../utils/format";
import { Button } from "../ui/Button";

export function ProductCard({
  id,
  nombre,
  descripcion,
  precio,
  descuento,
  precioFinal,
  imagen,
  enStock,
  cantidad,
  addToCart,
}) {
  const producto = {
    id,
    nombre,
    descripcion,
    precio,
    descuento,
    precioFinal,
    imagen,
    enStock,
    cantidad,
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-borde bg-white shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/productos/${id}`} className="block overflow-hidden">
        <img
          src={imageUrl(imagen)}
          alt={nombre}
          width="800"
          height="600"
          loading="lazy"
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2 className="font-display text-xl uppercase tracking-[0.1em] transition-colors duration-200">
          <Link to={`/productos/${id}`} className="hover:text-brand-siena">{nombre}</Link>
        </h2>
        <p className="flex-1 text-sm leading-relaxed text-brand-muted line-clamp-2">{descripcion}</p>
        <div>
          {descuento > 0 ? (
            <p>
              <span className="mr-2 text-brand-muted line-through">{formatCurrency(precio)}</span>
              <span className="font-semibold text-brand-siena">{formatCurrency(precioFinal)}</span>
              <span className="ml-2 rounded-full bg-brand-vara px-2 py-0.5 text-xs font-medium text-brand-texto">
                -{descuento}%
              </span>
            </p>
          ) : (
            <p className="font-semibold text-brand-siena">{formatCurrency(precioFinal)}</p>
          )}
          <p className={`mt-1 text-sm ${enStock ? "text-brand-salvia" : "text-red-600"}`}>
            {enStock ? "✓ En stock" : "✗ Sin stock"}
          </p>
        </div>
        <Button 
          disabled={!enStock} 
          onClick={() => addToCart(producto)}
          className="transition-all duration-200 hover:shadow-md"
        >
          Agregá al carrito
        </Button>
      </div>
    </article>
  );
}

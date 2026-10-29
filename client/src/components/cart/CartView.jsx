import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";

export function CartView({ items, subtotal, shipping, total, onUpdate, onRemove, onClear }) {
  if (items.length === 0) {
    return (
      <EmptyState title="Tu carrito está vacío">
        <p>Cuando encuentres una pieza, agregala y la vas a ver acá.</p>
        <Button className="mt-4" to="/productos">
          Ir al catálogo
        </Button>
      </EmptyState>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-borde text-sm uppercase tracking-[0.08em]">
              <th className="py-3">Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>
                <span className="sr-only">Quitar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem key={item.id} item={item} onUpdate={onUpdate} onRemove={onRemove} />
            ))}
          </tbody>
        </table>
      </div>
      <CartSummary subtotal={subtotal} shipping={shipping} total={total} onClear={onClear} />
    </div>
  );
}

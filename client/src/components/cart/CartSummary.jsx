import { formatCurrency, FREE_SHIPPING_THRESHOLD } from "../../utils/format";
import { Button } from "../ui/Button";

export function CartSummary({ subtotal, shipping, total, onClear }) {
  return (
    <aside className="rounded-lg border border-brand-borde bg-white p-6">
      <h2 className="font-display text-xl uppercase tracking-[0.1em]">Resumen</h2>
      <dl className="mt-4 space-y-2">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Envío</dt>
          <dd>{shipping === 0 ? "Gratis" : formatCurrency(shipping)}</dd>
        </div>
        <div className="flex justify-between font-medium">
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>
      {shipping !== 0 ? (
        <p className="mt-3 text-sm text-brand-muted">
          Envío gratis superando {formatCurrency(FREE_SHIPPING_THRESHOLD)}.
        </p>
      ) : null}
      <Button variant="outline" className="mt-6 w-full" onClick={onClear}>
        Vaciar carrito
      </Button>
    </aside>
  );
}

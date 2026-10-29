import { useOutletContext } from "react-router-dom";
import { CartView } from "../components/cart/CartView";

export function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeFromCart, clearCart } =
    useOutletContext();

  return (
    <section>
      <h1 className="mb-8 font-display text-4xl uppercase tracking-[0.1em]">Carrito</h1>
      <CartView
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onUpdate={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </section>
  );
}

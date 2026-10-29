import { useMemo, useState } from "react";
import { getShipping } from "../utils/format";

export const CART_STORAGE_KEY = "hermanosJotaCart";

function isValidCartItem(item) {
  return (
    item &&
    (typeof item.id === "number" || (typeof item.id === "string" && item.id.length > 0)) &&
    typeof item.nombre === "string" &&
    typeof item.precio === "number" &&
    typeof item.cantidad === "number" &&
    item.cantidad >= 1 &&
    typeof item.stock === "number"
  );
}

function loadCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

function persistCart(items) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage lleno o bloqueado: el carrito sigue en memoria
  }
}

export function useCart() {
  const [items, setItems] = useState(() => loadCart());

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.cantidad, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [items],
  );

  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  function addToCart(producto, quantity = 1) {
    if (!producto || producto.enStock === false || producto.cantidad <= 0) {
      return;
    }

    const requested = Math.max(1, quantity);

    setItems((current) => {
      const existing = current.find((item) => item.id === producto.id);
      const stock = producto.cantidad;
      let next;

      if (existing) {
        const nextQty = Math.min(existing.cantidad + requested, stock);
        next = current.map((item) =>
          item.id === producto.id ? { ...item, cantidad: nextQty, stock } : item,
        );
      } else {
        next = [
          ...current,
          {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precioFinal ?? producto.precio,
            imagen: producto.imagen,
            cantidad: Math.min(requested, stock),
            stock,
          },
        ];
      }

      persistCart(next);
      return next;
    });
  }

  function removeFromCart(id) {
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      persistCart(next);
      return next;
    });
  }

  function updateQuantity(id, cantidad) {
    setItems((current) => {
      const next = current
        .map((item) => {
          if (item.id !== id) {
            return item;
          }
          const safe = Math.min(Math.max(1, cantidad), item.stock);
          return { ...item, cantidad: safe };
        })
        .filter((item) => item.cantidad >= 1);
      persistCart(next);
      return next;
    });
  }

  function clearCart() {
    persistCart([]);
    setItems([]);
  }

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

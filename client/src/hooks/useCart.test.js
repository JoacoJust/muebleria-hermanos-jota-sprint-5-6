import { act, renderHook } from "@testing-library/react";
import { useCart, CART_STORAGE_KEY } from "./useCart";
import { SHIPPING_COST } from "../utils/format";

function producto(overrides = {}) {
  return {
    id: 1,
    nombre: "Silla",
    precio: 25000,
    precioFinal: 25000,
    imagen: "/images/silla.svg",
    enStock: true,
    cantidad: 3,
    ...overrides,
  };
}

describe("useCart", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("agrega y suma cantidad sin superar stock", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(producto(), 1);
    });
    act(() => {
      result.current.addToCart(producto(), 5);
    });
    expect(result.current.items[0].cantidad).toBe(3);
    expect(result.current.itemCount).toBe(3);
  });

  test("quita un ítem", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(producto());
    });
    act(() => {
      result.current.removeFromCart(1);
    });
    expect(result.current.items).toHaveLength(0);
  });

  test("envío de $5000 con subtotal 50000 y gratis con 50001", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart({
        ...producto({ id: 2, precioFinal: 50000, cantidad: 2 }),
      });
    });
    expect(result.current.subtotal).toBe(50000);
    expect(result.current.shipping).toBe(SHIPPING_COST);

    act(() => {
      result.current.addToCart({
        id: 3,
        nombre: "Extra",
        precioFinal: 1,
        precio: 1,
        imagen: "/images/x.svg",
        enStock: true,
        cantidad: 1,
      });
    });
    expect(result.current.subtotal).toBe(50001);
    expect(result.current.shipping).toBe(0);
  });

  test("persiste y recupera; JSON corrupto arranca vacío", () => {
    const { result, unmount } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(producto());
    });
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    expect(JSON.parse(stored)).toHaveLength(1);
    unmount();

    window.localStorage.setItem(CART_STORAGE_KEY, "{no-es-json");
    const corrupted = renderHook(() => useCart());
    expect(corrupted.result.current.items).toEqual([]);
  });

  test("no agrega producto sin stock", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(producto({ enStock: false, cantidad: 0 }));
    });
    expect(result.current.items).toHaveLength(0);
  });
});

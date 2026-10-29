import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ProductList } from "./ProductList";

const silla = {
  id: 1,
  nombre: "Silla Ejecutiva Premium",
  descripcion: "Silla ergonómica",
  categoria: "sillas",
  precio: 25000,
  descuento: 10,
  precioFinal: 22500,
  imagen: "/images/silla-ejecutiva.svg",
  enStock: true,
  cantidad: 8,
};

function renderList(props) {
  const addToCart = jest.fn();
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProductList productos={[]} loading={false} error={null} addToCart={addToCart} {...props} />
    </MemoryRouter>,
  );
}

describe("ProductList", () => {
  test("muestra estado de carga", () => {
    renderList({ loading: true });
    expect(screen.getByRole("status")).toHaveTextContent(/cargando/i);
  });

  test("muestra error y permite reintentar", () => {
    const onRetry = jest.fn();
    renderList({ error: "Falló la red", onRetry });
    expect(screen.getByRole("alert")).toHaveTextContent("Falló la red");
    screen.getByRole("button", { name: /reintentar/i }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("muestra vacío si no hay productos", () => {
    renderList({ productos: [] });
    expect(screen.getByText(/todavía no hay piezas/i)).toBeInTheDocument();
  });

  test("renderiza productos con key estable (id)", () => {
    renderList({ productos: [silla] });
    expect(screen.getByRole("heading", { name: silla.nombre })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: silla.nombre })).toBeInTheDocument();
  });
});

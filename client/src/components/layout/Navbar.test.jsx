import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

function renderNavbar(itemCount = 0) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar itemCount={itemCount} />
    </MemoryRouter>,
  );
}

describe("Navbar", () => {
  test("muestra contador del carrito en 0 al inicio", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /carrito, 0 productos/i })).toBeInTheDocument();
  });

  test("muestra logo", () => {
    renderNavbar();
    expect(screen.getByRole("img", { name: /hermanos jota/i })).toBeInTheDocument();
  });

  test("muestra navegación principal", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /catálogo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contacto/i })).toBeInTheDocument();
  });
});

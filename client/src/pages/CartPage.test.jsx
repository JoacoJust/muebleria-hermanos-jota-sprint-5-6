import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { CartPage } from "./CartPage";
import * as ReactRouterDom from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

describe("CartPage", () => {
  beforeEach(() => {
    ReactRouterDom.useOutletContext.mockReturnValue({
      items: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      addToCart: jest.fn(),
      itemCount: 0,
    });
  });

  test("muestra carrito vacío", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CartPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

  test("muestra título de carrito", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CartPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1, name: /carrito/i })).toBeInTheDocument();
  });
});

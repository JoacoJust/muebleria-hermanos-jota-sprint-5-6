import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ProductDetail } from "./ProductDetail";

const producto = {
  id: 1,
  nombre: "Silla Ejecutiva Premium",
  descripcion: "Silla ergonómica con soporte lumbar ajustable",
  categoria: "sillas",
  precio: 25000,
  descuento: 10,
  precioFinal: 22500,
  imagen: "/images/silla-ejecutiva.svg",
  enStock: true,
  cantidad: 8,
  detalles: {
    material: "Cuero vacuno y malla transpirable",
    alto: "110 cm",
    ancho: "65 cm",
    profundidad: "60 cm",
    peso: "15 kg",
    fabricacion: "Hecha en Buenos Aires",
  },
};

function renderDetail(props) {
  const addToCart = jest.fn();
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProductDetail
        producto={null}
        loading={false}
        error={null}
        notFound={false}
        addToCart={addToCart}
        {...props}
      />
    </MemoryRouter>,
  );
}

describe("ProductDetail", () => {
  test("muestra estado de carga", () => {
    renderDetail({ loading: true });
    expect(screen.getByRole("status")).toHaveTextContent(/cargando/i);
  });

  test("muestra error y permite reintentar", () => {
    const onRetry = jest.fn();
    renderDetail({ error: "Falló la red", onRetry });
    expect(screen.getByRole("alert")).toHaveTextContent("Falló la red");
    screen.getByRole("button", { name: /reintentar/i }).click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("muestra 404 cuando producto no existe", () => {
    renderDetail({ notFound: true });
    expect(screen.getByText(/este mueble no existe/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /volver al catálogo/i })).toBeInTheDocument();
  });

  test("renderiza detalle del producto", () => {
    renderDetail({ producto });
    expect(screen.getByRole("heading", { name: producto.nombre })).toBeInTheDocument();
    expect(screen.getByText(producto.descripcion)).toBeInTheDocument();
    expect(screen.getByText(producto.categoria)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: producto.nombre })).toBeInTheDocument();
  });

  test("muestra precio con descuento", () => {
    renderDetail({ producto });
    expect(screen.getByText(/22\.500/)).toBeInTheDocument();
    expect(screen.getByText(/25\.000/)).toBeInTheDocument();
  });

  test("muestra ficha técnica", () => {
    renderDetail({ producto });
    expect(screen.getByText(/ficha técnica/i)).toBeInTheDocument();
    expect(screen.getByText(/material/i)).toBeInTheDocument();
    expect(screen.getByText(/cuero vacuno/i)).toBeInTheDocument();
  });
});

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import { CrearProducto } from "./pages/CrearProducto";
import { EditarProducto } from "./pages/EditarProducto";
import { NotFound } from "./pages/NotFound";

function AppContent() {
  const cart = useCart();

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout cart={cart} />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalog />} />
          <Route path="/productos/:id" element={<ProductPage />} />
          <Route path="/productos/:id/editar" element={<EditarProducto />} />
          <Route path="/admin/crear-producto" element={<CrearProducto />} />
          {/* Compatibilidad con enlaces viejos /producto/:id */}
          <Route path="/producto/:id" element={<Navigate to="/productos" replace />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppContent />;
}

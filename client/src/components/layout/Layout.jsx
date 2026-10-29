import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout({ cart }) {
  return (
    <div className="min-h-screen bg-brand-alabastro text-brand-texto">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <Navbar itemCount={cart.itemCount} />
      <main id="contenido" className="mx-auto max-w-7xl px-4 py-10">
        <Outlet context={cart} />
      </main>
      <Footer />
    </div>
  );
}

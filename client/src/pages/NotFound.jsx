import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section>
      <h1 className="font-display text-4xl uppercase tracking-[0.1em]">Página no encontrada</h1>
      <p className="mt-4">Esa ruta no existe en la tienda.</p>
      <Link to="/" className="mt-6 inline-block text-brand-siena underline">
        Volver al inicio
      </Link>
    </section>
  );
}

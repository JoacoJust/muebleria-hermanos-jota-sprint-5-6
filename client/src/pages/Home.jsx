import { Leaf, Recycle, Trees } from "lucide-react";
import { ProductList } from "../components/catalog/ProductList";
import { Button } from "../components/ui/Button";
import { useProducts } from "../hooks/useProducts";
import { useOutletContext } from "react-router-dom";

export function Home() {
  const { productos, loading, error, reintentar } = useProducts();
  const { addToCart } = useOutletContext();
  // El modelo de MongoDB ya no trae descuentos: tomamos las 3 piezas más recientes.
  const destacados = productos.slice(0, 3);

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-siena to-[#8a4526] px-6 py-20 shadow-soft-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-brand-vara/20 blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <p className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-brand-alabastro/90">
            Muebles artesanales
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.1em] text-brand-alabastro md:text-5xl lg:text-6xl">
            Cada pieza cuenta la historia de manos expertas y materiales nobles
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-alabastro/90">
            Diseñamos y fabricamos en Buenos Aires piezas pensadas para durar, con maderas nativas y
            acabados naturales.
          </p>
          <Button
            className="mt-8 bg-brand-alabastro text-brand-siena hover:bg-white hover:shadow-lg"
            to="/productos"
          >
            Ver catálogo
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl uppercase tracking-[0.1em]">Productos destacados</h2>
        <div className="mt-6">
          <ProductList
            productos={destacados}
            loading={loading}
            error={error}
            onRetry={reintentar}
            showFilters={false}
            addToCart={addToCart}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-lg border border-brand-borde bg-white p-6">
          <h2 className="font-display text-xl uppercase tracking-[0.1em]">Maderas seleccionadas</h2>
          <p className="mt-3 leading-relaxed">Elegimos materiales de calidad para cada pieza.</p>
        </article>
        <article className="rounded-lg border border-brand-borde bg-white p-6">
          <h2 className="font-display text-xl uppercase tracking-[0.1em]">Hecho artesanalmente</h2>
          <p className="mt-3 leading-relaxed">Cada mueble recibe atención en cada detalle.</p>
        </article>
        <article className="rounded-lg border border-brand-borde bg-white p-6">
          <h2 className="font-display text-xl uppercase tracking-[0.1em]">Diseño para durar</h2>
          <p className="mt-3 leading-relaxed">Creaciones pensadas para acompañarte durante años.</p>
        </article>
      </section>

      <section className="rounded-lg border border-brand-salvia bg-white p-8">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-muted">
          Compromiso ambiental
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.1em]">Sustentabilidad</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article>
            <Trees className="text-brand-salvia" aria-hidden="true" />
            <h3 className="mt-2 font-medium">Maderas nativas certificadas FSC</h3>
            <p className="mt-2 text-brand-muted">
              Trabajamos con proveedores locales y fuentes responsables.
            </p>
          </article>
          <article>
            <Leaf className="text-brand-salvia" aria-hidden="true" />
            <h3 className="mt-2 font-medium">Acabados naturales</h3>
            <p className="mt-2 text-brand-muted">
              Priorizamos aceites y terminaciones de bajo impacto.
            </p>
          </article>
          <article>
            <Recycle className="text-brand-salvia" aria-hidden="true" />
            <h3 className="mt-2 font-medium">Aprovechamiento de material</h3>
            <p className="mt-2 text-brand-muted">
              Reducimos residuos reutilizando recortes en el taller.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

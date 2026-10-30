import { Search, SlidersHorizontal, X } from "lucide-react";

const claseInput =
  "w-full rounded-md border border-brand-borde bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-siena";

export function ProductFilters({
  query,
  minPrecio,
  maxPrecio,
  orden,
  soloStock,
  onQuery,
  onMinPrecio,
  onMaxPrecio,
  onOrden,
  onSoloStock,
  onLimpiar,
  resultados,
  total,
  precioMaxGlobal,
}) {
  const maxGlobal = Number.isFinite(precioMaxGlobal) ? precioMaxGlobal : 0;
  const maxVal = maxPrecio === "" ? maxGlobal : Number(maxPrecio);

  return (
    <section className="mb-8 overflow-hidden rounded-xl border border-brand-borde bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-borde bg-brand-alabastro/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-brand-siena" aria-hidden="true" />
          <h2 className="font-display text-sm uppercase tracking-[0.1em] text-brand-texto">
            Filtrar catálogo
          </h2>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-brand-muted">
          {resultados} de {total} piezas
        </p>
      </div>

      <form
        className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <label
          className="flex flex-col gap-1 text-sm sm:col-span-2 lg:col-span-2"
          htmlFor="filtro-buscar"
        >
          <span className="font-medium text-brand-texto">Buscar</span>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
              aria-hidden="true"
            />
            <input
              id="filtro-buscar"
              type="search"
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              className={`${claseInput} pl-9`}
              placeholder="Nombre del mueble"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1 text-sm" htmlFor="filtro-min">
          <span className="font-medium text-brand-texto">Precio mínimo</span>
          <input
            id="filtro-min"
            type="number"
            min="0"
            value={minPrecio}
            onChange={(event) => onMinPrecio(event.target.value)}
            className={claseInput}
            placeholder="Sin mínimo"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm" htmlFor="filtro-orden">
          <span className="font-medium text-brand-texto">Ordenar por</span>
          <select
            id="filtro-orden"
            value={orden}
            onChange={(event) => onOrden(event.target.value)}
            className={claseInput}
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
        </label>

        <div className="flex items-center justify-between gap-3 sm:col-span-2 lg:col-span-4">
          <label className="flex items-center gap-2 text-sm text-brand-texto">
            <input
              type="checkbox"
              checked={soloStock}
              onChange={(event) => onSoloStock(event.target.checked)}
              className="h-4 w-4 rounded border-brand-borde text-brand-siena focus:ring-brand-siena"
            />
            Solo en stock
          </label>

          <button
            type="button"
            onClick={onLimpiar}
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-muted transition hover:text-brand-siena focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-siena"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Limpiar filtros
          </button>
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-brand-texto">Precio máximo</span>
            <span className="text-brand-muted">
              {maxVal > 0 ? `$${maxVal.toLocaleString("es-AR")}` : "Sin tope"}
            </span>
          </div>
          {maxGlobal > 0 ? (
            <input
              type="range"
              min={0}
              max={maxGlobal}
              value={maxVal || maxGlobal}
              onChange={(event) => onMaxPrecio(event.target.value)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-borde accent-brand-siena"
              aria-label="Precio máximo"
            />
          ) : null}
        </div>
      </form>
    </section>
  );
}

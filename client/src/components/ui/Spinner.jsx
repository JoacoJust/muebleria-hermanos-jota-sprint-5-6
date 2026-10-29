export function Spinner({ label = "Cargando" }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 py-10">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-borde border-t-brand-siena motion-reduce:animate-none" />
      <span className="text-brand-muted">{label}…</span>
    </div>
  );
}

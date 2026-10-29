export function EmptyState({ title, children }) {
  return (
    <div className="rounded-md border border-brand-borde bg-white p-8 text-center">
      <h2 className="font-display text-2xl uppercase tracking-[0.1em] text-brand-texto">{title}</h2>
      <div className="mt-3 text-brand-muted">{children}</div>
    </div>
  );
}

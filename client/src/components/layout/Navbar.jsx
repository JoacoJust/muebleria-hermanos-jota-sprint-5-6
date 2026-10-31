import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Catálogo" },
  { to: "/contacto", label: "Contacto" },
  { to: "/admin/crear-producto", label: "Crear producto" },
];

export function Navbar({ itemCount }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-borde bg-brand-alabastro/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-200 hover:scale-105"
        >
          <img
            src="/logo.svg"
            alt="Hermanos Jota"
            width="140"
            height="140"
            className="h-auto w-[140px] min-w-[120px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive
                    ? "text-brand-siena border-b-2 border-brand-siena pb-1"
                    : "text-brand-texto hover:text-brand-siena hover:border-b-2 hover:border-brand-salvia pb-1"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/carrito"
            className="relative rounded-full p-2 text-brand-texto transition-all duration-200 hover:bg-brand-salvia/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-siena"
            aria-label={`Carrito, ${itemCount} productos`}
          >
            <ShoppingBag
              aria-hidden="true"
              className="transition-transform duration-200 hover:scale-110"
            />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-siena text-xs font-semibold text-brand-alabastro transition-transform duration-200 hover:scale-110">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-full p-2 transition-all duration-200 hover:bg-brand-salvia/20 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-movil"
          className="flex flex-col gap-3 border-t border-brand-borde bg-brand-alabastro px-4 py-4 md:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-medium uppercase tracking-[0.08em] text-brand-texto transition-colors duration-200 hover:text-brand-siena"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

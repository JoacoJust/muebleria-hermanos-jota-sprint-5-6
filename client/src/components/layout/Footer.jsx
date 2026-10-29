import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-brand-borde bg-[#33251F] text-brand-alabastro">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <section>
          <h2 className="font-display text-lg uppercase tracking-[0.1em]">Hermanos Jota</h2>
          <p className="mt-3 leading-relaxed text-[#F5E6D3]/80">
            Cada pieza cuenta la historia de manos expertas y materiales nobles.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg uppercase tracking-[0.1em]">Enlaces</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="transition-colors duration-200 hover:text-brand-salvia">Inicio</Link>
            </li>
            <li>
              <Link to="/productos" className="transition-colors duration-200 hover:text-brand-salvia">Catálogo</Link>
            </li>
            <li>
              <Link to="/contacto" className="transition-colors duration-200 hover:text-brand-salvia">Contacto</Link>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg uppercase tracking-[0.1em]">Contacto</h2>
          <ul className="mt-3 space-y-2 text-[#F5E6D3]/90">
            <li className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" />
              <a href="tel:+541145678900">+54 11 4567-8900</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1" aria-hidden="true" />
              <span>Av. San Juan 2847, San Cristóbal, CABA</span>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} aria-hidden="true" />
              <a href="https://instagram.com/hermanosjota_ba" rel="noreferrer" target="_blank">
                @hermanosjota_ba
              </a>
            </li>
          </ul>
        </section>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-sm text-[#F5E6D3]/70">
        © {year} Mueblería Hermanos Jota. Todos los derechos reservados.
      </p>
    </footer>
  );
}

import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";

export function ContactPage() {
  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-[0.1em]">Contacto</h1>
        <p className="mt-4 leading-relaxed">¿Tenés una consulta? Escribinos y te respondemos.</p>
        <ul className="mt-8 space-y-4">
          <li className="flex gap-3">
            <Phone aria-hidden="true" />
            <a href="tel:+541145678900">+54 11 4567-8900</a>
          </li>
          <li className="flex gap-3">
            <Mail aria-hidden="true" />
            <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
          </li>
          <li className="flex gap-3">
            <MapPin aria-hidden="true" />
            <span>Av. San Juan 2847, San Cristóbal, CABA</span>
          </li>
        </ul>
        <p className="mt-6 text-brand-muted">
          Lunes a viernes 10:00–19:00
          <br />
          Sábados 10:00–14:00
          <br />
          Domingos cerrado
        </p>
      </div>
      <ContactForm />
    </section>
  );
}

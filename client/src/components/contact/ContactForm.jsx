import { useState } from "react";
import { validateContact } from "../../utils/validateContact";
import { Button } from "../ui/Button";

export function ContactForm() {
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateContact(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO(equipo): integrar POST /api/contacto cuando el contrato se implemente.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      setSent(true);
      setValues({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-brand-salvia bg-white p-6" role="status">
        <p>Recibimos tu mensaje. Te vamos a responder a la brevedad.</p>
        <Button className="mt-4" onClick={() => setSent(false)}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-brand-borde bg-white p-6"
    >
      <div>
        <label htmlFor="nombre" className="block text-sm">
          Nombre *
        </label>
        <input
          id="nombre"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
        />
        {errors.nombre ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.nombre}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
        />
        {errors.email ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          value={values.telefono}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
        />
        {errors.telefono ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.telefono}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="asunto" className="block text-sm">
          Asunto *
        </label>
        <input
          id="asunto"
          name="asunto"
          value={values.asunto}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
        />
        {errors.asunto ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.asunto}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-sm">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={values.mensaje}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
        />
        {errors.mensaje ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.mensaje}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}

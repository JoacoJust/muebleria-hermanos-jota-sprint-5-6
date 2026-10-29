export function validateContact(values) {
  const errors = {};

  if (!values.nombre || values.nombre.trim().length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres";
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Ingresá un email válido";
  }

  if (values.telefono && values.telefono.trim()) {
    const digits = values.telefono.replace(/\D/g, "");
    if (digits.length < 10) {
      errors.telefono = "El teléfono debe tener al menos 10 dígitos";
    }
  }

  if (!values.asunto || values.asunto.trim().length < 5) {
    errors.asunto = "El asunto debe tener al menos 5 caracteres";
  }

  if (!values.mensaje || values.mensaje.trim().length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres";
  }

  return errors;
}

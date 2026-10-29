import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

function fillBase(user) {
  return {
    nombre: () => user.type(screen.getByLabelText(/nombre/i), "Ana"),
    email: () => user.type(screen.getByLabelText(/email/i), "ana@correo.com"),
    asunto: () => user.type(screen.getByLabelText(/asunto/i), "Consulta"),
    mensaje: () => user.type(screen.getByLabelText(/mensaje/i), "Quiero un presupuesto"),
  };
}

describe("ContactForm", () => {
  test("nombre de 2 caracteres es inválido y 3 es válido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/nombre/i), "Al");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(await screen.findByText(/al menos 3/)).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/nombre/i));
    await user.type(screen.getByLabelText(/nombre/i), "Ana");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(screen.queryByText(/al menos 3/)).not.toBeInTheDocument();
  });

  test("email sin dominio es inválido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/email/i), "ana@");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(await screen.findByText(/email válido/i)).toBeInTheDocument();
  });

  test("teléfono con letras no suma 10 dígitos", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const fields = fillBase(user);
    await fields.nombre();
    await fields.email();
    await user.type(screen.getByLabelText(/teléfono/i), "abcdefghij");
    await fields.asunto();
    await fields.mensaje();
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(await screen.findByText(/10 dígitos/i)).toBeInTheDocument();
  });

  test("asunto corto y mensaje corto fallan", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/nombre/i), "Ana");
    await user.type(screen.getByLabelText(/email/i), "ana@correo.com");
    await user.type(screen.getByLabelText(/asunto/i), "Hola");
    await user.type(screen.getByLabelText(/mensaje/i), "Corto");
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(await screen.findByText(/asunto debe tener al menos 5/i)).toBeInTheDocument();
    expect(screen.getByText(/mensaje debe tener al menos 10/i)).toBeInTheDocument();
  });

  test("envío válido muestra confirmación", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const fields = fillBase(user);
    await fields.nombre();
    await fields.email();
    await fields.asunto();
    await fields.mensaje();
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/recibimos tu mensaje/i);
    });
  });
});

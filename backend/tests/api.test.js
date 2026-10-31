const request = require("supertest");
const errorHandler = require("../src/middlewares/errorHandler");

process.env.NODE_ENV = "test";
process.env.CLIENT_URL = "http://localhost:3000";

const app = require("../src/app");

describe("API Mueblería Jota", () => {
  test("GET / responde { mensaje: 'API Mueblería Jota funcionando' }", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ mensaje: "API Mueblería Jota funcionando" });
  });

  test("GET /api/health responde ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
    expect(typeof res.body.data.uptime).toBe("number");
  });

  test("ruta desconocida responde 404 con { mensaje: 'Ruta no encontrada' }", async () => {
    const res = await request(app).get("/ruta-inexistente");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ mensaje: "Ruta no encontrada" });
  });

  test("JSON malformado responde 400", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Content-Type", "application/json")
      .send('{"roto":');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ mensaje: "JSON malformado" });
  });

  test("errorHandler responde 500 sin exponer detalles del error", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    errorHandler(new Error("secreto"), {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensaje: "Error del servidor" });
  });

  test("GET /images/silla-trabajo-belgrano.png sirve imagen", async () => {
    const res = await request(app).get("/images/silla-trabajo-belgrano.png");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/^image\//);
  });

  test("helmet agrega cabeceras de seguridad", async () => {
    const res = await request(app).get("/api/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-dns-prefetch-control"]).toBeDefined();
  });

  test("CORS acepta el origen configurado", async () => {
    const res = await request(app).get("/api/health").set("Origin", "http://localhost:3000");
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
  });

  test("CORS rechaza orígenes ajenos", async () => {
    const res = await request(app).get("/api/health").set("Origin", "http://sitio-malicioso.com");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  test("GET /api/productos/:id con id inválido responde 400", async () => {
    const res = await request(app).get("/api/productos/abc");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ mensaje: "El id no es válido" });
  });

  test("POST /api/productos con validación inválida responde 400 con mensaje de Mongoose", async () => {
    const Product = require("../src/models/Product");
    jest.spyOn(Product, "create").mockRejectedValueOnce({
      name: "ValidationError",
      errors: { nombre: { message: "El nombre es obligatorio" } },
    });

    const res = await request(app).post("/api/productos").send({ precio: 100 });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ mensaje: "El nombre es obligatorio" });

    jest.restoreAllMocks();
  });
});

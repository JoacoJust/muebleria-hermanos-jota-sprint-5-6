const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../src/app");
const Product = require("../src/models/Product");

const productoValido = {
  nombre: "Mesa de prueba",
  descripcion: "Producto para tests CRUD",
  precio: 12000,
  stock: 4,
  imagenUrl: "/images/mesa-prueba.png",
};

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  await Product.deleteMany({});
});

describe("CRUD de productos con MongoDB en memoria", () => {
  test("POST válido devuelve 201, _id y no persiste campos extra", async () => {
    const res = await request(app)
      .post("/api/productos")
      .send({ ...productoValido, admin: true });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.nombre).toBe(productoValido.nombre);
    expect(res.body.admin).toBeUndefined();

    const guardado = await Product.findById(res.body._id).lean();
    expect(guardado.admin).toBeUndefined();
  });

  test.each([[{ descripcion: "sin nombre" }], [{ nombre: "Sin precio" }]])(
    "POST sin un campo obligatorio devuelve 400",
    async (body) => {
      const res = await request(app).post("/api/productos").send(body);

      expect(res.status).toBe(400);
    },
  );

  test("GET lista, detalle, PUT y DELETE completan el CRUD", async () => {
    const creado = await request(app).post("/api/productos").send(productoValido);
    const id = creado.body._id;

    expect(creado.status).toBe(201);

    const lista = await request(app).get("/api/productos");
    expect(lista.status).toBe(200);
    expect(lista.body).toHaveLength(1);
    expect(lista.body[0]._id).toBe(id);

    const detalle = await request(app).get(`/api/productos/${id}`);
    expect(detalle.status).toBe(200);
    expect(detalle.body.nombre).toBe(productoValido.nombre);

    const inexistente = await request(app).get("/api/productos/000000000000000000000000");
    expect(inexistente.status).toBe(404);

    const invalido = await request(app).get("/api/productos/abc");
    expect(invalido.status).toBe(400);

    const actualizado = await request(app)
      .put(`/api/productos/${id}`)
      .send({ precio: 18000, admin: true });
    expect(actualizado.status).toBe(200);
    expect(actualizado.body.precio).toBe(18000);
    expect(actualizado.body.admin).toBeUndefined();

    const guardado = await Product.findById(id).lean();
    expect(guardado.precio).toBe(18000);
    expect(guardado.admin).toBeUndefined();

    const eliminado = await request(app).delete(`/api/productos/${id}`);
    expect(eliminado.status).toBe(200);

    const detalleEliminado = await request(app).get(`/api/productos/${id}`);
    expect(detalleEliminado.status).toBe(404);
  });
});

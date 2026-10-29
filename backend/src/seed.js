const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const Product = require("./models/Product");

/**
 * Datos iniciales tomados del catálogo real del proyecto
 * (backend/data/productos.js del Sprint 3-4). Sin datos inventados.
 */
const productosIniciales = [
  {
    nombre: "Silla Ejecutiva Premium",
    descripcion: "Silla ergonómica con soporte lumbar ajustable",
    precio: 25000,
    stock: 8,
    imagenUrl: "/images/silla-trabajo-belgrano.png",
  },
  {
    nombre: "Silla Eames Clásica",
    descripcion: "Silla de diseño icónico con asiento ergonómico y patas de madera",
    precio: 18000,
    stock: 15,
    imagenUrl: "/images/sillas-cordoba.png",
  },
  {
    nombre: "Mesa de Comedor Roble",
    descripcion: "Mesa extensible de madera maciza ideal para reuniones familiares",
    precio: 85000,
    stock: 3,
    imagenUrl: "/images/mesa-comedor-pampa.png",
  },
  {
    nombre: "Sillón Chesterfield",
    descripcion: "Sillón de tres cuerpos con capitoné clásico y estructura reforzada",
    precio: 120000,
    stock: 2,
    imagenUrl: "/images/sillon-copacabana.png",
  },
  {
    nombre: "Sofá Modular 3 Cuerpos",
    descripcion: "Sofá modular contemporáneo con tapizado antimanchas",
    precio: 95000,
    stock: 4,
    imagenUrl: "/images/sofa-patagonia.png",
  },
  {
    nombre: "Escritorio Nórdico",
    descripcion: "Escritorio minimalista con cajones integrados para home office",
    precio: 45000,
    stock: 6,
    imagenUrl: "/images/escritorio-costa.png",
  },
  {
    nombre: "Estantería Industrial",
    descripcion: "Estantería de cinco niveles con estilo industrial y gran capacidad",
    precio: 38000,
    stock: 10,
    imagenUrl: "/images/biblioteca-recoleta.png",
  },
  {
    nombre: "Biblioteca Clásica",
    descripcion: "Biblioteca de pared con estantes ajustables y diseño clásico",
    precio: 55000,
    stock: 5,
    imagenUrl: "/images/biblioteca-recoleta.png",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB para el seed");

    await Product.deleteMany({});
    console.log("Colección 'productos' vaciada");

    const documentos = await Product.insertMany(productosIniciales);
    console.log(`Seed completo: ${documentos.length} productos cargados`);
  } catch (error) {
    console.error("Error en el seed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

seed();

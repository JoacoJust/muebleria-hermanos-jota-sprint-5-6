const express = require("express");
const {
  getProductos,
  getProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productController");

const productRoutes = express.Router();

productRoutes.get("/", getProductos);
productRoutes.post("/", crearProducto);

productRoutes.get("/:id", getProductoById);
productRoutes.put("/:id", actualizarProducto);
productRoutes.delete("/:id", eliminarProducto);

module.exports = productRoutes;

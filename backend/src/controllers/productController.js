const mongoose = require("mongoose");
const Product = require("../models/Product");

/** Extrae el primer mensaje de validación de un ValidationError de Mongoose. */
function mensajeDeValidacion(error) {
  if (error && error.name === "ValidationError" && error.errors) {
    const primerCampo = Object.keys(error.errors)[0];
    return error.errors[primerCampo].message;
  }
  return "Datos del producto inválidos";
}

async function getProductos(req, res) {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(productos);
  } catch {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
}

async function getProductoById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ mensaje: "El id no es válido" });
      return;
    }

    const producto = await Product.findById(id);
    if (!producto) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }

    res.status(200).json(producto);
  } catch {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
}

async function crearProducto(req, res) {
  try {
    const producto = await Product.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ mensaje: mensajeDeValidacion(error) });
      return;
    }
    res.status(500).json({ mensaje: "Error del servidor" });
  }
}

async function actualizarProducto(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ mensaje: "El id no es válido" });
      return;
    }

    const producto = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!producto) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }

    res.status(200).json(producto);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ mensaje: mensajeDeValidacion(error) });
      return;
    }
    res.status(500).json({ mensaje: "Error del servidor" });
  }
}

async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ mensaje: "El id no es válido" });
      return;
    }

    const producto = await Product.findByIdAndDelete(id);
    if (!producto) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }

    res.status(200).json({ mensaje: "Producto eliminado" });
  } catch {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
}

module.exports = {
  getProductos,
  getProductoById,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};

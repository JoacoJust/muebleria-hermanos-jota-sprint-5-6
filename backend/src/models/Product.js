const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    imagenUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema, "productos");

module.exports = Product;

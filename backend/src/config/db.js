const mongoose = require("mongoose");

/**
 * Conexión única a MongoDB Atlas.
 * Falla rápido (process.exit(1)) si la URI no es válida o el cluster no responde:
 * para la API es preferible morir en el arranque que quedar corriendo sin base de datos.
 */
async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = conectarDB;

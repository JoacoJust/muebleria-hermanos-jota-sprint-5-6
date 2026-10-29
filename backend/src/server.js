require("./config/env"); // carga la config del .env antes que nada
const conectarDB = require("./config/db");
const app = require("./app");
const env = require("./config/env");

async function iniciarServidor() {
  // Primero la base de datos, después el puerto:
  // así la API nunca arranca si no puede alcanzar a MongoDB.
  await conectarDB();

  app.listen(env.port, () => {
    console.log(`API Mueblería Jota en http://localhost:${env.port}`);
  });
}

iniciarServidor();

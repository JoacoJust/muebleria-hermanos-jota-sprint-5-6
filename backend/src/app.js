const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(
  helmet({
    // Las imágenes se piden desde el SPA en otro origen (puerto 3000).
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

const allowedOrigins =
  env.nodeEnv === "production"
    ? [env.clientUrl]
    : [env.clientUrl, "http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(logger);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Health check raíz.
app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "API Mueblería Jota funcionando" });
});

// Health check detallado (lo consumen los tests y monitoreos).
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
    },
  });
});

app.use("/api/productos", productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

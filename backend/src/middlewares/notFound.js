function notFound(req, res) {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
}

module.exports = notFound;

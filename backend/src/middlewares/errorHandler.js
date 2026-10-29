/**
 * Último middleware: captura errores que las rutas no atendieron.
 * - JSON malformado en el body → 400.
 * - Cualquier otro error no esperado → 500 con mensaje genérico (sin leaks).
 */
function errorHandler(err, req, res, next) {
  void next;

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ mensaje: "JSON malformado" });
    return;
  }

  res.status(500).json({ mensaje: "Error del servidor" });
}

module.exports = errorHandler;

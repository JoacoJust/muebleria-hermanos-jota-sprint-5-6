function logger(req, res, next) {
  if (process.env.NODE_ENV === "test") {
    next();
    return;
  }

  const start = Date.now();
  console.log(`${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);
  });

  next();
}

module.exports = logger;

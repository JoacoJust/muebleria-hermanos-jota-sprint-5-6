import { useEffect, useState } from "react";
import { getProductoById } from "../services/api";

export function useProduct(id) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setProducto(null);

      try {
        const payload = await getProductoById(id, { signal: controller.signal });
        if (!cancelled) {
          setProducto(payload);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        if (!cancelled) {
          if (err.status === 404) {
            setNotFound(true);
          } else {
            setError(err.message || "No pudimos cargar este mueble");
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      load();
    } else {
      setLoading(false);
      setNotFound(true);
    }

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id, reloadKey]);

  function reintentar() {
    setReloadKey((value) => value + 1);
  }

  return { producto, loading, error, notFound, reintentar };
}

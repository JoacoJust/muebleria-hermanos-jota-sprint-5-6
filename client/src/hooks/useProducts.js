import { useEffect, useState } from "react";
import { getProductos } from "../services/api";

export function useProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const payload = await getProductos({ signal: controller.signal });
        if (!cancelled) {
          setProductos(payload);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        if (!cancelled) {
          setError(err.message || "No pudimos cargar el catálogo");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [reloadKey]);

  function reintentar() {
    setReloadKey((value) => value + 1);
  }

  return { productos, loading, error, reintentar };
}

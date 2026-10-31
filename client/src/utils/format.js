export const FREE_SHIPPING_THRESHOLD = 50000;
export const SHIPPING_COST = 5000;

export function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}

export function getShipping(subtotal) {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function imageUrl(path) {
  if (!path) {
    return "/logo.svg";
  }

  if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(path)) {
    return path;
  }

  const base = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
  const relativePath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${relativePath}`;
}

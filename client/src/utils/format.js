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
  const base = process.env.REACT_APP_API_URL || "";
  return `${base}${path}`;
}

import { getShipping, SHIPPING_COST } from "./format";

test("envío se cobra en el umbral exacto y se libera un peso después", () => {
  expect(getShipping(50000)).toBe(SHIPPING_COST);
  expect(getShipping(50001)).toBe(0);
});

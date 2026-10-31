import { getShipping, imageUrl, SHIPPING_COST } from "./format";

test("envío se cobra en el umbral exacto y se libera un peso después", () => {
  expect(getShipping(50000)).toBe(SHIPPING_COST);
  expect(getShipping(50001)).toBe(0);
});

test.each([undefined, ""])("usa el logo cuando la imagen está vacía (%s)", (path) => {
  expect(imageUrl(path)).toBe("/logo.svg");
});

test.each([
  "http://example.com/image.png",
  "https://example.com/image.png",
  "//example.com/image.png",
  "data:image/png;base64,abc",
  "blob:https://example.com/image-id",
])("conserva la URL externa %s", (path) => {
  expect(imageUrl(path)).toBe(path);
});

test.each(["images/producto.png", "/images/producto.png"])(
  "antepone la API a la ruta relativa %s",
  (path) => {
    const previousApiUrl = process.env.REACT_APP_API_URL;
    process.env.REACT_APP_API_URL = "https://api.example.com/";

    try {
      expect(imageUrl(path)).toBe("https://api.example.com/images/producto.png");
    } finally {
      if (previousApiUrl === undefined) {
        delete process.env.REACT_APP_API_URL;
      } else {
        process.env.REACT_APP_API_URL = previousApiUrl;
      }
    }
  },
);

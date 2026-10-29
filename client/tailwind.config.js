/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          siena: "#A0522D",
          salvia: "#87A96B",
          alabastro: "#F5E6D3",
          vara: "#D4A437",
          rosa: "#C47A6D",
          texto: "#33251F",
          muted: "#75665D",
          borde: "#DCCABB",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(51, 37, 31, 0.08)",
      },
    },
  },
  plugins: [],
};

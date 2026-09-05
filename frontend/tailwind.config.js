/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fafafa",
          100: "#f4f4f4",
          800: "#1a1a1a",
          900: "#0a0a0a",
        },
        gold: {
          400: "#c9a84c",
          500: "#b8960a",
          600: "#a07c00",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

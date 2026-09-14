/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#0a0a0a",
          900: "#121212",
          800: "#181818",
          700: "#222222",
        },
        spotlight: {
          amber: "#d97706",
          glow: "rgba(217, 119, 6, 0.35)",
          border: "rgba(217, 119, 6, 0.3)",
        },
        ink: {
          50: "#f3f2ef",
          100: "#e4e2dc",
          200: "#c8c5bc",
          300: "#9c9890",
          400: "#6f6b64",
          500: "#524f4a",
          600: "#3c3a36",
          700: "#2a2926",
          800: "#1c1b19",
          900: "#141311",
          950: "#0e0d0c",
        },
        pearl: {
          50: "#fbf9f4",
          100: "#f6f2ea",
          200: "#ebe4d6",
          300: "#d9d0be",
        },
        brand: {
          50: "#fafafa",
          100: "#f4f4f4",
          800: "#1a1a1a",
          900: "#0a0a0a",
        },
        gold: {
          400: "#d97706",
          500: "#b45309",
          600: "#92400e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        diffuse:
          "0 1px 1px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.6), 0 24px 48px rgba(0,0,0,0.5)",
        lift:
          "0 2px 4px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.7), 0 0 24px rgba(217,119,6,0.15)",
        glow: "0 0 24px rgba(217, 119, 6, 0.25), 0 0 60px rgba(217, 119, 6, 0.12)",
        spotlight: "0 0 24px rgba(217, 119, 6, 0.15)",
        "spotlight-lg": "0 0 40px rgba(217, 119, 6, 0.25)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};


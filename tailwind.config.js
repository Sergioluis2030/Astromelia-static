/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        script: ["'Great Vibes'", "cursive"],
        sans: ["'Poppins'", "sans-serif"],
      },
      colors: {
        astromelia: {
          bg: "#FBF7FF",
          dark: "#2B2035",
          purple: "#5C2E8E",
          lilac: "#9B8AB5",
          soft: "#EDE6F7",
          bar: "#B8A6CD",
          green: "#2E5D3E",
          gold: "#C8A66A",
        }
      }
    },
  },
  plugins: [],
}

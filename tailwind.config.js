/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "tasktastic-primary": "#dabfff",
        "tasktastic-secondary": "#3b0764",
        "tasktastic-accent": "#005f80",
        "tastastic-background": "#181a1b"
      }
    },
  },
  plugins: [],
}


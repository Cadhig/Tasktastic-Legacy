/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "tasktastic-primary": "#dabfff",
        "tasktastic-secondary": "#3b0764",
        "tasktastic-accent": "#005f80",
        "tasktastic-background": "#374151",
        "tasktastic-box": "#1f2937",
        "tasktastic-input-background": "#4b5563",
        "tasktastic-gray": "#e5e7eb"
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        electric: '#007BFF',
        darkgray: '#4B5563',
        charcoal: '#1F2937',
      },
    },
  },
  plugins: [],
}

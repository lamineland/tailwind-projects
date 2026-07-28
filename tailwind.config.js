/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Dynamic color classes used by app.js
    { pattern: /bg-(blue|yellow|cyan|teal|green|purple|orange|indigo|red|pink|gray)-(100|500)/ },
    { pattern: /text-(blue|yellow|cyan|teal|green|purple|orange|indigo|red|pink|gray)-700/ },
    'hover:bg-blue-500',
    'hover:bg-gray-600',
    'hover:bg-blue-700',
    'hover:bg-pink-600',
  ],
  plugins: [],
}
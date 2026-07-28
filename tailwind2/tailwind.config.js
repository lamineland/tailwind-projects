/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./src/**/*.css",
    "./js/**/*.js",
  ],
  safelist: [
    'border-indigo-500',
    'border-gray-100',
    'bg-indigo-600', 'bg-pink-500', 'bg-emerald-500', 'bg-red-600', 'bg-blue-600', 'bg-purple-500', 'bg-amber-600', 'bg-orange-600', 'bg-cyan-600', 'bg-teal-600', 'bg-gray-600',
    'bg-indigo-100', 'bg-pink-100', 'bg-emerald-100', 'bg-red-100', 'bg-blue-100', 'bg-purple-100', 'bg-amber-100', 'bg-orange-100', 'bg-cyan-100', 'bg-teal-100', 'bg-gray-100',
    'bg-indigo-50', 'bg-pink-50', 'bg-emerald-50', 'bg-red-50', 'bg-blue-50', 'bg-purple-50', 'bg-amber-50', 'bg-orange-50', 'bg-cyan-50', 'bg-teal-50', 'bg-gray-50',
    'text-indigo-600', 'text-pink-600', 'text-emerald-600', 'text-red-600', 'text-blue-600', 'text-purple-600', 'text-amber-600', 'text-orange-600', 'text-cyan-600', 'text-teal-600', 'text-gray-600',
    'text-indigo-700', 'text-pink-700', 'text-emerald-700', 'text-red-700', 'text-blue-700', 'text-purple-700', 'text-amber-700', 'text-orange-700', 'text-cyan-700', 'text-teal-700', 'text-gray-700',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
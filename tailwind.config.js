/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna khusus tema "Smart Generation 2026"
        'primary': '#00f2ff',   // Cyan Elektrik
        'secondary': '#7000ff', // Ungu Digital
        'accent': '#ff007a',    // Pink Neon (untuk pemanis)
        'dark-bg': '#050508',   // Hitam Pekat
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'], // Font futuristik
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./assets/**/*.{js,html}", // Ini penting agar JS kamu terdeteksi
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
            'ga-blue': '#17468B',     // Biru Utama
            'ga-red': '#D12E17',      // Merah
            'ga-orange': '#D17417',   // Oranye
            'ga-mustard': '#D1A22E',  // Kuning Mustard
            'ga-teal': '#467474',     // Hijau Teal
            'void': '#050505',        // Hitam Background Dasar
            'card': '#0F0F0F'         // Warna Kartu
      },
      fontFamily: {
            'display': ['Syncopate', 'sans-serif'],
            'body': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

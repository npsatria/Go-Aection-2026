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
        // Palet Warna Resmi Go-Aection 2026 (Sesuai HTML)
        'ga-blue': '#17468B',     // Biru Utama
        'ga-red': '#D12E17',      // Merah Aksen
        'ga-orange': '#D17417',   // Oranye
        'ga-mustard': '#D1A22E',  // Kuning Mustard/Gold
        'ga-teal': '#467474',     // Hijau Teal
        'void': '#050505',        // Hitam Background
      },
      fontFamily: {
        'display': ['Syncopate', 'sans-serif'],    // Font Judul (Futuristik Lebar)
        'body': ['Space Grotesk', 'sans-serif'],   // Font Paragraf (Teknikal)
      },
    },
  },
  plugins: [],
}

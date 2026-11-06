/* Konfigurasi tema Tailwind (dimuat setelah cdn.tailwindcss.com). Ubah warna & font di sini. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Tema merah maroon: cream = latar putih krem kemerahan, ink = teks maroon gelap, ac = aksen maroon
        cream: { 50: "#ffffff", 100: "#fbf6f4", 200: "#f3e8e5", 300: "#e6d2cd" },
        ink: { 900: "#2a1215", 700: "#4a2a2e", 500: "#7a5a5e" },
        ac: { DEFAULT: "#7a1f2b", dark: "#5a141f" },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        head: ['"Cormorant Garamond"', "serif"],
        serif: ['"Playfair Display"', "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
};

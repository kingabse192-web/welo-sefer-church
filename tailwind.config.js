/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        church: {
          blue: '#002366', // Royal Blue
          gold: '#CFB53B', // Deep Gold
          cream: '#FDFCF6', // Warm White
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'elev-1': '0 1px 2px rgba(0,35,102,0.04), 0 4px 14px -6px rgba(0,35,102,0.08)',
        'elev-2': '0 2px 6px rgba(0,35,102,0.06), 0 12px 32px -12px rgba(0,35,102,0.16)',
        'elev-3': '0 6px 16px rgba(0,35,102,0.08), 0 24px 60px -24px rgba(0,35,102,0.28)',
        'gold-soft': '0 2px 14px -4px rgba(207,181,59,0.45)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

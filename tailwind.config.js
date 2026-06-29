/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elite: {
          black: '#050505',
          dark: '#0a0a0a',
          card: '#121212',
          gold: '#d4af37',
          goldHover: '#f3c63a',
          gray: '#8a8a8a'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    },
  },
  plugins: [],
}

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
        neve: {
          black: '#000000',
          dark: '#030811', /* Dark Navy */
          card: '#0a1122',
          blue: '#1E90FF', /* Azul Vibrante */
          blueHover: '#4da6ff',
          white: '#ffffff',
          gray: '#8a8a8a',
          gradient1: '#FF00FF', /* Magenta */
          gradient2: '#FFA500', /* Laranja */
          gradient3: '#FFFF00', /* Amarelo */
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.23, 1, 0.32, 1)',
      }
    },
  },
  plugins: [],
}

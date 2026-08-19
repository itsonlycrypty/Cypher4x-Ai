/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cypher: {
          red: '#ff003c',
          dark: '#0a0a0a',
          darker: '#050505',
          gray: '#1a1a1a',
          border: 'rgba(255, 0, 60, 0.2)',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
          }

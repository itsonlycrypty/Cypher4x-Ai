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
          dark: '#0c0c0c',
          panel: '#111111',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

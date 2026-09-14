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
        kbank: {
          DEFAULT: '#00A950',
          hover: '#008F43',
          dark: '#005E2C',
          forest: '#02381A',
          glow: 'rgba(0, 169, 80, 0.35)'
        },
        cyber: {
          emerald: '#10B981',
          mint: '#34D399',
          teal: '#14B8A6'
        },
        slate: {
          950: '#070B12',
          900: '#0E1524',
          850: '#141E33',
          800: '#1C2942',
          700: '#2A3C5E'
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}

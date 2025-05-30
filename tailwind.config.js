/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        'neon': {
          'blue': '#00d4ff',
          'purple': '#9b5de5',
          'pink': '#f15bb5',
          'yellow': '#fee77a',
          'green': '#00f5a0',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(0 212 255 / 0.5), 0 0 20px rgb(0 212 255 / 0.3)' },
          '100%': { boxShadow: '0 0 20px rgb(0 212 255 / 0.5), 0 0 30px rgb(0 212 255 / 0.3)' },
        }
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
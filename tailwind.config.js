/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'diablo-dark': '#0a0a0f', // Deep Black/Blue
        'diablo-earth': '#8c3a3a', // Terracotta/Reddish
        'diablo-sage': '#6b705c', // Sage/Nature
        'diablo-volcano': '#d95d39', // Volcanic Orange
        'diablo-accent': '#f0a500', // Yellowish accent
        'diablo-glass': 'rgba(255, 255, 255, 0.1)', // Glass effect
      },
      fontFamily: {
        'display': ['"Instrument Serif"', 'serif'], // Display font
        'body': ['"Manrope"', 'sans-serif'], // Body font
        'limelight': ['Limelight', 'cursive'], // Kept for legacy or specific use
        'new-rocker': ['"New Rocker"', 'cursive'], // Kept for legacy
        'mono': ['"Courier New"', 'Courier', 'monospace'], 
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '5%': { opacity: '0.9' },
          '10%': { opacity: '0.97' },
          '15%': { opacity: '0.95' },
          '100%': { opacity: '0.97' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        }
      },
      animation: {
        scan: 'scan 8s linear infinite',
        flicker: 'flicker 2s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

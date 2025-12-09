/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        basalt: '#0F0F11',
        slate: '#1A1A1C',
        'neon-lichen': '#CCFF00',
        clay: '#FF5E3A',
        glacier: '#F2F2F2',
        granite: '#A0A0A0',
      },
      fontFamily: {
        'display': ['"Bricolage Grotesque"', 'sans-serif'],
        'body': ['"Space Grotesk"', 'sans-serif'],
        'sans': ['"Inter"', 'sans-serif'],
        // Mantener mono para el chatbot si es necesario, o cambiarla
        'mono': ['"Space Grotesk"', 'monospace'],
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
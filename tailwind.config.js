/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          white: '#F9F7F1', // Warm Off-White (Main BG)
          surface: '#FFFFFF', // Card BG
          black: '#2D2420', // Dark Coffee (Text/Borders)
          sand: '#E6D5B8', // Beige (Secondary BG)
          green: '#4A6C48', // Sage/Olive (Natural Accent)
          orange: '#C25E00', // Terracotta (Primary Action)
          brown: '#5C4033', // Deep Brown
          lightgray: '#E5E5E5',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #2D2420',
        'neo-sm': '2px 2px 0px 0px #2D2420',
        'neo-lg': '8px 8px 0px 0px #2D2420',
        'neo-green': '4px 4px 0px 0px #4A6C48',
        'neo-orange': '4px 4px 0px 0px #C25E00',
        'neo-sand': '4px 4px 0px 0px #E6D5B8',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in-up': {
            '0%': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      }
    },
  },
  plugins: [],
}

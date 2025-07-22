/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['DM Serif Display', 'Playfair Display', 'serif'],
      },
      colors: {
        'primary': '#ffffff',
        'secondary': '#e0e0e0',
        'background': '#000000',
      },
      animation: {
        'fadeInUp': 'fadeInUp 1.5s cubic-bezier(.23,1.01,.32,1) both',
        'scroll': 'scroll linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        scroll: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        }
      }
    },
  },
  plugins: [],
} 
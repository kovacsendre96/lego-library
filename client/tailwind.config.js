/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(min-height: 800px)' },
      },
      colors: {
        'custom-yellow': '#FBC620'
      },
      keyframes: {
        "down": {
          '0%': { height: '116px' },
          '100%': { height: '350px' }
        },
        "right": {
          "0% ": {
            transform: 'translateX(100%)',
          },
          "100%": {
            transform: 'translateX(0)',
          },
        },
        "appear": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
      },
      animation: {
        "slide-down": 'down 0.5s ease-in-out',
        "slide-right": 'right 0.5s ease-in-out',
        "appear": 'appear 1s ease-in-out',
      },
      backgroundImage: {
        "yellow-gradient": "linear-gradient(to right, #FBC620, #FADD8D, #FBC620)"
      }
    }
  }
}

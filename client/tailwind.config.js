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
        "appear": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }

        },
      },

      animation: {
        "slide-down": 'down 0.5s ease-in-out',
        "appear": 'appear 1s ease-in-out',
      },
    }
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(min-height: 800px)' },
      }
    },
  },
  plugins: [],
};

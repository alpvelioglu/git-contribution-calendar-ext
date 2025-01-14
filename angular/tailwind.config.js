/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./angular/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        customGray: '#ffffff',
        customWhite: '#ffffff',
      }
    },
  },
  plugins: [],
}
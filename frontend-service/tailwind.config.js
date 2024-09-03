/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      textAlign: {
        start: 'start',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #2c67f2, #62cff4)'
      }
    },
  },
  plugins: [],
}

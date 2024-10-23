/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2c67f2',
        'secondary': '#62cff4',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      textAlign: {
        start: 'start',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #2c67f2, #62cff4)'
      },
      height: {
        'custom-25': '25rem'
      },
      boxShadow: {
        'custom': '0px 7px 29px rgba(100, 100, 111, 0.2)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
      },
      inset: {
        '12': '3rem',
        '40': '10rem'
      }
    },
  },
  plugins: [],
}

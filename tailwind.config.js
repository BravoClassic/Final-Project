/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   
  ],
  theme: {
    extend: {
      colors: {
        "over-yonder": "#a489be",
        "over-yonder-default": "#745296",
      },
    },
  },
  plugins: [],
};
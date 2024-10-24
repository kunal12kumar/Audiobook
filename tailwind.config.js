/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(120deg ,#011126 20% , #0C1033 0% , #03178C 10% ,#F41CD6 70% )',
        'custom-radial': 'radial-gradient(circle, #16a34a, #1e40af)',
      }
    },
  },
  plugins: [],
}
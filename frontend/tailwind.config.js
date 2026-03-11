/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          green: '#4ade80',
          dark: '#166534',
          light: '#dcfce7',
          beige: '#f5f5dc',
        }
      }
    },
  },
  plugins: [],
}

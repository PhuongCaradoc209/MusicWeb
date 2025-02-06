/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        color_0: '#585453',
        color_0_bold: '#3d3b3b',
        color_1: '#bd5c2b',
        color_2: '#fbfd82',
        color_3: '#232323',
        color_4: '#f2f2f2',
      }
    },
  },
  plugins: [],
}


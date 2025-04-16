/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 25s linear infinite',
      },
      colors:{
        color_0: '#585453',
        color_0_bold: '#3d3b3b',
        color_1: '#2940D3',
        color_2: '#fbfd82',
        color_3: '#232323',
        color_4: '#f2f2f2',
        color_body: '#1f1f1f'
      },
      perspective: {
        none: 'none',
        sm: '600px',
        md: '800px',
        lg: '1000px',
        xl: '1500px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.flat': {
          'transform-style': 'flat',
        },
        '.perspective': {
          perspective: '1000px',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.backface-visible': {
          'backface-visibility': 'visible',
        },
      });
    },
  ],
}


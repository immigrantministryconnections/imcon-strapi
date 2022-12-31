const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#133e5d',
        mediumBlue: '#1d5b8d',
        lightBlue: '#247ab9',
        veryLightBlue: '#c3dce8',
        imconOrange: '#bd6719',
        imconYellow: '#edb11c',
      },
      fontFamily: {
        sans: ['Corbel', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

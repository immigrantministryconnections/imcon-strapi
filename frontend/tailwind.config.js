const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#133e5dff',
        mediumBlue: '#1d5b8dff',
        lightBlue: '#247ab9ff',
        imconOrange: '#bd6719ff',
        imconYellow: '#edb11cff',
      },
      fontFamily: {
        sans: ['Corbel', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

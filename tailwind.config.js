const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      ...colors
    },
    screens: {
      'xsm': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1920px',
      'xxxl': '2560px',
      'navBar': '768px'
    },
    
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '164': '42rem'
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
        '10xl': '108rem',
        'screen-3xl': '1920px'
      },
      fontSize: {
        '2xs': '.6rem',
        '3xs': '.5rem',
        '4xs': '.4rem',
        '8xl': '6rem'
      }, 
      boxShadow: {
        'green': '0px 0px 25px 6px rgba(74,222,128,0.36)'
      }
    },
  },
  variants: {
    extend: {},
  }
}

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'accent-100': '#F9EBDB',
      'accent-400': '#DE9848',
      'accent-500': '#D28226',
      'alert-100': '#FDF4F6',
      'alert-300': '#EB8CA3',
      'alert-400': '#DD3E64',
      'grey-100': '#FFFFFF',
      'grey-300': '#C5C5C5',
      'grey-500': '#767676',
      'primary-100': '#E9F4EE',
      'primary-200': '#BFE0CF',
      'primary-300': '#88C6A5',
      'primary-400': '#4EA476',
      'primary-500': '#408560',
      'blue-100': '#D9F4FF',
      'blue-200': '#59C3DA',
      'brown-100': '#FCEFE0',
    },
    extend: {},
    fontSize: {
      xs: ['0.625rem', '0.875rem'],
      xm: ['0.75rem', '1.125rem'],
      sm: ['0.93rem', '1.25rem'],
      md: ['1.125rem', '1.75rem'],
      lg: ['1.375rem', '1.625rem'],
      xl: ['2rem', '2.3rem'],
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        '.no-scrollbar::-webkit-scrollbar' : {
          'display' : 'none'
        }
      })
    })
  ],
}

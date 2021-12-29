module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'accent-100': '#F9EBDB',
      'alert-100': '#FDF4F6',
      'alert-300': '#EB8CA3',
      'grey-100': '#FFFFFF',
      'grey-300': '#C5C5C5',
      'grey-500': '#767676',
      'primary-100': '#E9F4EE',
      'primary-300': '#88C6A5',
      'primary-400': '#4EA476',
      'primary-500': '#408560',
    },
    extend: {},
    fontSize: {
      xs: ['10px', '14px'],
      xm: ['12px', '18px'],
      sm: ['15px', '20px'],
      md: ['18px', '28px'],
      xl: ['32px', '37px'],
    }
  },
  plugins: [],
}

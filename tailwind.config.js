import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {}
  },

  plugins: [flowbite]
}

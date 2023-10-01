/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{html,js,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
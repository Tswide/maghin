/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{edge,js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#18191B',
        second_background: '#212225',
        special_background: '#304384',
        button: '#1D2E62',
        border: '#363A3F',
        lien: '#777b83',
        hover: '#eeeff1',

        title_text: '#eeeff1',
        paragraphe: '#eeeff1',
        special: '#EC9455'
      },
      fontWeight: {
        title_text: '700',
        second_text: '600',
        paragraphe: '500'
      }
    },
  },
  plugins: [],
}


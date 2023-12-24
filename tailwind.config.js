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
        button: '#A35829',
        border: '#435DB1',
        lien: '#777b83',
        hover: '#FFA057',

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


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{edge,js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#212225',
        second_background: '#18191B',
        button: '#3A4F97',
        border: '#3A4F97',
        lien: '#9EB1FF',
        hover: '#D6E1FF',

        title_text: '#EEEEEE',
        paragraphe: '#B4B4B4',
        special: '#FF977D'
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


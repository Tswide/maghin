/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{edge,js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FCFCFD',
        second_background: '#F9F9FB',
        button: '#D2DEFF',
        border: '#ABBDF9',
        lien: '#60646C',
        hover: '#3A5BC7',

        title_text: '#1C2024',
        paragraphe: '#60646C',
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


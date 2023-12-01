/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{edge,js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFDFE',
        second_background: '#F7F9FF',
        button: '#3E63DD',
        border: '#ABBDF9',
        lien: '#3E63DD',
        hover: '#3A5BC7',

        title_text: '#202020',
        paragraphe: '#646464'
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


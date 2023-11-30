/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{edge,js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F9FF',
        button: '#3E63DD',
        border: '#ABBDF9',
        lien: '#3E63DD',
        hover: '#1F2D5C',

        title_text: '#80838D',
        paragraphe: '#B9BBC6'
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


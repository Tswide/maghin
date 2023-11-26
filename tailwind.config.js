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
        hover: '#1F2D5C'
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 保留原来的主题色
        primary: '#ed9428',
      },
    },
  },
  plugins: [],
}


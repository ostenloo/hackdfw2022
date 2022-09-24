/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      
    },
    extend: {
      fontFamily: { 
        google : ['Roboto,arial,sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'spacecadet': '#1D3461',
        'yaleblue': '#1F487E',
        'queenblue': '#376996',
        'unblue': '#6290C8',
        'ceruleanfrost': '#829CBC',
      },
    },
  },
  plugins: [
  ],
}
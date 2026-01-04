/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#1DBF73',
        'primary-green-dark': '#0F8F55',
        'primary-green-pastel': '#DCF9EA',
        'accent-lavender': '#8F9BFF',
        'orange-pastel': '#FFE8CC',
        'orange-text': '#F59E0B',
        'gray-900': '#1A1A1A',
        'gray-600': '#6C6C6C',
        'gray-300': '#E5E5E5',
        'gray-100': '#F8F8F8',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};

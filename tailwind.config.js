/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#00b4d8',
          'dark': '#0d1117',
          'dark-light': '#161b22'
        },
        animation: {
          'gradient': 'gradient 8s linear infinite',
        },
        keyframes: {
          gradient: {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center'
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center'
            },
          },
        },
      },
    },
    plugins: [],
  }
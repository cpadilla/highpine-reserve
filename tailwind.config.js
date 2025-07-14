// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        transitionDelay: {
            200: '200ms',
            300: '300ms',
        }
    },
  },
  plugins: [],
}

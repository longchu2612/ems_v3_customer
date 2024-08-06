/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      flexBasis: {
        "1/3-gap-4": "calc(33.3% - (2/3 * 1rem))"
      }

    },
  },
  plugins: [],
}


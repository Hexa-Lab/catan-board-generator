/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      ship: "url('/public/assets/images/pirate-ship.png')",
    },
  },
  plugins: [],
};

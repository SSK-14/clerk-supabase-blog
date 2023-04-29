/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 3px 6px #00000029",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -0.5rem, 0)",
          },
        },
      },
      animation: {
        loader: "loader 0.4s infinite alternate",
      },
    },
  },
  plugins: [],
};

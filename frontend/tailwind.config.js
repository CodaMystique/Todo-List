/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        pointer: "url(/assets/cursor.png)",
      },
    },
    colors: {
      midnight: "#0D0714",
      purple: {
        100: "#9E78CF",
        200: "#3E1671",
      },
      black: "#15101C",
      white: "#FFFFFF",
      gray: {
        300: "#777777",
      },
      teal: "#78CFB0",
    },
  },
  plugins: [],
};

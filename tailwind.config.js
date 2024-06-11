/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyBackground: "#1B202A",
        yellow: "#C4B454",
        customBlack: "#252B36",
        customGray: "#2B3342",
        fadedText: "#717A8C",
      },
    },
  },
  plugins: [],
};

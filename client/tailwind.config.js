/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "Okra-Bold": ["Okra-Bold", "sans-serif"],
        "Okra-Medium": ["Okra-Medium", "sans-serif"],
        "Okra-Regular": ["Okra-Regular", "sans-serif"],
        "Okra-Mediumlight": ["Okra-MediumLight", "sans-serif"],
        "Okra-ExtraBold": ["Okra-ExtraBold", "sans-serif"],
      },
      colors: {
        primary: "#f7ca49",
        primary_Light: "#ffe141",
        secondary: "#0d8320",
        text: "#363636",
        disable: "#9197a6",
        border: "#d0d4dc",
        Bg_secondary: "#f5f6fb",
        accent: {
          100: "FBFBFD",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191d31",
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};

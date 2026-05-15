/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#1F2428",
          green: "#00C97B",
          lightGreen: "#00D981",
        },
      },
      boxShadow: {
        "brand-green": "0px 4px 4px rgba(1, 203, 124, 0.2)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #00C97B 0%, #00D981 96.96%)",
      },
    },
  },
  plugins: [],
};

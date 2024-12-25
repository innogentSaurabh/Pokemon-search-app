/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container
        padding: "1rem", // Adds padding to the container
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      colors: {
        primary: "#0a4868",
        neutralBgGrey: "#f0f0f0",
      },
    },
  },
  plugins: [],
};

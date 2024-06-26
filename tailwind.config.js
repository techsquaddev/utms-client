/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#10B981",
        accent: "#F59E0B",
      },
      screens: {
        sm: "576px",
        md: "800px",
        lg: "1440px",
      },
    },
  },
  plugins: [],
};

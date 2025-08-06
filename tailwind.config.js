/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "-1024": {
          max: "1024px",
        },
        "-990": {
          max: "990px",
        },
        "-850": {
          max: "850px",
        },
        "-700": {
          max: "700px",
        },
        "-768": {
          max: "768px",
        },
        "-650": {
          max: "650px",
        },
        "-600": {
          max: "600px",
        },
        "-575": {
          max: "575px",
        },
        "-500": {
          max: "500px",
        },
        "-400": {
          max: "400px",
        },
        "-350": {
          max: "350px",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {

    extend: {
      colors: {
        primary: '#2C5282', // Dark blue for a professional look
        secondary: '#63B3ED', // Light blue for engagement
        accent: '#F6AD55', // Orange for highlighting important elements
        background: '#F7FAFC', // Light gray for a clean background
        text: '#2D3748', // Dark gray for text readability
        link: '#808080'
      },

      width:{
        xs: "480px",
        sm: "640pxx",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px"

      }

    },
  
  },
  plugins: [],
}


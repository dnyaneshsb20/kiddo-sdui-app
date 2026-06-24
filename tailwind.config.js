/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brandPrimary: "var(--color-primary)",
        brandBackground: "var(--color-background)",
      },
    },
  },
  plugins: [],
};

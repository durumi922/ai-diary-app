/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: "#FFD1DC",
        pastelMint: "#C4FCEF",
        pastelYellow: "#FFF3B0",
        pastelPurple: "#E8DFF5",
        pastelBlue: "#D0F0FD",
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

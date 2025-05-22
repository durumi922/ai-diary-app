/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      //사용자 정의 색상 추가
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

      /* EmotionResult.tsx 애니메이션 추가 */
      keyframes: {
      'fade-in': {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },


    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(-120%)" },
        },
      },
      animation: {
        // Tên animation là "marquee",
        // chạy trong 10s, kiểu linear, lặp vô hạn
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [],
};


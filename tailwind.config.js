/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070a12",
        panel: "#101625",
        line: "rgba(148, 163, 184, 0.2)",
        terminal: "#9fffc4",
      },
      boxShadow: {
        glow: "0 0 35px rgba(45, 212, 191, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

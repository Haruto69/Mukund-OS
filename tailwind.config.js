/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050810",
        panel: "#0a0f1e",
        line: "rgba(148, 163, 184, 0.15)",
        terminal: "#5eead4",
      },
      boxShadow: {
        glow: "0 0 35px rgba(45, 212, 191, 0.12)",
        "glow-lg": "0 0 60px rgba(45, 212, 191, 0.15)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

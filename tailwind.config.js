/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08060b",
        panel: "#0c0810",
        accent: "#e84545",
        "accent-dim": "#e84545",
        cyber: "#3dd8e0",
        line: "rgba(232, 69, 69, 0.15)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(232, 69, 69, 0.1)",
        "glow-red": "0 0 40px rgba(232, 69, 69, 0.12)",
        "glow-cyber": "0 0 30px rgba(61, 216, 224, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
        display: ["Orbitron", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        scanline: "scanline 4s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(calc(100vh + 100%))" },
        },
      },
    },
  },
  plugins: [],
};

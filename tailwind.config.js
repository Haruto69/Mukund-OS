/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505", // matte black
        panel: "rgba(10, 10, 12, 0.45)", // slightly more transparent for better glassmorphism
        primary: {
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
        cyber: "#00ffff",
      },
      boxShadow: {
        "glow-primary": "var(--glow-primary)",
        "glow-primary-lg": "var(--glow-primary-lg)",
        "glow-primary-inner": "var(--glow-primary-inner)",
        "panel-inner": "inset 0 1px 1px rgba(255, 255, 255, 0.05), inset 0 0 20px rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Orbitron", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        scanline: "scanline 8s linear infinite",
        "noise": "noise 0.2s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        noise: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1px, -1px)" },
          "20%": { transform: "translate(1px, 1px)" },
          "30%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(1px, -2px)" },
          "50%": { transform: "translate(-1px, 2px)" },
          "60%": { transform: "translate(2px, -1px)" },
          "70%": { transform: "translate(1px, 2px)" },
          "80%": { transform: "translate(-2px, -1px)" },
          "90%": { transform: "translate(2px, 1px)" },
        },
      },
    },
  },
  plugins: [],
};

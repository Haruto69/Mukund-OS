/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Colors are driven by CSS custom properties (see src/index.css) so the
      // Peter/Miles themes stay the single source of truth. Components use
      // arbitrary values like text-[var(--text)] / bg-[var(--surface)].
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#18181B",
        primary: "#4F46E5",
        accent: "#8B5CF6",
        text: "#FAFAFA",
        muted: "#A1A1AA",
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(79, 70, 229, 0.22)",
        soft: "0 18px 60px rgba(0, 0, 0, 0.28)",
      },
      backgroundImage: {
        "premium-radial":
          "radial-gradient(circle at top left, rgba(79,70,229,0.32), transparent 32%), radial-gradient(circle at top right, rgba(139,92,246,0.24), transparent 30%)",
      },
    },
  },
  plugins: [],
};

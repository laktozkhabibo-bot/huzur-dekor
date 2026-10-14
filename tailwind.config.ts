import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1320px" } },
    extend: {
      colors: {
        // Huzur Dekor brand gold (#b8892f) with a soft champagne range
        gold: {
          50: "#FBF7EE",
          100: "#F5EBD3",
          200: "#EBD8AB",
          300: "#DEC07D",
          400: "#CFA858", // goldSoft
          500: "#B8892F", // brand gold
          600: "#9C7126",
          700: "#7E5A20",
          800: "#5F441A",
          900: "#453214",
        },
        // Warm charcoal ink (#2e2e2e) for text and dark sections
        ink: {
          DEFAULT: "#232220",
          50: "#F5F4F2",
          100: "#E8E6E2",
          200: "#CDC9C2",
          300: "#A29D94",
          400: "#77726A",
          500: "#56524C",
          600: "#3E3B37",
          700: "#2E2E2E",
          800: "#232220",
          900: "#171614",
        },
        cream: {
          DEFAULT: "#F7F2E9",
          50: "#FDFBF7",
          100: "#F7F2E9",
          200: "#F0E9DC",
          300: "#E5DACA",
        },
        olive: {
          300: "#B7BC9C",
          400: "#959B73",
          500: "#6E7552",
          600: "#565C3E",
          700: "#43482F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 50px -12px rgba(184,137,47,0.55)",
        card: "0 1px 2px rgba(35,34,32,.04), 0 12px 40px -12px rgba(35,34,32,.16)",
        lift: "0 30px 60px -22px rgba(35,34,32,.38)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg,#DEC07D 0%,#B8892F 50%,#7E5A20 100%)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "char-in": { from: { opacity: "0", transform: "translateY(0.6em)" }, to: { opacity: "1", transform: "none" } },
        "line-in": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        "img-in": { from: { opacity: "0", transform: "scale(1.12)" }, to: { opacity: "1", transform: "scale(1)" } },
        "curtain-up": { from: { clipPath: "inset(100% 0 0 0)" }, to: { clipPath: "inset(0 0 0 0)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up .8s cubic-bezier(.22,1,.36,1) both",
        "fade-in": "fade-in .6s ease-out both",
        "char-in": "char-in .7s cubic-bezier(.22,1,.36,1) both",
        "line-in": "line-in 1.1s cubic-bezier(.22,1,.36,1) both",
        "img-in": "img-in 1.6s cubic-bezier(.22,1,.36,1) both",
        "curtain-up": "curtain-up 1.2s cubic-bezier(.77,0,.18,1) both",
      },
    },
  },
  plugins: [],
};

export default config;

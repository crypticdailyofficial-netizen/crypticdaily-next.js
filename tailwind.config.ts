import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A0F1E",
        surface: "#111827",
        border: "#1E2A3A",
        cyan: {
          DEFAULT: "#00D4FF",
          glow: "rgba(0,212,255,0.3)",
        },
        purple: {
          DEFAULT: "#7C3AED",
        },
        up: "#10B981",
        down: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,212,255,0.3)",
        "glow-cyan-sm": "0 0 12px rgba(0,212,255,0.2)",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0A0F1E 0%, #111827 100%)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

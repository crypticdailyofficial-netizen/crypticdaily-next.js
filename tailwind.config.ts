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
        "cd-bg": "#06080F",
        "cd-surface": "#0D1118",
        "cd-border": "#1C2535",
        "cd-cyan": "#00D4FF",
        "cd-yellow": "#FFE600",
        "cd-purple": "#7C3AED",
        "cd-text": "#E8E4D9",
        "cd-muted": "#6B7280",
        "cd-up": "#10B981",
        "cd-down": "#EF4444",
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
        bebas: ["var(--font-bebas)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        mono: ["var(--font-jb-mono)", "monospace"],
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
        "fade-up": "fadeUp 1s ease both",
        ticker: "tickerMove 28s linear infinite",
        "dot-blink": "dotBlink 1s step-end infinite",
        "float-y": "floatY 2s ease infinite",
        "border-pulse": "borderPulse 4s ease infinite",
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
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        tickerMove: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        dotBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        borderPulse: {
          "0%, 100%": {
            borderColor: "#1C2535",
            boxShadow: "none",
          },
          "50%": {
            borderColor: "#00D4FF",
            boxShadow: "0 0 18px rgba(0,212,255,0.25)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

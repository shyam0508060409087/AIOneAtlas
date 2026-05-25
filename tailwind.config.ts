import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Surfaces (dark layered system) ──
        surface: {
          0: "#0A2540",
          1: "#1A1F36",
          2: "#1A1F36",
          3: "#1A1F36",
          4: "#1A1F36",
          5: "#1A1F36",
          hover: "#1A1F36",
        },
        // ── Borders ──
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          md: "rgba(255,255,255,0.12)",
          lg: "rgba(255,255,255,0.18)",
        },
        // ── OneAtlas Accent: Violet/Indigo ──
        accent: {
          DEFAULT: "#635BFF",
          light: "#7A73FF",
          dark: "#635BFF",
          glow: "rgba(99,91,255,0.18)",
          "glow-sm": "rgba(99,91,255,0.08)",
        },
        // ── Semantic Colors ──
        teal:  "#00D4B1",
        amber: "#F8BC42",
        orange:"#FFB17A",
        rose:  "#FF5996",
        sky:   "#00D4FF",
        green: "#00D4B1",
        pink:  "#FF5996",
        // ── Text ──
        text: {
          1: "#EEEEF8",
          2: "#9494B4",
          3: "#52526A",
          4: "#343448",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
        xs:   ["12px", { lineHeight: "1.5" }],
        sm:   ["13px", { lineHeight: "1.55" }],
        base: ["14px", { lineHeight: "1.6" }],
        md:   ["15px", { lineHeight: "1.65" }],
        lg:   ["16px", { lineHeight: "1.7" }],
        xl:   ["18px", { lineHeight: "1.5" }],
        "2xl":["22px", { lineHeight: "1.35" }],
        "3xl":["28px", { lineHeight: "1.2" }],
        "4xl":["36px", { lineHeight: "1.1" }],
        "5xl":["48px", { lineHeight: "1.05" }],
        "6xl":["60px", { lineHeight: "1.0" }],
        "7xl":["76px", { lineHeight: "0.98" }],
      },

      fontWeight: {
        thin:       "300",
        normal:     "400",
        medium:     "500",
        semibold:   "600",
        bold:       "700",
        extrabold:  "800",
        black:      "900",
      },

      letterSpacing: {
        tightest: "-0.045em",
        tighter:  "-0.03em",
        tight:    "-0.02em",
        snug:     "-0.01em",
        normal:   "0em",
        wide:     "0.04em",
        wider:    "0.08em",
        widest:   "0.12em",
      },

      borderRadius: {
        xs:   "4px",
        sm:   "6px",
        md:   "10px",
        lg:   "14px",
        xl:   "18px",
        "2xl":"24px",
        "3xl":"32px",
        full: "9999px",
      },

      boxShadow: {
        sm:   "0 1px 3px rgba(0,0,0,0.6)",
        md:   "0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.6)",
        lg:   "0 8px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(99,91,255,0.3), 0 0 40px rgba(99,91,255,0.12)",
        "glow-lg": "0 0 80px rgba(99,91,255,0.2), 0 0 160px rgba(99,91,255,0.08)",
        "glow-focus": "0 0 0 3px rgba(99,91,255,0.1)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.5)",
      },

      spacing: {
        "4.5": "18px",
        "13":  "52px",
        "15":  "60px",
        "18":  "72px",
        "22":  "88px",
        "26":  "104px",
        "30":  "120px",
      },

      transitionTimingFunction: {
        spring:   "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth:   "cubic-bezier(0.16, 1, 0.3, 1)",
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "350": "350ms",
        "500": "500ms",
        "700": "700ms",
      },

      animation: {
        "fade-up":    "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":    "fadeIn 0.3s ease both",
        "scale-in":   "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-dot":  "pulseDot 2s ease-in-out infinite",
        "orb-float":  "orbFloat 16s ease-in-out infinite",
        "shimmer":    "shimmer 1.8s linear infinite",
        "float":      "float 3s ease-in-out infinite",
        "blink":      "blink 1s step-end infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-slow":  "spin 3s linear infinite",
      },

      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.94)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%":     { opacity: "0.5", transform: "scale(1.3)" },
        },
        orbFloat: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(40px,-30px) scale(1.08)" },
          "66%":     { transform: "translate(-25px,40px) scale(0.94)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 20px rgba(99,91,255,0.2)" },
          "50%":     { boxShadow: "0 0 40px rgba(99,91,255,0.4)" },
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #635BFF, #7A73FF)",
        "gradient-hero":   "linear-gradient(135deg, #fff 0%, #7A73FF 55%, #635BFF 100%)",
        "gradient-teal":   "linear-gradient(135deg, #fff 0%, #00D4FF 55%, #00D4B1 100%)",
        "shimmer-base":    "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%)",
      },
    },
  },
  plugins: [],
};

export default config;

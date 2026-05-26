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
        bg: {
          primary: "#F5F5EE",
          secondary: "#FFFFFF",
          tertiary: "#FAFAFA",
          quaternary: "#F0F0ED",
        },
        text: {
          primary: "#111111",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          light: "#ECECEC",
        },
        accent: {
          primary: "#FF6600",
          hover: "#E65C00",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },

      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["13px", { lineHeight: "1.55" }],
        base: ["14px", { lineHeight: "1.6" }],
        md: ["15px", { lineHeight: "1.65" }],
        lg: ["16px", { lineHeight: "1.7" }],
        xl: ["18px", { lineHeight: "1.5" }],
        "2xl": ["22px", { lineHeight: "1.35" }],
        "3xl": ["28px", { lineHeight: "1.2" }],
        "4xl": ["36px", { lineHeight: "1.1" }],
        "5xl": ["48px", { lineHeight: "1.05" }],
        "6xl": ["60px", { lineHeight: "1" }],
        "7xl": ["72px", { lineHeight: "0.95" }],
      },

      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        "3xl": "32px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.03)",
        md: "0 4px 24px rgba(0,0,0,0.03)",
        lg: "0 8px 40px rgba(0,0,0,0.08)",
        focus: "0 0 0 3px rgba(255, 102, 0, 0.1)",
      },

      spacing: {
        "4.5": "18px",
        "13": "52px",
        "15": "60px",
        "18": "72px",
        "22": "88px",
        "26": "104px",
        "30": "120px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      animation: {
        "fade-up": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.3s ease both",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
      },

      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

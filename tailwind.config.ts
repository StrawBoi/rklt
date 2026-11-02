import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: {
          600: "#2C5A66",
          700: "#1E4650",
          800: "#163842",
          900: "#0E2B33",
          950: "#0B2027",
        },
        terracotta: {
          100: "#F3D9C4",
          300: "#E0A05B",
          400: "#D89162",
          500: "#C77B4C",
          600: "#A9663D",
        },
        sand: {
          100: "#F7F1E7",
          200: "#EDE3D3",
          300: "#DCCBB0",
        },
        brandblue: {
          400: "#5B98DC",
          500: "#2E7CD1",
        },
        navy: {
          950: "#06102A",
        },
        gold: {
          DEFAULT: "#E2B34A",
          bright: "#F6E2A4",
        },
        brass: {
          100: "var(--brass-100)",
          400: "var(--brass-400)",
          700: "var(--brass-700)",
        },
        cream: "#F4F1EA",
        role: {
          abyss: "var(--role-abyss)",
          field: "var(--role-field)",
          dock: "var(--role-dock)",
          panel: "var(--role-panel)",
          hud: "var(--role-hud)",
          overlay: "var(--role-overlay)",
          text: "var(--role-text)",
          muted: "var(--role-muted)",
          action: "var(--role-action)",
          on: "var(--role-on-action)",
          actionText: "var(--role-action-text)",
          signal: "var(--role-signal)",
          focus: "var(--role-focus)",
          line: "var(--role-line)",
          lineBright: "var(--role-line-bright)",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo-display)", "system-ui", "sans-serif"],
        numeral: ["var(--font-big-shoulders)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(11, 32, 39, 0.08)",
        md: "0 8px 24px rgba(11, 32, 39, 0.16)",
        card: "var(--shadow-card)",
        cardHover: "var(--shadow-card-hover)",
        ledge: "var(--shadow-ledge)",
        hud: "var(--shadow-hud)",
        glow: "0 0 32px rgba(199, 123, 76, 0.25)",
        glowGold: "var(--shadow-glow-gold)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        confident: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;

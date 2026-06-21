/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "3rem",
        xl: "5rem",
      },
    },
    extend: {
      colors: {
        ink: {
          950: "#0a0a0f",
          900: "#101018",
          800: "#16161f",
          700: "#1d1d28",
          600: "#262633",
        },
        bone: {
          50: "#f5f5f0",
          100: "#e8e8e0",
          200: "#cfcfc4",
          300: "#a8a89c",
        },
        ash: {
          DEFAULT: "#8a8a85",
          dark: "#5a5a55",
        },
        acid: {
          DEFAULT: "#d4ff3a",
          dark: "#a8cc1f",
          glow: "#e8ff7a",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3.5rem, 10vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "h2": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      transitionTimingFunction: {
        sharp: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

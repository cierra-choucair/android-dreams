import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FF6A00",
        magenta: "#E8197D",
        cyan: "#00D4FF",
        gold: "#C9A84C",
        ink: "#06050A",
        cream: "#F5F0E8",
        dim: "rgba(245,240,232,0.65)",
        dimmer: "rgba(245,240,232,0.42)",
        matrix: "#00FF41",
        "matrix-dark": "#0A2413",
        violet: "#8A4FFF",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        serif: ["var(--font-crimson)", "Crimson Pro", "Georgia", "serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.3em",
        wide2: "0.2em",
        wide4: "0.4em",
      },
      maxWidth: {
        prose: "65ch",
      },
      keyframes: {
        scanline: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100vh" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        scanline: "scanline 12s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

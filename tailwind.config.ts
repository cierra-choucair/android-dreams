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
        violet: "#8A4FFF",
        // QFrontline brand v1.0 — see Android_Dreams_Suite brand book
        qf: {
          ink: "#F6F3FF", // primary text · wordmark default (dark surfaces)
          void: "#0A0610", // primary surface · masthead, hero
          signal: "#FF2B5E", // single accent · prompt, bar, links
          "signal-deep": "#D6103F", // signal adjusted for small text on white (AA)
          dust: "#A098B8", // secondary text · tagline, meta
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        serif: ["var(--font-crimson)", "Crimson Pro", "Georgia", "serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "monospace"],
        "qf-sans": ["var(--font-outfit)", "Outfit", "sans-serif"],
        "qf-mono": ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
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
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        cursor: {
          "0%, 60%": { opacity: "1" },
          "61%, 100%": { opacity: "0.2" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        cursor: "cursor 1.3s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

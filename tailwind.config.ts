import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Android Dreams brand v1.0 — six colors, all pulled from the mark.
        // Token names kept from the first iteration; values are the brand's.
        orange: "#FF8A3D", // Warm · lens glow · interior light
        magenta: "#FF1F3D", // right half · machine · 1
        cyan: "#3A8FFF", // left half · human · 0
        gold: "#A098B8", // Dust · credits · metadata
        ink: "#050308", // Void · the letterbox · primary surface
        cream: "#F6F3FF", // Bone · title type · primary ink
        dim: "rgba(246,243,255,0.65)",
        dimmer: "rgba(246,243,255,0.42)",
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
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
        serif: ["var(--font-outfit)", "Outfit", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
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

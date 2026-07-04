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
        // Editorial kicker tracking — tight, confident, not airy
        eyebrow: "0.09em",
        wide2: "0.06em",
        wide4: "0.12em",
      },
      boxShadow: {
        // "Floaty" elevation for cards and panels on the dark surface
        float: "0 10px 40px -12px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.3)",
        "float-lg": "0 24px 70px -16px rgba(0,0,0,0.7), 0 4px 14px rgba(0,0,0,0.35)",
        // Light-surface (QFrontline) equivalents
        "float-light": "0 10px 34px -12px rgba(10,6,16,0.18), 0 2px 8px rgba(10,6,16,0.06)",
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
        // Superposition field: two states drifting through each other
        drift1: {
          "0%, 100%": { transform: "translate(-8%, -6%) scale(1)" },
          "50%": { transform: "translate(10%, 8%) scale(1.15)" },
        },
        drift2: {
          "0%, 100%": { transform: "translate(6%, 10%) scale(1.1)" },
          "50%": { transform: "translate(-10%, -8%) scale(0.95)" },
        },
        // Measurement: an interference ring expanding and dissolving
        ringPulse: {
          "0%": { transform: "scale(0.55)", opacity: "0.55" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        cursor: "cursor 1.3s steps(1) infinite",
        drift1: "drift1 22s ease-in-out infinite",
        drift2: "drift2 26s ease-in-out infinite",
        ringPulse: "ringPulse 9s ease-out infinite",
        "spin-slower": "spin 90s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

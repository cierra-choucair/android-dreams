import type { Config } from "tailwindcss";

/**
 * Universum Labs platform design tokens.
 * A clean, deep-space scientific identity — distinct from the Android Dreams
 * magazine. Domain accent colors are the single source of truth in the ingest
 * (see ingest/build_graph.py DOMAINS) and are applied inline from graph data;
 * the tokens here are the neutral chrome + brand accent.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0D13",
        surface: "#111621",
        "surface-2": "#161C29",
        line: "#232B3B",
        "line-soft": "#1B2230",
        ink: "#E7EAF1",
        "ink-dim": "#9AA3B4",
        "ink-faint": "#646E82",
        brand: "#A9B4FF",
        "brand-dim": "#6E79C4",
        // relationship semantics
        "rel-solves": "#4AD6A0",
        "rel-uses": "#5EC8E5",
        "rel-exhibits": "#E8A24A",
        "rel-good": "#8B7FE8",
        "rel-applies": "#E86A8E",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI",
          "Roboto", "Helvetica", "Arial", "sans-serif",
        ],
        mono: [
          "ui-monospace", "SFMono-Regular", "Menlo", "Consolas",
          "Liberation Mono", "monospace",
        ],
      },
      maxWidth: {
        reading: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;

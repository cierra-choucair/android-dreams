export type FormatSlug =
  | "transmissions"
  | "deep-read"
  | "sci-fi-lens"
  | "sunday-letter"
  | "qfrontline";

export interface Format {
  slug: FormatSlug;
  name: string;
  /** Tailwind text color class for the format accent */
  text: string;
  /** Tailwind border color class */
  border: string;
  /** Tailwind background color class */
  bg: string;
  /** Raw hex for inline styles (glows, strokes) */
  hex: string;
  /** Short description shown on archive headers */
  description: string;
  /** Cadence label */
  cadence: string;
}

export const FORMATS: Record<FormatSlug, Format> = {
  transmissions: {
    slug: "transmissions",
    name: "Transmissions",
    text: "text-orange",
    border: "border-orange",
    bg: "bg-orange",
    hex: "#FF6A00",
    description:
      "Daily dispatches from the frontier — what happened, why it matters, and what it says about the world being built.",
    cadence: "MON–FRI",
  },
  "deep-read": {
    slug: "deep-read",
    name: "The Deep Read",
    text: "text-cyan",
    border: "border-cyan",
    bg: "bg-cyan",
    hex: "#00D4FF",
    description:
      "Long-form journalism from the deep end of science and technology. Reported, considered, and built to last.",
    cadence: "LONG-FORM",
  },
  "sci-fi-lens": {
    slug: "sci-fi-lens",
    name: "The Sci-Fi Lens",
    text: "text-magenta",
    border: "border-magenta",
    bg: "bg-magenta",
    hex: "#E8197D",
    description:
      "Science fiction as a framework for the present. What imagined worlds tell us about the decisions in front of us.",
    cadence: "ESSAYS",
  },
  "sunday-letter": {
    slug: "sunday-letter",
    name: "The Sunday Letter",
    text: "text-gold",
    border: "border-gold",
    bg: "bg-gold",
    hex: "#C9A84C",
    description:
      "The founder's weekly letter. One idea, held up to the light, every Sunday.",
    cadence: "SUNDAYS",
  },
  qfrontline: {
    slug: "qfrontline",
    name: "QFrontline",
    text: "text-qf-signal",
    border: "border-qf-signal",
    bg: "bg-qf-signal",
    hex: "#FF2B5E",
    description:
      "Quantum technology for builders. The developer vertical inside Android Dreams — technical depth and the weekly Dev Brief.",
    cadence: "WEEKLY",
  },
};

/** The four magazine formats (QFrontline lives at its own vertical). */
export const MAGAZINE_FORMATS: FormatSlug[] = [
  "transmissions",
  "deep-read",
  "sci-fi-lens",
  "sunday-letter",
];

export const ALL_FORMATS: FormatSlug[] = [...MAGAZINE_FORMATS, "qfrontline"];

export function isFormatSlug(slug: string): slug is FormatSlug {
  return slug in FORMATS;
}

export function getFormat(slug: string): Format | null {
  return isFormatSlug(slug) ? FORMATS[slug] : null;
}

/** Resolve a post's format from its category slugs. */
export function formatFromCategories(categorySlugs: string[]): Format {
  for (const slug of categorySlugs) {
    if (isFormatSlug(slug)) return FORMATS[slug];
  }
  return FORMATS.transmissions;
}

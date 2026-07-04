// Presentation helpers shared across views.

import type { NodeType, RelType } from "./types";

export interface ConfidenceMeta {
  score: number;
  label: string;
  tone: "high" | "medium" | "low" | "unknown";
  meaning: string;
}

export function confidence(score: number | null | undefined): ConfidenceMeta {
  switch (score) {
    case 3:
      return { score: 3, label: "Explicit", tone: "high", meaning: "Stated in the title or abstract." };
    case 2:
      return { score: 2, label: "Implied", tone: "medium", meaning: "Strongly suggested by context." };
    case 1:
      return { score: 1, label: "Inferred", tone: "low", meaning: "Reasoned from domain knowledge — flagged for review." };
    default:
      return { score: 0, label: "Unscored", tone: "unknown", meaning: "No confidence recorded." };
  }
}

export const REL_VERB: Record<RelType, string> = {
  solves: "solves",
  uses: "uses",
  exhibits: "exhibits",
  good_for: "good for",
  applies_to: "applies to",
  variant_of: "variant of",
};

// Route base per node type — keeps URL construction in one place.
export const NODE_PATH: Record<NodeType, string> = {
  paper: "/papers",
  discoverable: "/problems",
  tool: "/tools",
  pattern: "/patterns",
};

export function href(type: NodeType, id: string): string {
  return `${NODE_PATH[type]}/${encodeURIComponent(id)}`;
}

export const NODE_LABEL: Record<NodeType, string> = {
  paper: "Resource",
  discoverable: "Problem",
  tool: "Tool",
  pattern: "Pattern",
};

// Short display id (strip the UL-XXX- prefix for compactness).
export function shortId(id: string): string {
  return id.replace(/^UL-(DIS|TOL|PAT|PAP)-/, "");
}

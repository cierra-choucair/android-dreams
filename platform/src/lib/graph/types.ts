// Types mirroring the graph.json contract (see src/data/schema.md).

export type NodeType = "paper" | "discoverable" | "tool" | "pattern";
export type RelType =
  | "solves"
  | "uses"
  | "exhibits"
  | "good_for"
  | "applies_to"
  | "variant_of";

export interface Domain {
  id: string;
  name: string;
  color: string;
}

export interface Paper {
  id: string;
  type: "paper";
  title: string;
  authors: string;
  year: number | null;
  venue: string;
  abstract: string;
  license: string;
  source_url: string;
  published_id: string;
  preprint_id: string;
  domain: string | null;
  labeled: boolean;
}

export interface Discoverable {
  id: string;
  type: "discoverable";
  statement: string;
  status: string;
  papers: string[];
  domains: string[];
}

export interface ToolRole {
  paper: string;
  role: string;
}

export interface Tool {
  id: string;
  type: "tool";
  name: string;
  papers: string[];
  roles: ToolRole[];
  domains: string[];
  notes: string[];
}

export interface PatternObservation {
  paper: string;
  discoverable: string;
  tool: string;
  text: string;
  source: string;
  confidence: number | null;
  notes: string;
}

export interface Pattern {
  id: string;
  type: "pattern";
  label: string;
  domains: string[];
  observations: PatternObservation[];
}

export interface Edge {
  rel: RelType;
  from: string;
  from_type: NodeType;
  to: string;
  to_type: NodeType;
  confidence?: number | null;
  source?: string;
  role?: string;
  via?: string;
  notes?: string;
}

export interface GraphMeta {
  source: string;
  note: string;
  counts: {
    papers: number;
    papers_labeled: number;
    discoverables: number;
    tools: number;
    patterns: number;
    edges: number;
  };
}

export interface Graph {
  meta: GraphMeta;
  domains: Domain[];
  papers: Paper[];
  discoverables: Discoverable[];
  tools: Tool[];
  patterns: Pattern[];
  edges: Edge[];
}

export type AnyNode = Paper | Discoverable | Tool | Pattern;

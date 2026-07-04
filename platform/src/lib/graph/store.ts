// GraphStore — the single seam between the app and the data.
//
// Its methods are shaped like Cypher traversals (nodes by id/label, edges in/
// out, edges by relationship type) so a Neo4jGraphStore / SupabaseGraphStore
// can implement the same interface later with zero UI changes. Nothing outside
// lib/graph should import graph.json directly.

import graphData from "@/data/graph.json";
import type {
  AnyNode,
  Discoverable,
  Domain,
  Edge,
  Graph,
  GraphMeta,
  NodeType,
  Paper,
  Pattern,
  RelType,
  Tool,
} from "./types";

export interface GraphStore {
  meta(): GraphMeta;
  domains(): Domain[];
  domain(id: string | null | undefined): Domain | undefined;

  papers(): Paper[];
  discoverables(): Discoverable[];
  tools(): Tool[];
  patterns(): Pattern[];

  paper(id: string): Paper | undefined;
  discoverable(id: string): Discoverable | undefined;
  tool(id: string): Tool | undefined;
  pattern(id: string): Pattern | undefined;
  node(type: NodeType, id: string): AnyNode | undefined;

  edges(): Edge[];
  edgesByRel(rel: RelType): Edge[];
  edgesFrom(id: string, rel?: RelType): Edge[];
  edgesTo(id: string, rel?: RelType): Edge[];
}

class InMemoryGraphStore implements GraphStore {
  private g: Graph;
  private byId = new Map<string, AnyNode>();
  private paperById = new Map<string, Paper>();
  private discById = new Map<string, Discoverable>();
  private toolById = new Map<string, Tool>();
  private patternById = new Map<string, Pattern>();
  private domainById = new Map<string, Domain>();
  private outByFrom = new Map<string, Edge[]>();
  private inByTo = new Map<string, Edge[]>();
  private byRel = new Map<RelType, Edge[]>();

  constructor(g: Graph) {
    this.g = g;
    for (const d of g.domains) this.domainById.set(d.id, d);
    for (const p of g.papers) {
      this.paperById.set(p.id, p);
      this.byId.set(p.id, p);
    }
    for (const d of g.discoverables) {
      this.discById.set(d.id, d);
      this.byId.set(d.id, d);
    }
    for (const t of g.tools) {
      this.toolById.set(t.id, t);
      this.byId.set(t.id, t);
    }
    for (const p of g.patterns) {
      this.patternById.set(p.id, p);
      this.byId.set(p.id, p);
    }
    for (const e of g.edges) {
      push(this.outByFrom, e.from, e);
      push(this.inByTo, e.to, e);
      push(this.byRel, e.rel, e);
    }
  }

  meta() {
    return this.g.meta;
  }
  domains() {
    return this.g.domains;
  }
  domain(id: string | null | undefined) {
    return id ? this.domainById.get(id) : undefined;
  }

  papers() {
    return this.g.papers;
  }
  discoverables() {
    return this.g.discoverables;
  }
  tools() {
    return this.g.tools;
  }
  patterns() {
    return this.g.patterns;
  }

  paper(id: string) {
    return this.paperById.get(id);
  }
  discoverable(id: string) {
    return this.discById.get(id);
  }
  tool(id: string) {
    return this.toolById.get(id);
  }
  pattern(id: string) {
    return this.patternById.get(id);
  }
  node(type: NodeType, id: string) {
    const n = this.byId.get(id);
    return n && n.type === type ? n : undefined;
  }

  edges() {
    return this.g.edges;
  }
  edgesByRel(rel: RelType) {
    return this.byRel.get(rel) ?? [];
  }
  edgesFrom(id: string, rel?: RelType) {
    const es = this.outByFrom.get(id) ?? [];
    return rel ? es.filter((e) => e.rel === rel) : es;
  }
  edgesTo(id: string, rel?: RelType) {
    const es = this.inByTo.get(id) ?? [];
    return rel ? es.filter((e) => e.rel === rel) : es;
  }
}

function push<K, V>(m: Map<K, V[]>, k: K, v: V) {
  const arr = m.get(k);
  if (arr) arr.push(v);
  else m.set(k, [v]);
}

// Module singleton — built once per server process.
export const store: GraphStore = new InMemoryGraphStore(
  graphData as unknown as Graph,
);

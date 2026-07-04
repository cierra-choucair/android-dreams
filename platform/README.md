# Universum Labs — Knowledge Graph Platform (MVP)

Problem-first exploration over the Universum Labs discovery substrate:
**problems → patterns → tools → resources**. This is the open-core public
explorer — the "first build" from the technical architecture proposal.

It lives in `platform/` as a self-contained Next.js app, deliberately separate
from the Android Dreams media site at the repo root.

## What it does

- **Start from a problem**, not a document. Every node is URL-addressable and
  navigable — no dead ends.
- **Patterns are the bridge.** A pattern is the structural reason a tool fit a
  problem; patterns that span domains let insight transfer between fields.
- **Evidence is always visible.** Every relationship carries a confidence
  (3 explicit / 2 implied / 1 inferred) and a source excerpt.
- **Opportunities** (`/gaps`) — the flagship. A tool proven for a pattern, a
  problem that exhibits the same pattern, and no link between them yet. Computed
  from structure alone: a classical-graph-analytics preview of the predictive
  (QNN) layer described in the vision.

## Architecture (and the decisions behind it)

Single Next.js App Router app — **no separate API service**. Server Components
and Route Handlers run the graph queries; a standalone API is only warranted
once a non-web consumer appears (client-hosted deployment, export customer, or
the QNN pipeline).

The graph is a **data model now, not yet a database**. At this scale the whole
graph fits in memory, so the MVP store is committed JSON seeded from the
labeling workbook — zero external services, deploys anywhere for free. Crucially
everything goes through the `GraphStore` interface (`src/lib/graph/store.ts`),
whose methods are shaped like Cypher traversals, so **Neo4j Aura / Supabase
slot in later behind the same interface with no UI changes.**

```
platform/
  ingest/build_graph.py      # xlsx → graph.json (offline; derives edges from FKs)
  src/data/graph.json        # committed seed (regenerate: npm run ingest)
  src/data/schema.md         # the data contract
  src/lib/graph/
    types.ts                 # graph.json types
    store.ts                 # GraphStore interface + in-memory impl (the seam)
    queries.ts               # sensemaking queries + the gap finder
    format.ts                # confidence / routing / labels
  src/components/            # ui primitives, node cards, focused SVG graph
  src/app/                   # /, /problems, /patterns, /tools, /papers, /gaps
```

## Develop

```bash
cd platform
npm install
npm run dev        # http://localhost:3000

npm run ingest     # rebuild graph.json from the workbook (needs python3 + openpyxl,
                   #   and UL_WORKBOOK pointing at the .xlsx)
npm run build      # production build
```

The seed `graph.json` is committed, so `dev`/`build` work without Python or the
source workbook — ingest is only needed to re-seed.

## The seed data

~20 quantum papers, 6 fully labeled into graph structure across 6 domains
(chaotic dynamics, quantum chemistry, optimization, machine learning, sensing,
hardware/QEC). The `Relationships` tab in the workbook is an unfinished stub;
ingest derives the true edge list from the foreign keys in the other tabs. See
`src/data/schema.md`.

## Roadmap slots (already seamed, not yet built)

- **Neo4j / Supabase** behind `GraphStore` — swap the backing store.
- **Accounts & workspaces** (Supabase Auth) — Phase 2.
- **Client overlays** (ITU-style branded/readiness layers) — the reusable core
  stays put; overlays layer on top.
- **Prediction** — the gap finder is the classical baseline; the QNN layer
  consumes the same relational structure.

#!/usr/bin/env python3
"""
Universum Labs — knowledge graph ingest.

Reads the labeling workbook (UL_Dataset_Labeling) and emits a single
graph.json that the platform app loads at build/request time.

Why this exists (read before editing):
  - The workbook's `Relationships` tab is a stub (4 example rows using short
    IDs like D-001 for a paper that isn't even in the Papers tab). The REAL
    edge list is implicit in the foreign keys of the other tabs, so we DERIVE
    it here rather than trusting that tab.
  - Nodes are shared: the same Discoverable_ID / Tool_ID / Pattern_Obs_ID
    recurs across papers. We dedup into single nodes and attach evidence
    (source excerpts + confidence) to the EDGES, where it belongs.
  - `Topics` are defined in the Reference tab but never populated, so we assign
    a lightweight editorial `domain` per paper (the ~6 clusters actually
    present) so cross-domain pattern bridges are visibly cross-domain.

Output contract: see platform/src/data/schema.md
Run: python3 platform/ingest/build_graph.py
"""
import json
import os
import re
from collections import defaultdict, OrderedDict

HERE = os.path.dirname(os.path.abspath(__file__))
# The source workbook lives outside the repo (uploaded asset). Allow override.
WORKBOOK = os.environ.get(
    "UL_WORKBOOK",
    "/root/.claude/uploads/c1cee431-bf61-50d3-979f-4fb5812e28f9/540938bb-UL_Dataset_Labeling_updated_may_1.xlsx",
)
OUT = os.path.join(HERE, "..", "src", "data", "graph.json")

# --- Editorial layer -------------------------------------------------------
# Domains: the clusters actually present in the seed. Colors are the platform
# palette (see globals.css). Kept here so ingest is the single source of truth.
DOMAINS = OrderedDict([
    ("chaotic-dynamics",   {"name": "Chaotic Dynamics & Forecasting", "color": "#5EC8E5"}),
    ("quantum-chemistry",  {"name": "Quantum Chemistry",              "color": "#8B7FE8"}),
    ("optimization",       {"name": "Combinatorial Optimization",     "color": "#E8A24A"}),
    ("machine-learning",   {"name": "Machine Learning",               "color": "#4AD6A0"}),
    ("sensing-metrology",  {"name": "Quantum Sensing & Metrology",    "color": "#E86A8E"}),
    ("hardware-qec",       {"name": "Hardware & Error Correction",    "color": "#B0B8C4"}),
])

# Paper (short uuid prefix) -> domain. Covers all 20 seeded papers.
PAPER_DOMAIN = {
    "c14bba2d": "chaotic-dynamics",  "672ea550": "chaotic-dynamics",
    "1fcd1304": "chaotic-dynamics",  "a519ef69": "chaotic-dynamics",
    "9de305b9": "quantum-chemistry", "d74fa952": "quantum-chemistry",
    "014b3e0d": "quantum-chemistry",
    "e670f00d": "optimization",      "ddfa6d2e": "optimization",
    "950e8481": "optimization",
    "4219f3e8": "machine-learning",  "28f80db5": "machine-learning",
    "d42e9a51": "machine-learning",
    "92c535f6": "sensing-metrology", "0e7fb12d": "sensing-metrology",
    "8b1f02f1": "sensing-metrology", "a808d33d": "sensing-metrology",
    "2ee6a916": "hardware-qec",      "1b7d1b81": "hardware-qec",
    "0b29da69": "hardware-qec",
}

# Curated short labels for the 11 patterns. Phase-1 the workbook is plain
# language only (no controlled vocab), so these are human-authored summaries
# of each pattern node — exactly the manual curation Principle 3 expects.
PATTERN_LABELS = {
    "UL-PAT-46f9e1ab": "Chaotic forecasting via high-dimensional state expansion",
    "UL-PAT-7d635a1f": "High-dimensional dynamics create a reservoir-scaling bottleneck",
    "UL-PAT-2b8db201": "Expressive power constrained by near-term hardware cost",
    "UL-PAT-6be17195": "Preserve attractor geometry beyond the forecast horizon",
    "UL-PAT-82738aea": "Exponential state space favors direct quantum representation",
    "UL-PAT-e864e7f7": "Symmetry removes redundant operators and circuit depth",
    "UL-PAT-d1a15afb": "Scalable simulation needs local qubit-operator decomposition",
    "UL-PAT-42c8b058": "Hard constraints define a feasible subspace",
    "UL-PAT-cf253e4a": "Constraint-as-conservation-law is fragile under noise",
    "UL-PAT-1bedff02": "Nonlinear embedding separates high-dimensional classes",
    "UL-PAT-daae8340": "Real-world data validation gap vs. synthetic benchmarks",
}

# --- Workbook reading ------------------------------------------------------
import openpyxl  # noqa: E402


def clean(v):
    if v is None:
        return ""
    return re.sub(r"\s+", " ", str(v)).strip()


def short(pid):
    """UL-PAP-c14bba2d-... -> c14bba2d ; short prefix for a pattern id key."""
    m = re.match(r"(UL-(?:PAP|DIS|TOL|PAT)-[0-9a-f]{8})", pid)
    return m.group(1) if m else pid


def paper_key(pid):
    m = re.search(r"UL-PAP-([0-9a-f]{8})", pid)
    return m.group(1) if m else pid


def rows_by_header(ws):
    raw = list(ws.iter_rows(values_only=True))
    hdr_idx = next(i for i, r in enumerate(raw) if any(c == "Paper_ID" for c in r if c))
    header = [clean(c) for c in raw[hdr_idx]]
    out = []
    for r in raw[hdr_idx + 1:]:
        if not any(v is not None and clean(v) for v in r):
            continue
        out.append({h: clean(v) for h, v in zip(header, r) if h})
    return out


def conf(v):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return None


def domain_of_paper(pid):
    return PAPER_DOMAIN.get(paper_key(pid))


def main():
    wb = openpyxl.load_workbook(WORKBOOK, data_only=True)
    papers_rows = rows_by_header(wb["Papers"])
    disc_rows = rows_by_header(wb["Discoverables"])
    tool_rows = rows_by_header(wb["Tools"])
    pat_rows = rows_by_header(wb["Patterns"])

    # ---- Papers (resources) ----
    papers = OrderedDict()
    for r in papers_rows:
        pid = paper_key(r["Paper_ID"])
        if not pid:
            continue
        papers[pid] = {
            "id": pid,
            "type": "paper",
            "title": r.get("Title", ""),
            "authors": r.get("Authors", ""),
            "year": conf(r.get("Year")),
            "venue": r.get("Venue", ""),
            "abstract": r.get("Abstract_Text", ""),
            "license": r.get("License", ""),
            "source_url": r.get("Source_URL", ""),
            "published_id": r.get("Published_ID", "") if r.get("Published_ID") != "null" else "",
            "preprint_id": r.get("Preprint_ID", "") if r.get("Preprint_ID") != "null" else "",
            "domain": PAPER_DOMAIN.get(pid),
            "labeled": False,  # set True below if it yields graph structure
        }

    # ---- Discoverables (problems) ----
    discs = OrderedDict()
    for r in disc_rows:
        did = short(r["Discoverable_ID"])
        pk = paper_key(r["Paper_ID"])
        d = discs.setdefault(did, {
            "id": did, "type": "discoverable",
            "statement": r.get("Statement", ""),
            "status": r.get("Status", ""),
            "papers": [], "domains": set(),
        })
        if pk and pk not in d["papers"]:
            d["papers"].append(pk)
            dom = domain_of_paper(r["Paper_ID"])
            if dom:
                d["domains"].add(dom)

    # ---- Tools ----
    tools = OrderedDict()
    for r in tool_rows:
        tid = short(r["Tool_ID"])
        pk = paper_key(r["Paper_ID"])
        t = tools.setdefault(tid, {
            "id": tid, "type": "tool",
            "name": r.get("Tool_Name", ""),
            "papers": [], "roles": [], "domains": set(),
            "notes": [],
        })
        if pk not in t["papers"]:
            t["papers"].append(pk)
            dom = domain_of_paper(r["Paper_ID"])
            if dom:
                t["domains"].add(dom)
        t["roles"].append({"paper": pk, "role": r.get("Role", "")})
        note = r.get("Reviewer_Notes", "")
        if note:
            t["notes"].append(note)

    # ---- Patterns ----
    patterns = OrderedDict()
    for r in pat_rows:
        pid = short(r["Pattern_Obs_ID"])
        p = patterns.setdefault(pid, {
            "id": pid, "type": "pattern",
            "label": PATTERN_LABELS.get(pid, ""),
            "observations": [], "domains": set(),
        })
        pk = paper_key(r["Paper_ID"])
        dom = domain_of_paper(r["Paper_ID"])
        if dom:
            p["domains"].add(dom)
        p["observations"].append({
            "paper": pk,
            "discoverable": short(r.get("Related_Discoverable_ID", "")),
            "tool": short(r.get("Related_Tool_ID", "")),
            "text": r.get("Plain_Language_Description", ""),
            "source": r.get("Source_Sentence", ""),
            "confidence": conf(r.get("Confidence")),
            "notes": r.get("Reviewer_Notes", ""),
        })

    # ---- Derive edges ----
    edges = []

    def add(rel, a, at, b, bt, **kw):
        edges.append({"rel": rel, "from": a, "from_type": at,
                      "to": b, "to_type": bt, **kw})

    # solves: paper -> discoverable
    for r in disc_rows:
        pk, did = paper_key(r["Paper_ID"]), short(r["Discoverable_ID"])
        if pk in papers and did in discs:
            papers[pk]["labeled"] = True
            add("solves", pk, "paper", did, "discoverable",
                confidence=conf(r.get("Confidence")),
                source=r.get("Source_Excerpt", ""))

    # uses: paper -> tool
    for r in tool_rows:
        pk, tid = paper_key(r["Paper_ID"]), short(r["Tool_ID"])
        if pk in papers and tid in tools:
            papers[pk]["labeled"] = True
            add("uses", pk, "paper", tid, "tool",
                confidence=conf(r.get("Confidence")),
                role=r.get("Role", ""),
                source=r.get("Source_Sentence", ""))

    # exhibits (disc->pattern), good_for (tool->pattern), applies_to (tool->disc)
    # all derived from the Pattern observation rows. Dedup, keep best confidence.
    def best(store, key, cand):
        cur = store.get(key)
        if cur is None or (cand.get("confidence") or 0) > (cur.get("confidence") or 0):
            store[key] = cand

    exhibits, good_for, applies = {}, {}, {}
    for r in pat_rows:
        pat = short(r["Pattern_Obs_ID"])
        did = short(r.get("Related_Discoverable_ID", ""))
        tid = short(r.get("Related_Tool_ID", ""))
        c = conf(r.get("Confidence"))
        src = r.get("Source_Sentence", "")
        if did in discs and pat in patterns:
            best(exhibits, (did, pat), {"confidence": c, "source": src})
        if tid in tools and pat in patterns:
            best(good_for, (tid, pat), {"confidence": c, "source": src})
        if tid in tools and did in discs:
            best(applies, (tid, did), {"confidence": c, "source": src, "via": pat})

    for (did, pat), m in exhibits.items():
        add("exhibits", did, "discoverable", pat, "pattern", **m)
    for (tid, pat), m in good_for.items():
        add("good_for", tid, "tool", pat, "pattern", **m)
    for (tid, did), m in applies.items():
        add("applies_to", tid, "tool", did, "discoverable", **m)

    # variant_of: tool lineage from reviewer notes ("Variant of <Tool>")
    name_to_id = {t["name"].lower(): t["id"] for t in tools.values() if t["name"]}
    for t in tools.values():
        for note in t["notes"]:
            m = re.search(r"variant of ([^;.\(]+(?:\([^)]*\))?)", note, re.I)
            if not m:
                continue
            cand = m.group(1).strip().lower()
            for nm, tid in name_to_id.items():
                if tid != t["id"] and nm and nm in cand:
                    if not any(e["rel"] == "variant_of" and e["from"] == t["id"]
                               and e["to"] == tid for e in edges):
                        add("variant_of", t["id"], "tool", tid, "tool")
                    break

    # ---- Finalize (sets -> sorted lists) ----
    def fin(d):
        d = dict(d)
        d["domains"] = sorted(d["domains"])
        return d

    graph = {
        "meta": {
            "source": os.path.basename(WORKBOOK),
            "note": "Edges derived from workbook foreign keys; Relationships tab is a stub and is not used.",
            "counts": {
                "papers": len(papers),
                "papers_labeled": sum(1 for p in papers.values() if p["labeled"]),
                "discoverables": len(discs),
                "tools": len(tools),
                "patterns": len(patterns),
                "edges": len(edges),
            },
        },
        "domains": [{"id": k, **v} for k, v in DOMAINS.items()],
        "papers": [p for p in papers.values()],
        "discoverables": [fin(d) for d in discs.values()],
        "tools": [fin(t) for t in tools.values()],
        "patterns": [
            {**{k: v for k, v in fin(p).items() if k != "observations"},
             "observations": p["observations"]}
            for p in patterns.values()
        ],
        "edges": edges,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(graph, f, indent=2, ensure_ascii=False)

    c = graph["meta"]["counts"]
    print(f"Wrote {OUT}")
    print(f"  papers={c['papers']} (labeled {c['papers_labeled']}), "
          f"discoverables={c['discoverables']}, tools={c['tools']}, "
          f"patterns={c['patterns']}, edges={c['edges']}")
    rels = defaultdict(int)
    for e in edges:
        rels[e["rel"]] += 1
    print("  edges by type: " + ", ".join(f"{k}={v}" for k, v in sorted(rels.items())))


if __name__ == "__main__":
    main()

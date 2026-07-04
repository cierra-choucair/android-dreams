import type { Neighborhood } from "@/lib/graph/queries";
import type { RelType } from "@/lib/graph/types";
import { href, NODE_PATH } from "@/lib/graph/format";
import { TYPE_COLOR, TYPE_NAME } from "./ui";

const REL_COLOR: Record<string, string> = {
  solves: "#4AD6A0",
  uses: "#5EC8E5",
  exhibits: "#E8A24A",
  good_for: "#8B7FE8",
  applies_to: "#E86A8E",
  variant_of: "#9AA3B4",
};

const REL_LABEL: Record<string, string> = {
  solves: "solves",
  uses: "uses",
  exhibits: "exhibits",
  good_for: "good for",
  applies_to: "applies to",
  variant_of: "variant of",
};

function truncate(s: string, n = 26): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

/**
 * Focused local graph: the center node and its direct neighbors on a ring.
 * Deterministic radial layout, pure SVG, server-rendered — a map of the
 * node's immediate context, not a global hairball. Neighbors link out.
 */
export function LocalGraph({ hood }: { hood: Neighborhood }) {
  const W = 800;
  const H = 520;
  const cx = W / 2;
  const cy = H / 2;
  const n = hood.nodes.length;
  const R = n <= 6 ? 165 : n <= 10 ? 185 : 200;

  // Which relation connects center to each neighbor (for edge color).
  const relOf = new Map<string, RelType>();
  for (const l of hood.links) {
    const other = l.from === hood.center.id ? l.to : l.from;
    if (!relOf.has(other)) relOf.set(other, l.rel as RelType);
  }

  const placed = hood.nodes.map((node, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(n, 1);
    const x = cx + R * Math.cos(a);
    const y = cy + R * Math.sin(a);
    const cos = Math.cos(a);
    const anchor: "start" | "end" | "middle" =
      cos > 0.25 ? "start" : cos < -0.25 ? "end" : "middle";
    const lx = x + (anchor === "start" ? 12 : anchor === "end" ? -12 : 0);
    const ly = y + (Math.sin(a) > 0.5 ? 16 : Math.sin(a) < -0.5 ? -10 : 4);
    return { node, x, y, lx, ly, anchor, rel: relOf.get(node.id) };
  });

  const relsPresent = [...new Set(hood.links.map((l) => l.rel))];

  if (n === 0) {
    return (
      <div className="card p-6 text-center text-sm text-ink-faint">
        No connections yet — this node is cataloged but not yet linked in the
        graph.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Local knowledge graph">
        {/* edges */}
        {placed.map((p) => (
          <line
            key={`e-${p.node.id}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={REL_COLOR[p.rel ?? "uses"] ?? "#334"}
            strokeOpacity={0.45}
            strokeWidth={1.4}
          />
        ))}

        {/* neighbor nodes */}
        {placed.map((p) => (
          <a key={p.node.id} href={href(p.node.type, p.node.id)}>
            <title>{`${TYPE_NAME[p.node.type]}: ${p.node.label}`}</title>
            <circle
              cx={p.x}
              cy={p.y}
              r={7}
              fill="#0A0D13"
              stroke={TYPE_COLOR[p.node.type]}
              strokeWidth={2.5}
            />
            {p.node.domainColor && (
              <circle cx={p.x} cy={p.y} r={3} fill={p.node.domainColor} />
            )}
            <text
              x={p.lx}
              y={p.ly}
              textAnchor={p.anchor}
              className="fill-ink-dim"
              style={{ fontSize: 11 }}
            >
              {truncate(p.node.label)}
            </text>
          </a>
        ))}

        {/* center node */}
        <circle cx={cx} cy={cy} r={13} fill={TYPE_COLOR[hood.center.type]} fillOpacity={0.18} />
        <circle cx={cx} cy={cy} r={7.5} fill={TYPE_COLOR[hood.center.type]} />
        <text
          x={cx}
          y={cy + 26}
          textAnchor="middle"
          className="fill-ink"
          style={{ fontSize: 11, fontWeight: 600 }}
        >
          {truncate(hood.center.label, 34)}
        </text>
      </svg>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-4 py-2.5 text-[0.7rem] text-ink-faint">
        {relsPresent.map((r) => (
          <span key={r} className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded" style={{ backgroundColor: REL_COLOR[r] }} />
            {REL_LABEL[r] ?? r}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-3">
          {(Object.keys(NODE_PATH) as (keyof typeof NODE_PATH)[]).map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: TYPE_COLOR[t] }} />
              {TYPE_NAME[t]}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

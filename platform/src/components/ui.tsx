import Link from "next/link";
import type { Domain, NodeType } from "@/lib/graph/types";
import { confidence } from "@/lib/graph/format";
import { store } from "@/lib/graph/store";

export const TYPE_COLOR: Record<NodeType, string> = {
  discoverable: "#E8A24A",
  tool: "#5EC8E5",
  pattern: "#8B7FE8",
  paper: "#9AA3B4",
};

export const TYPE_NAME: Record<NodeType, string> = {
  discoverable: "Problem",
  tool: "Tool",
  pattern: "Pattern",
  paper: "Resource",
};

export function TypeBadge({ type }: { type: NodeType }) {
  return (
    <span className="chip border-line bg-surface text-ink-dim">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: TYPE_COLOR[type] }}
      />
      {TYPE_NAME[type]}
    </span>
  );
}

export function DomainChip({ domain, size = "sm" }: { domain: Domain; size?: "sm" | "xs" }) {
  return (
    <span
      className={`chip border-transparent ${size === "xs" ? "px-2 py-0" : ""}`}
      style={{
        backgroundColor: `${domain.color}1a`,
        color: domain.color,
        borderColor: `${domain.color}40`,
      }}
      title={domain.name}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
      {domain.name}
    </span>
  );
}

const CONF_TONE: Record<string, string> = {
  high: "border-rel-solves/40 bg-rel-solves/10 text-rel-solves",
  medium: "border-rel-exhibits/40 bg-rel-exhibits/10 text-rel-exhibits",
  low: "border-ink-faint/40 bg-ink-faint/10 text-ink-dim",
  unknown: "border-line bg-surface text-ink-faint",
};

export function ConfidenceChip({ score }: { score: number | null | undefined }) {
  const c = confidence(score);
  return (
    <span
      className={`chip ${CONF_TONE[c.tone]}`}
      title={`Confidence ${c.score || "—"}: ${c.meaning}`}
    >
      {c.score ? `${c.score} · ` : ""}
      {c.label}
    </span>
  );
}

export function SectionHeading({
  children,
  count,
  hint,
}: {
  children: React.ReactNode;
  count?: number;
  hint?: string;
}) {
  return (
    <div className="mb-3 flex items-baseline gap-2 border-b border-line-soft pb-2">
      <h2 className="text-sm font-semibold tracking-tight text-ink">{children}</h2>
      {count !== undefined && <span className="kbd">{count}</span>}
      {hint && <span className="ml-auto text-xs text-ink-faint">{hint}</span>}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-2">{children}</p>;
}

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-line">/</span>}
          {it.href ? (
            <Link href={it.href} className="hover:text-ink-dim">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink-dim">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function StatTile({ value, label, accent }: { value: React.ReactNode; label: string; accent?: string }) {
  return (
    <div className="card px-4 py-3">
      <div className="text-2xl font-semibold tracking-tight" style={accent ? { color: accent } : undefined}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-ink-dim">{label}</div>
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-line bg-surface/40 px-4 py-3 text-sm text-ink-faint">
      {children}
    </p>
  );
}

/** Domain chip-row filter used on the Problems and Resources indexes. */
export function DomainFilter({ active, base }: { active?: string; base: string }) {
  const domains = store.domains();
  return (
    <div className="flex flex-wrap gap-1.5">
      <Link
        href={base}
        className={`chip ${
          !active
            ? "border-brand-dim bg-brand/10 text-brand"
            : "border-line bg-surface text-ink-dim"
        }`}
      >
        All
      </Link>
      {domains.map((d) => (
        <Link
          key={d.id}
          href={`${base}?domain=${d.id}`}
          className="chip"
          style={
            active === d.id
              ? { backgroundColor: `${d.color}22`, color: d.color, borderColor: `${d.color}66` }
              : { backgroundColor: "transparent", color: "#9AA3B4", borderColor: "#232B3B" }
          }
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: d.color }} />
          {d.name}
        </Link>
      ))}
    </div>
  );
}

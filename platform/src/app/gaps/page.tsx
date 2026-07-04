import Link from "next/link";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { findGaps } from "@/lib/graph/queries";
import { Eyebrow, StatTile } from "@/components/ui";
import { OpportunityCard } from "@/components/opportunity";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Directions the graph suggests but no one has taken — a tool proven for a pattern, a problem that exhibits it, and no link between them yet.",
};

export default function GapsPage({ searchParams }: { searchParams: { cross?: string } }) {
  const crossOnly = searchParams.cross === "1";
  const all = findGaps(store);
  const list = crossOnly ? all.filter((g) => g.crossDomain) : all;
  const crossCount = all.filter((g) => g.crossDomain).length;

  return (
    <div className="space-y-8">
      <header>
        <Eyebrow>Directions not yet taken</Eyebrow>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Opportunities</h1>
        <p className="mt-2 max-w-reading text-sm text-ink-dim">
          Each of these is computed from graph structure alone: a tool that is
          <span className="text-rel-good"> good for a pattern</span>, a problem
          that <span className="text-rel-exhibits">exhibits that same pattern</span>,
          and <span className="text-ink">no one has connected them yet</span>.
          When the tool and problem live in different fields, it&apos;s a
          candidate for cross-domain transfer. These are prompts for human
          judgment — not claims — and a classical-analytics preview of the
          predictive layer to come.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile value={all.length} label="total opportunities" accent="#A9B4FF" />
        <StatTile value={crossCount} label="cross-domain" accent="#A9B4FF" />
        <StatTile value={store.patterns().filter((p) => p.domains.length > 1).length} label="bridge patterns" accent="#8B7FE8" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href="/gaps"
          className={`chip ${!crossOnly ? "border-brand-dim bg-brand/10 text-brand" : "border-line bg-surface text-ink-dim"}`}
        >
          All ({all.length})
        </Link>
        <Link
          href="/gaps?cross=1"
          className={`chip ${crossOnly ? "border-brand-dim bg-brand/10 text-brand" : "border-line bg-surface text-ink-dim"}`}
        >
          ↔ Cross-domain only ({crossCount})
        </Link>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {list.map((g) => (
          <OpportunityCard key={`${g.tool.id}-${g.discoverable.id}`} opp={g} />
        ))}
      </div>
    </div>
  );
}

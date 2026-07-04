import Link from "next/link";
import type { Opportunity } from "@/lib/graph/queries";
import { href } from "@/lib/graph/format";
import { ConfidenceChip, DomainChip } from "./ui";

/**
 * A gap/opportunity: a tool that is good for a pattern a problem exhibits, but
 * hasn't been applied to that problem yet. Framed as a *suggested direction*,
 * never an assertion — the whole point is human-in-the-loop.
 */
export function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center gap-2">
        {opp.crossDomain ? (
          <span className="chip border-brand-dim/50 bg-brand/10 text-brand">
            ↔ Cross-domain
          </span>
        ) : (
          <span className="chip border-line bg-surface text-ink-dim">Same domain</span>
        )}
        <ConfidenceChip score={opp.strength} />
        <span className="ml-auto text-[0.7rem] text-ink-faint">
          {opp.patterns.length} shared pattern{opp.patterns.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Link href={href("tool", opp.tool.id)} className="group min-w-0">
          <div className="text-[0.66rem] uppercase tracking-wider text-rel-uses">Tool</div>
          <div className="truncate text-sm text-ink group-hover:text-brand group-hover:underline">
            {opp.tool.name}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {opp.toolDomains.map((d) => (
              <DomainChip key={d.id} domain={d} size="xs" />
            ))}
          </div>
        </Link>

        <div className="flex flex-col items-center text-ink-faint" aria-hidden>
          <span className="text-[0.6rem] uppercase tracking-wider">might apply to</span>
          <span className="text-lg leading-none">→</span>
        </div>

        <Link href={href("discoverable", opp.discoverable.id)} className="group min-w-0">
          <div className="text-[0.66rem] uppercase tracking-wider text-rel-exhibits">Problem</div>
          <div className="line-clamp-2 text-sm text-ink group-hover:text-brand">
            {opp.discoverable.statement}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {opp.discDomains.map((d) => (
              <DomainChip key={d.id} domain={d} size="xs" />
            ))}
          </div>
        </Link>
      </div>

      <div className="mt-3 border-t border-line-soft pt-2.5">
        <span className="eyebrow">Because both connect to</span>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {opp.patterns.map((p) => (
            <Link
              key={p.id}
              href={href("pattern", p.id)}
              className="text-xs text-rel-good hover:underline"
            >
              ◇ {p.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

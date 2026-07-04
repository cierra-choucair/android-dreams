import Link from "next/link";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { href } from "@/lib/graph/format";
import { DomainChip, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Patterns" };

export default function PatternsIndex() {
  const patterns = [...store.patterns()].sort(
    (a, b) => b.domains.length - a.domains.length,
  );

  return (
    <div className="space-y-6">
      <header>
        <Eyebrow>The bridge between domains</Eyebrow>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Patterns</h1>
        <p className="mt-2 max-w-reading text-sm text-ink-dim">
          The structural reason a tool fits a problem. Patterns are what let
          insight transfer between fields that look unrelated on the surface —
          the ones spanning multiple domains are the bridges.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {patterns.map((p) => {
          const exhibits = store.edgesTo(p.id, "exhibits").length;
          const goodFor = store.edgesTo(p.id, "good_for").length;
          const bridge = p.domains.length > 1;
          return (
            <Link key={p.id} href={href("pattern", p.id)} className="card card-hover p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-[0.66rem] uppercase tracking-wider text-rel-good">◇ Pattern</span>
                {bridge && (
                  <span className="chip border-brand-dim/50 bg-brand/10 text-brand">↔ Bridge</span>
                )}
              </div>
              <p className="text-sm leading-snug text-ink">{p.label}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.domains.map((x) => {
                  const dm = store.domain(x);
                  return dm ? <DomainChip key={x} domain={dm} size="xs" /> : null;
                })}
              </div>
              <div className="mt-2 text-[0.7rem] text-ink-faint">
                {exhibits} problem{exhibits === 1 ? "" : "s"} · {goodFor} tool{goodFor === 1 ? "" : "s"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

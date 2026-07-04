import Link from "next/link";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { href } from "@/lib/graph/format";
import { DomainChip, DomainFilter, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Resources" };

export default function PapersIndex({
  searchParams,
}: {
  searchParams: { domain?: string };
}) {
  const active = searchParams.domain;
  const all = [...store.papers()].sort((a, b) => {
    if (a.labeled !== b.labeled) return a.labeled ? -1 : 1;
    return (b.year ?? 0) - (a.year ?? 0);
  });
  const list = active ? all.filter((p) => p.domain === active) : all;

  return (
    <div className="space-y-6">
      <header>
        <Eyebrow>The evidence</Eyebrow>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Resources</h1>
        <p className="mt-2 max-w-reading text-sm text-ink-dim">
          Papers and results — the anchor every relationship traces back to.
          Labeled resources are decomposed into problems, tools, and patterns;
          the rest are cataloged and awaiting labeling.
        </p>
      </header>

      <DomainFilter active={active} base="/papers" />

      <div className="space-y-2.5">
        {list.map((p) => {
          const dm = store.domain(p.domain);
          return (
            <Link
              key={p.id}
              href={href("paper", p.id)}
              className="card card-hover flex flex-col gap-1.5 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-ink">{p.title}</p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {p.authors} · {p.venue} · {p.year}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {dm && <DomainChip domain={dm} size="xs" />}
                {p.labeled ? (
                  <span className="chip border-rel-solves/40 bg-rel-solves/10 text-rel-solves">Labeled</span>
                ) : (
                  <span className="chip border-line bg-surface text-ink-faint">Cataloged</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

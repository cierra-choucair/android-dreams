import Link from "next/link";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { href } from "@/lib/graph/format";
import { DomainChip, DomainFilter, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Problems" };

export default function ProblemsIndex({
  searchParams,
}: {
  searchParams: { domain?: string };
}) {
  const active = searchParams.domain;
  const all = store.discoverables();
  const list = active ? all.filter((d) => d.domains.includes(active)) : all;

  return (
    <div className="space-y-6">
      <header>
        <Eyebrow>The object of curiosity</Eyebrow>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Problems</h1>
        <p className="mt-2 max-w-reading text-sm text-ink-dim">
          Open questions, framed as challenges. The primary entry point —
          discovery starts from what we want to understand, not from a document.
        </p>
      </header>

      <DomainFilter active={active} base="/problems" />

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((d) => (
          <Link key={d.id} href={href("discoverable", d.id)} className="card card-hover p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-[0.66rem] uppercase tracking-wider text-rel-exhibits">Problem</span>
              {d.status && <span className="text-[0.7rem] text-ink-faint">· {d.status}</span>}
            </div>
            <p className="text-sm leading-snug text-ink">{d.statement}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {d.domains.map((x) => {
                const dm = store.domain(x);
                return dm ? <DomainChip key={x} domain={dm} size="xs" /> : null;
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

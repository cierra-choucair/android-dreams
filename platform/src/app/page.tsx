import Link from "next/link";
import { store } from "@/lib/graph/store";
import { findGaps, overview } from "@/lib/graph/queries";
import { href } from "@/lib/graph/format";
import { DomainChip, Eyebrow, SectionHeading, StatTile, TYPE_COLOR } from "@/components/ui";
import { OpportunityCard } from "@/components/opportunity";

const MODEL = [
  {
    type: "discoverable" as const,
    name: "Problems",
    sub: "The object of curiosity",
    body: "Open questions, framed as challenges. Discovery starts here — not with papers.",
  },
  {
    type: "pattern" as const,
    name: "Patterns",
    sub: "The bridge between domains",
    body: "The structural reason a tool fit a problem — what lets insight transfer across fields.",
  },
  {
    type: "tool" as const,
    name: "Tools",
    sub: "The means of engagement",
    body: "Portable methods and techniques, tracked by where they work and why.",
  },
  {
    type: "paper" as const,
    name: "Resources",
    sub: "The evidence",
    body: "Papers and results — every relationship traces back to a source you can read.",
  },
];

export default function Home() {
  const ov = overview(store);
  const c = ov.meta.counts;
  const topGaps = findGaps(store)
    .filter((g) => g.crossDomain)
    .slice(0, 3);

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="pt-6">
        <Eyebrow>Discovery infrastructure · frontier science</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          Problems, not papers.
        </h1>
        <p className="mt-4 max-w-reading text-lg leading-relaxed text-ink-dim">
          A structured map of how frontier science connects — problems,
          the patterns beneath them, the tools that engage them, and the
          evidence behind every link. Not a search engine. A place to see
          the state of the art, trace <em>why</em> a method worked, and find
          the directions structure suggests but no one has taken yet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/problems"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-void transition-opacity hover:opacity-90"
          >
            Start from a problem →
          </Link>
          <Link
            href="/gaps"
            className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-dim"
          >
            See the opportunities
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile value={`${c.papers_labeled}/${c.papers}`} label="resources mapped" accent="#9AA3B4" />
        <StatTile value={c.discoverables} label="problems" accent={TYPE_COLOR.discoverable} />
        <StatTile value={c.patterns} label="patterns" accent={TYPE_COLOR.pattern} />
        <StatTile value={c.tools} label="tools" accent={TYPE_COLOR.tool} />
        <StatTile value={c.edges} label="relationships" accent="#A9B4FF" />
      </section>

      {/* The model */}
      <section>
        <SectionHeading hint="the shared language between human, AI, and quantum inference">
          How the graph is built
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MODEL.map((m) => (
            <div key={m.type} className="card p-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TYPE_COLOR[m.type] }} />
                <span className="text-sm font-semibold text-ink">{m.name}</span>
              </div>
              <div className="mt-0.5 text-xs font-medium text-ink-faint">{m.sub}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-domain bridges */}
      <section>
        <SectionHeading count={ov.bridges.length} hint="patterns that recur across fields">
          Where domains meet
        </SectionHeading>
        <p className="mb-4 max-w-reading text-sm text-ink-dim">
          The same structural pattern can surface in problems that look
          unrelated. These are the bridges — follow one to see a method from
          one field illuminate a problem in another.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ov.bridges.map((b) => (
            <Link key={b.pattern.id} href={href("pattern", b.pattern.id)} className="card card-hover p-4">
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-rel-good">
                  ◇ Pattern
                </span>
              </div>
              <p className="mt-1 text-sm text-ink">{b.pattern.label}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {b.domains.map((d, i) => (
                  <span key={d.id} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-ink-faint">·</span>}
                    <DomainChip domain={d} size="xs" />
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Opportunities teaser */}
      <section>
        <SectionHeading hint={`${ov.crossDomainGaps} cross-domain of ${ov.totalGaps} total`}>
          Directions not yet taken
        </SectionHeading>
        <p className="mb-4 max-w-reading text-sm text-ink-dim">
          Computed from structure alone: a tool proven for a pattern, a problem
          that exhibits the same pattern, and no one has connected them yet. A
          classical-analytics preview of the predictive layer to come.
        </p>
        <div className="grid gap-3 lg:grid-cols-3">
          {topGaps.map((g) => (
            <OpportunityCard key={`${g.tool.id}-${g.discoverable.id}`} opp={g} />
          ))}
        </div>
        <div className="mt-4">
          <Link href="/gaps" className="text-sm text-brand hover:underline">
            All {ov.totalGaps} opportunities →
          </Link>
        </div>
      </section>

      {/* Domains */}
      <section>
        <SectionHeading count={ov.domains.length}>Domains in the seed</SectionHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ov.domains.map((d) => (
            <Link
              key={d.domain.id}
              href={`/problems?domain=${d.domain.id}`}
              className="card card-hover p-4"
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.domain.color }} />
                <span className="text-sm font-medium text-ink">{d.domain.name}</span>
              </div>
              <div className="mt-2 text-xs text-ink-faint">
                {d.papers} resources · {d.discoverables} problems · {d.tools} tools
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

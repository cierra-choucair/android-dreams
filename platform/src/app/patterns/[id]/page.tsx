import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { store } from "@/lib/graph/store";
import { neighborhood, patternView } from "@/lib/graph/queries";
import { href } from "@/lib/graph/format";
import { Breadcrumb, ConfidenceChip, DomainChip, Empty, SectionHeading, TypeBadge } from "@/components/ui";
import { IdTag, NodeCard, SourceExcerpt } from "@/components/nodes";
import { LocalGraph } from "@/components/graph";

export function generateStaticParams() {
  return store.patterns().map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = store.pattern(decodeURIComponent(params.id));
  return { title: p ? `Pattern · ${p.label}` : "Pattern not found" };
}

export default function PatternPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const view = patternView(store, id);
  if (!view) notFound();
  const { pattern, domainsBridged, exhibitedBy, goodFor, isBridge } = view;
  const hood = neighborhood(store, "pattern", id);

  return (
    <article className="space-y-8">
      <Breadcrumb items={[{ href: "/patterns", label: "Patterns" }, { label: "Pattern" }]} />

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TypeBadge type="pattern" />
          {isBridge && (
            <span className="chip border-brand-dim/50 bg-brand/10 text-brand">↔ Cross-domain bridge</span>
          )}
          <IdTag id={pattern.id} />
        </div>
        <h1 className="max-w-reading text-2xl font-semibold leading-snug tracking-tight text-ink">
          {pattern.label}
        </h1>
        <p className="mt-2 text-sm text-ink-faint">
          A structural reason methods fit problems. Anything that exhibits this
          pattern is a candidate for any tool suited to it.
        </p>
        {domainsBridged.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {domainsBridged.map((dm, i) => (
              <span key={dm.id} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-ink-faint">↔</span>}
                <DomainChip domain={dm} />
              </span>
            ))}
          </div>
        )}
      </header>

      <LocalGraph hood={hood} />

      {/* The bridge: problems on the left, tools on the right */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <SectionHeading count={exhibitedBy.length} hint="exhibit this pattern">
            Problems
          </SectionHeading>
          <div className="space-y-3">
            {exhibitedBy.length === 0 && <Empty>None yet.</Empty>}
            {exhibitedBy.map(({ discoverable, evidence }) => (
              <NodeCard
                key={discoverable.id}
                type="discoverable"
                id={discoverable.id}
                title={discoverable.statement}
                domains={discoverable.domains.map((x) => store.domain(x)!).filter(Boolean)}
                evidence={evidence}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading count={goodFor.length} hint="are good for it">
            Tools
          </SectionHeading>
          <div className="space-y-3">
            {goodFor.length === 0 && <Empty>None yet.</Empty>}
            {goodFor.map(({ tool, evidence }) => (
              <NodeCard
                key={tool.id}
                type="tool"
                id={tool.id}
                title={tool.name}
                domains={tool.domains.map((x) => store.domain(x)!).filter(Boolean)}
                evidence={evidence}
              />
            ))}
          </div>
        </section>
      </div>

      {/* The reasoning: plain-language observations, with sources */}
      <section>
        <SectionHeading count={pattern.observations.length} hint="why the tool fit, in plain language">
          Observations
        </SectionHeading>
        <div className="space-y-3">
          {pattern.observations.map((o, i) => {
            const disc = store.discoverable(o.discoverable);
            const tool = store.tool(o.tool);
            const paper = store.paper(o.paper);
            return (
              <div key={i} className="card p-4">
                <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-dim">
                  {tool && (
                    <Link href={href("tool", tool.id)} className="text-rel-uses hover:underline">
                      {tool.name}
                    </Link>
                  )}
                  <span className="text-ink-faint">for</span>
                  {disc && (
                    <Link href={href("discoverable", disc.id)} className="text-rel-exhibits hover:underline">
                      {disc.statement.slice(0, 64)}
                      {disc.statement.length > 64 ? "…" : ""}
                    </Link>
                  )}
                  <ConfidenceChip score={o.confidence} />
                  {paper && (
                    <Link href={href("paper", paper.id)} className="ml-auto text-ink-faint hover:text-ink-dim">
                      {paper.venue} · {paper.year}
                    </Link>
                  )}
                </div>
                <p className="prose-excerpt">{o.text}</p>
                {o.source && <SourceExcerpt text={o.source} label="Source sentence" />}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { findGaps, neighborhood, problemView } from "@/lib/graph/queries";
import { Breadcrumb, DomainChip, Empty, SectionHeading, TypeBadge } from "@/components/ui";
import { NodeCard } from "@/components/nodes";
import { IdTag } from "@/components/nodes";
import { LocalGraph } from "@/components/graph";
import { OpportunityCard } from "@/components/opportunity";

export function generateStaticParams() {
  return store.discoverables().map((d) => ({ id: d.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const d = store.discoverable(decodeURIComponent(params.id));
  return { title: d ? `Problem · ${d.statement.slice(0, 60)}` : "Problem not found" };
}

export default function ProblemPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const view = problemView(store, id);
  if (!view) notFound();
  const { discoverable: d, domains, solvedBy, tools, patterns } = view;
  const hood = neighborhood(store, "discoverable", id);
  const relatedGaps = findGaps(store).filter((g) => g.discoverable.id === id);

  return (
    <article className="space-y-8">
      <Breadcrumb items={[{ href: "/problems", label: "Problems" }, { label: "Problem" }]} />

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TypeBadge type="discoverable" />
          {d.status && (
            <span className="chip border-line bg-surface text-ink-dim">{d.status}</span>
          )}
          <IdTag id={d.id} />
        </div>
        <h1 className="max-w-reading text-2xl font-semibold leading-snug tracking-tight text-ink">
          {d.statement}
        </h1>
        {domains.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {domains.map((dm) => (
              <DomainChip key={dm.id} domain={dm} />
            ))}
          </div>
        )}
      </header>

      <LocalGraph hood={hood} />

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <SectionHeading count={patterns.length} hint="why it's hard, structurally">
            Patterns it exhibits
          </SectionHeading>
          <div className="space-y-3">
            {patterns.length === 0 && <Empty>No patterns labeled yet.</Empty>}
            {patterns.map(({ pattern, evidence }) => (
              <NodeCard
                key={pattern.id}
                type="pattern"
                id={pattern.id}
                title={pattern.label}
                evidence={evidence}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading count={tools.length} hint="methods brought to bear">
            Tools applied
          </SectionHeading>
          <div className="space-y-3">
            {tools.length === 0 && <Empty>No tools applied yet.</Empty>}
            {tools.map(({ tool, evidence }) => (
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

      <section>
        <SectionHeading count={solvedBy.length} hint="every claim traces to a source">
          Evidence
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {solvedBy.length === 0 && <Empty>No resources linked yet.</Empty>}
          {solvedBy.map(({ paper, evidence }) => (
            <NodeCard
              key={paper.id}
              type="paper"
              id={paper.id}
              title={paper.title}
              evidence={evidence}
              meta={<span className="text-[0.7rem] text-ink-faint">{paper.venue} · {paper.year}</span>}
            />
          ))}
        </div>
      </section>

      {relatedGaps.length > 0 && (
        <section>
          <SectionHeading count={relatedGaps.length} hint="tools not yet applied here">
            Suggested directions
          </SectionHeading>
          <div className="grid gap-3 lg:grid-cols-2">
            {relatedGaps.map((g) => (
              <OpportunityCard key={g.tool.id} opp={g} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

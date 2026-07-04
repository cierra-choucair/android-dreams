import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { store } from "@/lib/graph/store";
import { neighborhood, paperView } from "@/lib/graph/queries";
import { Breadcrumb, DomainChip, Empty, SectionHeading, TypeBadge } from "@/components/ui";
import { IdTag, NodeCard } from "@/components/nodes";
import { LocalGraph } from "@/components/graph";

export function generateStaticParams() {
  return store.papers().map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = store.paper(decodeURIComponent(params.id));
  return { title: p ? `Resource · ${p.title.slice(0, 60)}` : "Resource not found" };
}

export default function PaperPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const view = paperView(store, id);
  if (!view) notFound();
  const { paper, solves, uses } = view;
  const domain = store.domain(paper.domain);
  const hood = neighborhood(store, "paper", id);

  return (
    <article className="space-y-8">
      <Breadcrumb items={[{ href: "/papers", label: "Resources" }, { label: "Resource" }]} />

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TypeBadge type="paper" />
          {!paper.labeled && (
            <span className="chip border-line bg-surface text-ink-faint">Cataloged · not yet labeled</span>
          )}
          <IdTag id={paper.id} />
        </div>
        <h1 className="max-w-reading text-2xl font-semibold leading-snug tracking-tight text-ink">
          {paper.title}
        </h1>
        <p className="mt-2 text-sm text-ink-dim">
          {paper.authors} · {paper.venue} · {paper.year}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {domain && <DomainChip domain={domain} />}
          {paper.license && (
            <span className="chip border-line bg-surface text-ink-faint">{paper.license}</span>
          )}
          {(paper.published_id || paper.preprint_id) && (
            <span className="kbd">{paper.published_id || paper.preprint_id}</span>
          )}
          {paper.source_url && (
            <a
              href={paper.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand hover:underline"
            >
              Source ↗
            </a>
          )}
        </div>
      </header>

      {paper.abstract && (
        <section className="card p-5">
          <div className="eyebrow mb-2">Abstract</div>
          <p className="max-w-reading text-sm leading-relaxed text-ink-dim">{paper.abstract}</p>
        </section>
      )}

      {paper.labeled ? (
        <>
          <LocalGraph hood={hood} />
          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <SectionHeading count={solves.length}>Problems addressed</SectionHeading>
              <div className="space-y-3">
                {solves.length === 0 && <Empty>None labeled.</Empty>}
                {solves.map(({ discoverable, evidence }) => (
                  <NodeCard
                    key={discoverable.id}
                    type="discoverable"
                    id={discoverable.id}
                    title={discoverable.statement}
                    evidence={evidence}
                  />
                ))}
              </div>
            </section>
            <section>
              <SectionHeading count={uses.length}>Tools used</SectionHeading>
              <div className="space-y-3">
                {uses.length === 0 && <Empty>None labeled.</Empty>}
                {uses.map(({ tool, evidence }) => (
                  <NodeCard
                    key={tool.id}
                    type="tool"
                    id={tool.id}
                    title={tool.name}
                    evidence={evidence}
                    meta={
                      evidence.role ? (
                        <span className="chip border-line bg-surface text-ink-faint">{evidence.role}</span>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        <Empty>
          This resource is in the catalog but hasn&apos;t been decomposed into
          problems, tools, and patterns yet — part of the labeling backlog.
        </Empty>
      )}
    </article>
  );
}

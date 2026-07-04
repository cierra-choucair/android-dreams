import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { store } from "@/lib/graph/store";
import { neighborhood, toolView } from "@/lib/graph/queries";
import { href } from "@/lib/graph/format";
import { Breadcrumb, DomainChip, Empty, SectionHeading, TypeBadge } from "@/components/ui";
import { IdTag, NodeCard } from "@/components/nodes";
import { LocalGraph } from "@/components/graph";

export function generateStaticParams() {
  return store.tools().map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const t = store.tool(decodeURIComponent(params.id));
  return { title: t ? `Tool · ${t.name}` : "Tool not found" };
}

export default function ToolPage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const view = toolView(store, id);
  if (!view) notFound();
  const { tool, domains, appliesTo, goodForPatterns, usedBy, variantOf, variants } = view;
  const hood = neighborhood(store, "tool", id);

  return (
    <article className="space-y-8">
      <Breadcrumb items={[{ href: "/tools", label: "Tools" }, { label: "Tool" }]} />

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <TypeBadge type="tool" />
          <IdTag id={tool.id} />
        </div>
        <h1 className="text-2xl font-semibold leading-snug tracking-tight text-ink">{tool.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {domains.map((dm) => (
            <DomainChip key={dm.id} domain={dm} />
          ))}
        </div>
        {(variantOf.length > 0 || variants.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-dim">
            {variantOf.map((v) => (
              <span key={v.id}>
                Variant of{" "}
                <Link href={href("tool", v.id)} className="text-rel-uses hover:underline">
                  {v.name}
                </Link>
              </span>
            ))}
            {variants.length > 0 && (
              <span>
                Variants:{" "}
                {variants.map((v, i) => (
                  <span key={v.id}>
                    {i > 0 && ", "}
                    <Link href={href("tool", v.id)} className="text-rel-uses hover:underline">
                      {v.name}
                    </Link>
                  </span>
                ))}
              </span>
            )}
          </div>
        )}
      </header>

      <LocalGraph hood={hood} />

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <SectionHeading count={goodForPatterns.length} hint="structural fit">
            Good for patterns
          </SectionHeading>
          <div className="space-y-3">
            {goodForPatterns.length === 0 && <Empty>None labeled yet.</Empty>}
            {goodForPatterns.map(({ pattern, evidence }) => (
              <NodeCard key={pattern.id} type="pattern" id={pattern.id} title={pattern.label} evidence={evidence} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading count={appliesTo.length} hint="problems engaged">
            Applied to problems
          </SectionHeading>
          <div className="space-y-3">
            {appliesTo.length === 0 && <Empty>None labeled yet.</Empty>}
            {appliesTo.map(({ discoverable, evidence }) => (
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
      </div>

      <section>
        <SectionHeading count={usedBy.length} hint="where it appears">
          Resources
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {usedBy.map(({ paper, evidence }) => (
            <NodeCard
              key={paper.id}
              type="paper"
              id={paper.id}
              title={paper.title}
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
    </article>
  );
}

import Link from "next/link";
import type { Domain, NodeType } from "@/lib/graph/types";
import type { Evidence } from "@/lib/graph/queries";
import { href, shortId } from "@/lib/graph/format";
import { ConfidenceChip, DomainChip, TYPE_COLOR, TYPE_NAME } from "./ui";

/** Compact inline link: type dot + truncated label. For dense lists/legends. */
export function NodeLink({
  type,
  id,
  label,
}: {
  type: NodeType;
  id: string;
  label: string;
}) {
  return (
    <Link
      href={href(type, id)}
      className="group inline-flex max-w-full items-center gap-1.5 text-sm text-ink hover:text-brand"
    >
      <span
        className="mt-[1px] h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: TYPE_COLOR[type] }}
      />
      <span className="truncate group-hover:underline group-hover:decoration-brand">{label}</span>
    </Link>
  );
}

/** Block card linking to a node. Optionally renders evidence + children. */
export function NodeCard({
  type,
  id,
  title,
  domains,
  evidence,
  meta,
  children,
}: {
  type: NodeType;
  id: string;
  title: string;
  domains?: Domain[];
  evidence?: Evidence;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="card card-hover p-4">
      <Link href={href(type, id)} className="block">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="text-[0.68rem] font-semibold uppercase tracking-wider"
            style={{ color: TYPE_COLOR[type] }}
          >
            {TYPE_NAME[type]}
          </span>
          {evidence && <ConfidenceChip score={evidence.confidence} />}
          {meta}
        </div>
        <p className="text-sm leading-snug text-ink">{title}</p>
      </Link>
      {domains && domains.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {domains.map((d) => (
            <DomainChip key={d.id} domain={d} size="xs" />
          ))}
        </div>
      )}
      {evidence?.source && <SourceExcerpt text={evidence.source} />}
      {children}
    </div>
  );
}

/** A quoted source excerpt — keeps every assertion backed by evidence. */
export function SourceExcerpt({ text, label = "Evidence" }: { text: string; label?: string }) {
  if (!text) return null;
  return (
    <figure className="mt-2.5 border-l-2 border-line pl-3">
      <figcaption className="eyebrow mb-0.5">{label}</figcaption>
      <blockquote className="text-xs italic leading-relaxed text-ink-dim">
        “{text}”
      </blockquote>
    </figure>
  );
}

/** id shown in mono, for the record-header of a detail page. */
export function IdTag({ id }: { id: string }) {
  return <span className="kbd">#{shortId(id)}</span>;
}

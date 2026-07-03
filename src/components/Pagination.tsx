import Link from "next/link";

/** Server-rendered pagination in Space Mono. */
export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  /** Extra query params to preserve across pages (e.g. sort, q). */
  query?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const params = new URLSearchParams(query);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex items-center justify-between border-t border-cream/10 pt-6 font-mono text-[0.7rem] uppercase tracking-wide2"
    >
      {page > 1 ? (
        <Link href={href(page - 1)} className="text-dim transition-colors hover:text-orange">
          ← Newer
        </Link>
      ) : (
        <span aria-hidden className="text-cream/20">
          ← Newer
        </span>
      )}
      <span className="text-dimmer">
        Page {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={href(page + 1)} className="text-dim transition-colors hover:text-orange">
          Older →
        </Link>
      ) : (
        <span aria-hidden className="text-cream/20">
          Older →
        </span>
      )}
    </nav>
  );
}

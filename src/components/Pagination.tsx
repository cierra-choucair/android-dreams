import Link from "next/link";

const VARIANTS = {
  // Dark magazine surfaces
  dark: {
    nav: "border-cream/10 font-serif font-semibold text-[0.76rem] uppercase tracking-wide2",
    link: "text-dim transition-colors hover:text-orange",
    disabled: "text-cream/20",
    count: "text-cream/65",
  },
  // QF white surfaces
  light: {
    nav: "border-qf-void/10 font-qf-mono text-[0.7rem] uppercase tracking-[0.2em]",
    link: "text-qf-void/60 transition-colors hover:text-qf-signal-deep",
    disabled: "text-qf-void/20",
    count: "text-qf-void/60",
  },
} as const;

/** Server-rendered pagination. */
export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
  variant = "dark",
}: {
  page: number;
  totalPages: number;
  basePath: string;
  /** Extra query params to preserve across pages (e.g. sort, q). */
  query?: Record<string, string>;
  variant?: keyof typeof VARIANTS;
}) {
  if (totalPages <= 1) return null;
  const v = VARIANTS[variant];

  const href = (p: number) => {
    const params = new URLSearchParams(query);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <nav
      aria-label="Pagination"
      className={`mt-14 flex items-center justify-between border-t pt-6 ${v.nav}`}
    >
      {page > 1 ? (
        <Link href={href(page - 1)} className={v.link}>
          ← Newer
        </Link>
      ) : (
        <span aria-hidden className={v.disabled}>
          ← Newer
        </span>
      )}
      <span className={v.count}>
        Page {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={href(page + 1)} className={v.link}>
          Older →
        </Link>
      ) : (
        <span aria-hidden className={v.disabled}>
          Older →
        </span>
      )}
    </nav>
  );
}

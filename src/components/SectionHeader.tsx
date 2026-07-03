import Link from "next/link";

/** Home-page section header: display title, mono cadence label, more-link. */
export function SectionHeader({
  title,
  label,
  labelClass = "text-dimmer",
  href,
  hrefLabel,
  titleClass = "text-cream",
}: {
  title: string;
  label?: string;
  labelClass?: string;
  href?: string;
  hrefLabel?: string;
  titleClass?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-cream/10 pb-5">
      <div className="flex items-baseline gap-4">
        <h2 className={`font-display text-4xl tracking-wide sm:text-5xl ${titleClass}`}>
          {title}
        </h2>
        {label && (
          <span className={`font-mono text-[0.65rem] uppercase tracking-wide2 ${labelClass}`}>
            {label}
          </span>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="font-mono text-[0.7rem] uppercase tracking-wide2 text-dim transition-colors hover:text-orange"
        >
          {hrefLabel ?? "View all"} →
        </Link>
      )}
    </div>
  );
}

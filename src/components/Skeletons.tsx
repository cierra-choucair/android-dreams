/** Skeleton screens matching the magazine aesthetic — no spinners. */

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-cream/[0.04] via-cream/[0.08] to-cream/[0.04] ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-cream/10 bg-cream/[0.02]">
      <div className="h-[2px] w-full bg-cream/10" />
      <div className="space-y-4 p-5">
        <Shimmer className="h-3 w-24" />
        <Shimmer className="h-7 w-full" />
        <Shimmer className="h-7 w-3/4" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-3 w-32" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading articles"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div role="status" aria-label="Loading article" className="mx-auto max-w-3xl space-y-6">
      <Shimmer className="h-3 w-32" />
      <Shimmer className="h-14 w-full" />
      <Shimmer className="h-14 w-2/3" />
      <Shimmer className="h-5 w-1/2" />
      <div className="h-px w-full bg-orange/40" />
      <div className="space-y-4 pt-4">
        {Array.from({ length: 8 }, (_, i) => (
          <Shimmer key={i} className={`h-4 ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

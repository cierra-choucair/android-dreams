import { CardGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 h-12 w-72 animate-pulse bg-gradient-to-r from-cream/[0.04] via-cream/[0.08] to-cream/[0.04]" />
      <CardGridSkeleton count={6} />
    </div>
  );
}

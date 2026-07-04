import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="eyebrow">404 · off the map</p>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        No node here
      </h1>
      <p className="max-w-md text-sm text-ink-dim">
        This part of the graph doesn&apos;t exist — or hasn&apos;t been labeled
        yet. Head back to a problem and explore outward.
      </p>
      <Link
        href="/problems"
        className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-void hover:opacity-90"
      >
        Start from a problem →
      </Link>
    </div>
  );
}

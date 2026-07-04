import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-cyber" />
      <div className="pointer-events-none absolute inset-0 glow-orange-tl" />
      <div className="pointer-events-none absolute inset-0 glow-magenta-br" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="eyebrow text-magenta">Signal lost</p>
        <h1 className="mt-6 font-display text-[8rem] font-bold leading-none tracking-wide text-magenta">
          404
        </h1>
        <p className="mt-6 max-w-md text-lg italic leading-relaxed text-dim">
          This page doesn't exist — or hasn't been written yet. The future is
          still shapeable; this URL, apparently, is not.
        </p>
        <Link
          href="/"
          className="mt-10 border border-orange px-6 py-3 font-serif font-semibold text-xs uppercase tracking-wide2 text-orange transition-colors hover:bg-orange hover:text-ink"
        >
          Return to the frontier
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";
import { QfLockup, TerminalCard } from "@/components/TerminalCard";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "All News — QFrontline",
  description:
    "Every QFrontline signal — technical reporting and the weekly Dev Brief, newest first.",
  alternates: { canonical: "/qfrontline/news" },
};

export default async function QfNewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const { posts, totalPages } = await getPosts({
    category: "qfrontline",
    page,
    perPage: 12,
    revalidate: REVALIDATE.archive,
  });

  return (
    <div className="bg-white text-qf-void">
      {/* Compact Void masthead */}
      <section aria-label="All QFrontline news" className="relative overflow-hidden bg-qf-void">
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-signal">
            All news · Newest first
          </p>
          <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] leading-none">
            <QfLockup />
          </h1>
          <p className="mt-4 font-qf-sans text-sm font-medium uppercase tracking-[0.18em] text-qf-ink/90">
            Every signal from the frontline — articles and Dev Briefs.
          </p>
        </div>
        <div aria-hidden className="h-[3px] w-full bg-qf-signal" />
      </section>

      {/* Grid */}
      <section aria-label="Articles" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {posts.length === 0 ? (
          <p className="font-qf-mono text-sm text-qf-void/60">
            <span aria-hidden className="text-qf-signal-deep">&gt; </span>
            first posts compiling…
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <TerminalCard key={post.id} post={post} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          basePath="/qfrontline/news"
          variant="light"
        />
        <p className="mt-14 text-center font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-void/50">
          <Link href="/qfrontline" className="transition-colors hover:text-qf-signal-deep">
            ← Back to QFrontline
          </Link>
        </p>
      </section>
    </div>
  );
}

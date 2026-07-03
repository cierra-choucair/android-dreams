import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { CardGridSkeleton } from "@/components/Skeletons";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Android Dreams archive.",
  robots: { index: false },
};

interface SearchParams {
  q?: string;
  page?: string;
}

async function SearchResults({ q, page }: { q: string; page: number }) {
  const { posts, total, totalPages } = await getPosts({
    search: q,
    page,
    perPage: 12,
    revalidate: REVALIDATE.home,
  });

  return (
    <>
      <p className="mb-8 font-mono text-[0.7rem] uppercase tracking-wide2 text-dim">
        {total} {total === 1 ? "result" : "results"} for “{q}”
      </p>
      {posts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
          Nothing in the archive matches. Try a broader signal.
        </p>
      )}
      <Pagination page={page} totalPages={totalPages} basePath="/search" query={{ q }} />
    </>
  );
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const q = (searchParams.q ?? "").trim();
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] glow-orange-tl" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6">
        <header className="border-b border-cream/10 pb-10">
          <p className="eyebrow text-orange">Search</p>
          <h1 className="mt-4 font-display text-5xl tracking-wide text-cream sm:text-6xl">
            The Archive
          </h1>
          <form action="/search" method="get" className="mt-8 flex max-w-2xl gap-3">
            <label htmlFor="archive-search" className="sr-only">
              Search query
            </label>
            <input
              id="archive-search"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Quantum, alignment, coherence…"
              className="min-w-0 flex-1 border border-orange/40 bg-ink/60 px-4 py-3 font-mono text-sm text-cream placeholder:text-dimmer focus:border-orange focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange px-6 py-3 font-mono text-xs uppercase tracking-wide2 text-ink transition-colors hover:bg-orange/85"
            >
              Search
            </button>
          </form>
        </header>

        <div className="pt-10">
          {q ? (
            <Suspense key={`${q}-${page}`} fallback={<CardGridSkeleton count={6} />}>
              <SearchResults q={q} page={page} />
            </Suspense>
          ) : (
            <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
              Enter a query to search every format in the archive.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

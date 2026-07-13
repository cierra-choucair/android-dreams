import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "All News — Android Dreams",
  description:
    "Every story from the frontier — transmissions, deep reads, essays, letters, and QFrontline signals, newest first.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const { posts, totalPages } = await getPosts({
    page,
    perPage: 18,
    revalidate: REVALIDATE.archive,
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] glow-orange-tl" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6">
        <header className="border-b border-cream/10 pb-10">
          <p className="eyebrow text-orange">Everything · Newest first</p>
          <h1 className="mt-4 font-display text-6xl tracking-wide text-cream sm:text-7xl">
            All News
          </h1>
          <p className="mt-5 max-w-2xl text-xl italic leading-relaxed text-dim">
            Every story from the frontier — transmissions, deep reads, essays,
            letters, and QFrontline signals.
          </p>
        </header>

        <div className="pt-10">
          {posts.length === 0 ? (
            <p className="font-serif font-semibold text-xs uppercase tracking-wide2 text-cream/65">
              Nothing published here yet. The frontier is quiet — for now.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} basePath="/news" />
        </div>
      </div>
    </div>
  );
}

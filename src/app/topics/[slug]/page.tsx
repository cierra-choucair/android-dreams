import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { getPosts, getTagBySlug, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

interface Params {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug);
  if (!tag) return {};
  return {
    title: tag.name,
    description: `Android Dreams coverage on ${tag.name}.`,
    alternates: { canonical: `/topics/${tag.slug}` },
  };
}

export default async function TopicPage({ params, searchParams }: Params) {
  const tag = await getTagBySlug(params.slug);
  if (!tag) notFound();

  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const { posts, totalPages, total } = await getPosts({
    tag: tag.slug,
    page,
    perPage: 12,
    revalidate: REVALIDATE.archive,
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] glow-magenta-br" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6">
        <header className="border-b border-cream/10 pb-10">
          <p className="eyebrow text-magenta">Topic</p>
          <h1 className="mt-3 font-display text-5xl tracking-wide text-cream sm:text-6xl">
            {tag.name}
          </h1>
          <p className="mt-4 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65">
            {total} {total === 1 ? "article" : "articles"}
          </p>
        </header>

        <div className="pt-10">
          {posts.length === 0 ? (
            <p className="font-serif font-semibold text-xs uppercase tracking-wide2 text-cream/65">
              No articles yet.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath={`/topics/${tag.slug}`}
          />
        </div>
      </div>
    </div>
  );
}

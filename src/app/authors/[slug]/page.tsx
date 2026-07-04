import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { getAuthorBySlug, getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

interface Params {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return {};
  return {
    title: author.name,
    description: author.description || `Articles by ${author.name} on Android Dreams.`,
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorPage({ params, searchParams }: Params) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) notFound();

  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const { posts, totalPages, total } = await getPosts({
    authorSlug: author.slug,
    page,
    perPage: 12,
    revalidate: REVALIDATE.archive,
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] glow-orange-tl" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6">
        <header className="flex flex-col gap-6 border-b border-cream/10 pb-10 sm:flex-row sm:items-end">
          {author.avatar && (
            <Image
              src={author.avatar}
              alt=""
              width={88}
              height={88}
              className="border border-cream/15 grayscale"
            />
          )}
          <div>
            <p className="eyebrow text-orange">Author</p>
            <h1 className="mt-3 font-display text-5xl tracking-wide text-cream sm:text-6xl">
              {author.name}
            </h1>
            {author.description && (
              <p className="mt-4 max-w-2xl text-lg italic leading-relaxed text-dim">
                {author.description}
              </p>
            )}
            <p className="mt-4 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65">
              {total} {total === 1 ? "article" : "articles"}
            </p>
          </div>
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
            basePath={`/authors/${author.slug}`}
          />
        </div>
      </div>
    </div>
  );
}

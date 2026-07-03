import Link from "next/link";
import { ArticleCard, FeatureCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { FORMATS, type FormatSlug } from "@/lib/formats";
import { getPosts, REVALIDATE } from "@/lib/wp";

/** Density profile per format. */
const LAYOUT: Record<
  FormatSlug,
  { perPage: number; grid: string; showImage: boolean; featureFirst: boolean }
> = {
  transmissions: {
    perPage: 18,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    showImage: false,
    featureFirst: false,
  },
  "deep-read": {
    perPage: 9,
    grid: "md:grid-cols-2",
    showImage: true,
    featureFirst: true,
  },
  "sci-fi-lens": {
    perPage: 12,
    grid: "md:grid-cols-2",
    showImage: false,
    featureFirst: true,
  },
  "sunday-letter": {
    perPage: 10,
    grid: "md:grid-cols-2",
    showImage: false,
    featureFirst: false,
  },
  qfrontline: {
    perPage: 12,
    grid: "sm:grid-cols-2 lg:grid-cols-3",
    showImage: false,
    featureFirst: false,
  },
};

export interface ArchiveSearchParams {
  page?: string;
  sort?: string;
}

export function parseArchiveParams(searchParams: ArchiveSearchParams) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const sort: "desc" | "asc" = searchParams.sort === "oldest" ? "asc" : "desc";
  return { page, sort };
}

export async function FormatArchive({
  format,
  page,
  sort,
}: {
  format: FormatSlug;
  page: number;
  sort: "desc" | "asc";
}) {
  const meta = FORMATS[format];
  const layout = LAYOUT[format];
  const { posts, totalPages } = await getPosts({
    category: format,
    page,
    perPage: layout.perPage,
    order: sort,
    revalidate: REVALIDATE.archive,
  });

  const feature =
    layout.featureFirst && page === 1 && sort === "desc" ? posts[0] : undefined;
  const rest = feature ? posts.slice(1) : posts;
  const basePath = `/${format}`;
  const sortHref = (s: "newest" | "oldest") =>
    s === "newest" ? basePath : `${basePath}?sort=oldest`;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] glow-orange-tl" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6">
        {/* Format header */}
        <header className="border-b border-cream/10 pb-10">
          <p className={`eyebrow ${meta.text}`}>{meta.cadence}</p>
          <h1 className="mt-4 font-display text-6xl tracking-wide text-cream sm:text-7xl">
            {meta.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl italic leading-relaxed text-dim">
            {meta.description}
          </p>
        </header>

        {/* Filter / sort controls */}
        <nav
          aria-label="Sort"
          className="flex items-center gap-6 border-b border-cream/10 py-4 font-mono text-[0.65rem] uppercase tracking-wide2"
        >
          <span className="text-dimmer">Sort:</span>
          <Link
            href={sortHref("newest")}
            aria-current={sort === "desc" ? "true" : undefined}
            className={sort === "desc" ? meta.text : "text-dim hover:text-cream"}
          >
            Most recent
          </Link>
          <Link
            href={sortHref("oldest")}
            aria-current={sort === "asc" ? "true" : undefined}
            className={sort === "asc" ? meta.text : "text-dim hover:text-cream"}
          >
            Oldest first
          </Link>
        </nav>

        {/* Grid */}
        <div className="pt-10">
          {posts.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
              Nothing published here yet. The frontier is quiet — for now.
            </p>
          ) : (
            <>
              {feature && (
                <div className="mb-5">
                  <FeatureCard post={feature} />
                </div>
              )}
              <div className={`grid gap-5 ${layout.grid}`}>
                {rest.map((post) => (
                  <ArticleCard key={post.id} post={post} showImage={layout.showImage} />
                ))}
              </div>
            </>
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath={basePath}
            query={sort === "asc" ? { sort: "oldest" } : {}}
          />
        </div>
      </div>
    </div>
  );
}

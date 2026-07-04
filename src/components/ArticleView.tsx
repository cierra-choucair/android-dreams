import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { ImageSlot } from "@/components/ImageSlot";
import { formatFromCategories } from "@/lib/formats";
import type { Post } from "@/lib/types";
import { formatDate, SITE_URL } from "@/lib/utils";

/** Article schema structured data. */
function articleJsonLd(post: Post) {
  const format = formatFromCategories(post.categorySlugs);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    url: `${SITE_URL}/${format.slug}/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.slug ? `${SITE_URL}/authors/${post.author.slug}` : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Android Dreams",
      url: SITE_URL,
    },
    articleSection: format.name,
    ...(post.featuredImage ? { image: [post.featuredImage.url] } : {}),
  };
}

export function ArticleView({
  post,
  related,
}: {
  post: Post;
  related: Post[];
}) {
  const format = formatFromCategories(post.categorySlugs);
  const isQf = format.slug === "qfrontline";

  return (
    <article
      className="relative"
      style={{ "--format-accent": format.hex } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[60vh] ${
          isQf ? "glow-signal-tl" : "glow-orange-tl"
        }`}
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6">
        {/* Header */}
        <header>
          <p className="eyebrow">
            <Link
              href={`/${format.slug}`}
              className={`${format.text} transition-opacity hover:opacity-80`}
            >
              {format.name}
            </Link>
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.02] tracking-wide text-cream sm:text-[3.5rem]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 text-xl italic leading-relaxed text-dim">{post.excerpt}</p>
          )}
          <p className="mt-7 font-serif font-semibold text-[0.76rem] uppercase tracking-wide2 text-dim">
            {post.author.slug ? (
              <Link
                href={`/authors/${post.author.slug}`}
                className="text-cream/80 transition-colors hover:text-orange"
              >
                {post.author.name}
              </Link>
            ) : (
              <span className="text-cream/80">{post.author.name}</span>
            )}
            <span className="text-cream/65"> · </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-cream/65"> · </span>
            {post.readingMinutes} min read
          </p>
          <div aria-hidden className="mt-6 h-px w-full bg-orange/70" />
        </header>

        {post.featuredImage && (
          <ImageSlot
            image={post.featuredImage}
            className="mt-10 aspect-[16/9]"
            sizes="(min-width: 768px) 48rem, 100vw"
            priority
          />
        )}

        {/* Body */}
        <div
          className={`prose-ad mt-10 ${isQf ? "prose-qf" : ""}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* End marker */}
        <div aria-hidden className="mt-12 h-2.5 w-2.5 bg-orange" />

        {/* Topics */}
        {post.tags.length > 0 && (
          <nav aria-label="Topics" className="mt-10">
            <ul className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <li key={tag.id}>
                  <Link
                    href={`/topics/${tag.slug}`}
                    className="inline-block border border-cream/15 px-3 py-1 font-serif font-semibold text-[0.68rem] uppercase tracking-wide2 text-dim transition-colors hover:border-orange hover:text-orange"
                  >
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* More from Android Dreams */}
      {related.length > 0 && (
        <aside
          aria-labelledby="more-from"
          className="relative border-t border-cream/10 bg-cream/[0.015]"
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 id="more-from" className="eyebrow text-orange">
              More from Android Dreams
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ArticleCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </aside>
      )}
    </article>
  );
}

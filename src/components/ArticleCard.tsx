import Link from "next/link";
import { formatFromCategories } from "@/lib/formats";
import type { Post } from "@/lib/types";
import { formatDateStamp } from "@/lib/utils";
import { ImageSlot } from "./ImageSlot";

export function postHref(post: Post): string {
  const format = formatFromCategories(post.categorySlugs);
  return `/${format.slug}/${post.slug}`;
}

/**
 * Standard article card: top accent line in the format color, eyebrow,
 * Bebas headline, one-line excerpt, date + byline.
 */
export function ArticleCard({
  post,
  showImage = false,
  accentOverride,
}: {
  post: Post;
  showImage?: boolean;
  accentOverride?: { text: string; bg: string };
}) {
  const format = formatFromCategories(post.categorySlugs);
  const accent = accentOverride ?? { text: format.text, bg: format.bg };

  return (
    <article className="group relative flex h-full flex-col border border-cream/10 bg-cream/[0.02] transition-colors hover:bg-cream/[0.045]">
      <span
        aria-hidden
        className={`block h-[2px] w-full ${accent.bg} opacity-40 transition-opacity group-hover:opacity-100`}
      />
      {showImage && (
        <ImageSlot image={post.featuredImage} className="aspect-[16/9] border-x-0 border-t-0" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className={`eyebrow ${accent.text}`}>{format.name}</p>
        <h3 className="mt-3 font-display text-2xl leading-[1.05] tracking-wide text-cream">
          <Link href={postHref(post)} className="transition-colors group-hover:text-cream">
            {/* Stretched link: whole card is clickable */}
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-[0.95rem] italic leading-relaxed text-dim">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-4 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer">
          {formatDateStamp(post.date)}
          {post.author.name && <> · {post.author.name}</>}
        </p>
      </div>
    </article>
  );
}

/** Larger feature treatment: image left, headline + dek right. */
export function FeatureCard({ post }: { post: Post }) {
  const format = formatFromCategories(post.categorySlugs);

  return (
    <article className="group relative grid gap-6 border border-cream/10 bg-cream/[0.02] transition-colors hover:bg-cream/[0.045] md:grid-cols-2">
      <ImageSlot
        image={post.featuredImage}
        className="aspect-[16/10] md:aspect-auto md:min-h-[20rem] md:border-y-0 md:border-l-0"
        label="COVER IMAGE SLOT"
      />
      <div className="flex flex-col justify-center p-6 pb-8 md:py-10 md:pr-10">
        <p className={`eyebrow ${format.text}`}>{format.name}</p>
        <h3 className="mt-4 font-display text-3xl leading-[1.02] tracking-wide text-cream sm:text-4xl">
          <Link href={postHref(post)}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 text-lg italic leading-relaxed text-dim">{post.excerpt}</p>
        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer">
          {formatDateStamp(post.date)} · {post.author.name} ·{" "}
          {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}

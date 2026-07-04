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
 * Standard post card: elevated panel with rounded corners, image running
 * edge-to-edge across the top, bold kicker in the format accent, bold
 * headline, quiet meta at the bottom.
 */
export function ArticleCard({
  post,
  showImage = true,
  accentOverride,
}: {
  post: Post;
  showImage?: boolean;
  accentOverride?: { text: string; bg: string };
}) {
  const format = formatFromCategories(post.categorySlugs);
  const accent = accentOverride ?? { text: format.text, bg: format.bg };

  return (
    <article className="floaty group relative flex h-full flex-col overflow-hidden border border-cream/[0.07] bg-panel">
      {showImage && (
        <ImageSlot bare image={post.featuredImage} className="aspect-[16/9]" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className={`font-serif text-[0.85rem] font-bold ${accent.text}`}>
          {format.name}
        </p>
        <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-cream">
          <Link href={postHref(post)} className="transition-colors group-hover:text-cream">
            {/* Stretched link: whole card is clickable */}
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.92rem] font-light leading-relaxed text-dim">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-4 font-serif text-[0.78rem] font-medium text-cream/60">
          {formatDateStamp(post.date)}
          {post.author.name && <> · {post.author.name}</>}
        </p>
      </div>
    </article>
  );
}

/**
 * Lead treatment: text panel left, large image right — one card,
 * per the front-page reference.
 */
export function FeatureCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  const format = formatFromCategories(post.categorySlugs);

  return (
    <article className="floaty group relative grid overflow-hidden border border-cream/[0.07] bg-panel lg:grid-cols-[6fr_7fr]">
      <div className="order-2 flex flex-col p-6 sm:p-8 lg:order-1">
        <p className={`font-serif text-[0.9rem] font-bold ${format.text}`}>
          {format.name}
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold leading-[1.12] text-cream sm:text-3xl">
          <Link href={postHref(post)}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-[1.02rem] font-light leading-relaxed text-dim">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-6 font-serif text-[0.78rem] font-medium text-cream/60">
          {formatDateStamp(post.date)} · {post.author.name} · {post.readingMinutes} min read
        </p>
      </div>
      <ImageSlot
        bare
        image={post.featuredImage}
        className="order-1 aspect-[16/9] lg:order-2 lg:aspect-auto lg:min-h-[24rem]"
        label="LEAD IMAGE SLOT"
        priority={priority}
        sizes="(min-width: 1024px) 55vw, 100vw"
      />
    </article>
  );
}

/**
 * Side card: image left, text right — the stacked right-column
 * treatment from the reference.
 */
export function SideCard({ post }: { post: Post }) {
  const format = formatFromCategories(post.categorySlugs);
  return (
    <article className="floaty group relative grid grid-cols-[2fr_3fr] overflow-hidden border border-cream/[0.07] bg-panel">
      <ImageSlot bare image={post.featuredImage} className="min-h-[9rem]" label="IMAGE" />
      <div className="flex flex-col p-4 sm:p-5">
        <p className={`font-serif text-[0.8rem] font-bold ${format.text}`}>
          {format.name}
        </p>
        <h3 className="mt-1.5 font-serif text-[1.05rem] font-bold leading-snug text-cream">
          <Link href={postHref(post)}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-auto pt-3 font-serif text-[0.72rem] font-medium text-cream/60">
          {formatDateStamp(post.date)} · {post.readingMinutes} min
        </p>
      </div>
    </article>
  );
}

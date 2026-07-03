import Image from "next/image";
import Link from "next/link";
import { ArticleCard, FeatureCard, postHref } from "@/components/ArticleCard";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { FORMATS, formatFromCategories } from "@/lib/formats";
import type { Post } from "@/lib/types";
import { getFeaturedPost, getPosts, REVALIDATE } from "@/lib/wp";
import { firstParagraph, formatDate, formatDateStamp } from "@/lib/utils";

export const revalidate = 60;

/** First pull quote in the body, for the Sci-Fi Lens block. */
function pulledQuote(post: Post): string {
  const match = post.content.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
  if (match) {
    const text = match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text) return text;
  }
  return post.excerpt;
}

export default async function HomePage() {
  const [featured, transmissions, deepReads, sciFi, sundayLetter] =
    await Promise.all([
      getFeaturedPost(),
      getPosts({ category: "transmissions", perPage: 6, revalidate: REVALIDATE.home }),
      getPosts({ category: "deep-read", perPage: 3, revalidate: REVALIDATE.home }),
      getPosts({ category: "sci-fi-lens", perPage: 1, revalidate: REVALIDATE.home }),
      getPosts({ category: "sunday-letter", perPage: 1, revalidate: REVALIDATE.home }),
    ]);

  const deepFeature = deepReads.posts[0];
  const deepRest = deepReads.posts.slice(1, 3);
  const lens = sciFi.posts[0];
  const letter = sundayLetter.posts[0];

  return (
    <>
      {/* ────────────── HERO — the illustration is the brand ────────────── */}
      <section
        aria-label="Android Dreams"
        className="relative overflow-hidden border-b border-cream/10"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 glow-cyan-left" />
        <div className="pointer-events-none absolute inset-0 glow-magenta-right" />
        <div className="relative mx-auto grid max-w-7xl items-stretch px-4 py-14 sm:px-6 lg:min-h-[80vh] lg:grid-cols-[1fr_auto_1.05fr] lg:gap-14 lg:py-0">
          {/* Left: the masthead — title-card wordmark */}
          <div className="flex flex-col justify-center py-8 lg:py-20">
            <h1 className="font-display font-bold leading-[0.95] tracking-[0.06em]">
              <span className="block text-[clamp(3.25rem,8.5vw,6.5rem)] text-cream">
                ANDROID
              </span>
              <span className="block text-[clamp(3.25rem,8.5vw,6.5rem)] text-cream">
                DREAMS
              </span>
            </h1>
            <p className="mt-8 font-serif text-sm font-extralight uppercase tracking-[0.55em] text-gold sm:text-base">
              Imagine the future
            </p>
            <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer">
              · Vol 01 · {new Date().getUTCFullYear()} · Presented in 2.39:1 ·
            </p>
          </div>

          {/* The seam — the threshold every layout honors */}
          <div aria-hidden className="hidden w-[3px] self-stretch bg-orange lg:block" />
          <div aria-hidden className="h-[3px] w-24 bg-orange lg:hidden" />

          {/* Right: the mark — uncropped, no type on the face */}
          <div className="relative flex items-center justify-center py-10 lg:py-14">
            <Image
              src="/brand/ad-mark.jpg"
              alt="The Android Dreams mark: a portrait split at a glowing seam — half human face in cool blue light, half machine in deep crimson."
              width={2351}
              height={2351}
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="max-h-[70vh] w-auto"
            />
          </div>
        </div>

        {/* NOW SHOWING — the featured piece on a letterbox plate */}
        <div className="relative border-t border-cream/10 bg-[#030207]/80">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {featured ? (
              <article className="group flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-10">
                <p className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wide4 text-orange">
                  · Now Showing ·
                </p>
                <h2 className="font-display text-2xl leading-snug text-cream sm:text-3xl">
                  <Link href={postHref(featured)} className="transition-colors group-hover:text-cyan">
                    {featured.title}
                  </Link>
                </h2>
                <p className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wide2 text-gold lg:ml-auto">
                  · {formatFromCategories(featured.categorySlugs).name} ·{" "}
                  {formatDateStamp(featured.date)} · {featured.readingMinutes} min ·
                </p>
              </article>
            ) : (
              <p className="font-mono text-[0.65rem] uppercase tracking-wide4 text-dimmer">
                · Now Showing · The first feature is on its way from the frontier ·
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────── LATEST TRANSMISSIONS ──────────────────── */}
      <section aria-labelledby="home-transmissions" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeader
          title="Transmissions"
          label={FORMATS.transmissions.cadence}
          labelClass="text-orange"
          href="/transmissions"
          hrefLabel="All transmissions"
        />
        <h2 id="home-transmissions" className="sr-only">
          Latest Transmissions
        </h2>
        {transmissions.posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {transmissions.posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
            Awaiting the first dispatch.
          </p>
        )}
      </section>

      {/* ─────────────────────── THE DEEP READ ─────────────────────── */}
      <section
        aria-labelledby="home-deep-read"
        className="relative border-y border-cream/10 bg-cream/[0.015]"
      >
        <div className="pointer-events-none absolute inset-0 glow-cyan-tr" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeader
            title="The Deep Read"
            label={FORMATS["deep-read"].cadence}
            labelClass="text-cyan"
            href="/deep-read"
            hrefLabel="All deep reads"
          />
          <h2 id="home-deep-read" className="sr-only">
            The Deep Read
          </h2>
          {deepFeature ? (
            <>
              <FeatureCard post={deepFeature} />
              {deepRest.length > 0 && (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {deepRest.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
              The first deep read is being written.
            </p>
          )}
        </div>
      </section>

      {/* ─────────────────────── THE SCI-FI LENS ─────────────────────── */}
      <section aria-labelledby="home-sci-fi-lens" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-cream/10 pb-5">
          <h2
            id="home-sci-fi-lens"
            className="font-display text-5xl font-bold tracking-wide text-magenta sm:text-6xl"
          >
            The Sci-Fi Lens
          </h2>
          <Link
            href="/sci-fi-lens"
            className="font-mono text-[0.7rem] uppercase tracking-wide2 text-dim transition-colors hover:text-magenta"
          >
            All essays →
          </Link>
        </div>
        {lens ? (
          <article className="group relative grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-magenta">{FORMATS["sci-fi-lens"].name}</p>
              <h3 className="mt-4 font-display text-4xl leading-[1.02] tracking-wide text-cream">
                <Link href={postHref(lens)} className="transition-colors group-hover:text-magenta">
                  {lens.title}
                </Link>
              </h3>
              <p className="mt-4 text-lg italic leading-relaxed text-dim">{lens.excerpt}</p>
              <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer">
                {formatDateStamp(lens.date)} · {lens.author.name} ·{" "}
                {lens.readingMinutes} min read
              </p>
            </div>
            <blockquote className="self-center border-l-[3px] border-magenta py-2 pl-8 lg:ml-8">
              <p className="text-2xl italic leading-snug text-cream/90">
                “{pulledQuote(lens)}”
              </p>
            </blockquote>
          </article>
        ) : (
          <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
            The lens is being polished.
          </p>
        )}
      </section>

      {/* ──────────────────── FROM THE SUNDAY LETTER ──────────────────── */}
      {letter && (
        <section
          aria-labelledby="home-sunday-letter"
          className="relative border-t border-cream/10"
        >
          <div className="pointer-events-none absolute inset-0 glow-gold-center" />
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
            <p className="eyebrow text-gold">From the Sunday Letter</p>
            <h2
              id="home-sunday-letter"
              className="mt-4 font-display text-4xl tracking-wide text-cream"
            >
              {letter.title}
            </h2>
            <p className="mt-8 text-left text-[1.15rem] leading-[1.75] text-cream/90">
              {firstParagraph(letter.content)}
            </p>
            <div aria-hidden className="mx-auto mt-10 h-[2px] w-24 bg-gold" />
            <p className="mt-8">
              <Link
                href={postHref(letter)}
                className="font-mono text-xs uppercase tracking-wide2 text-gold transition-colors hover:text-cream"
              >
                Read the full letter →
              </Link>
            </p>
            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-wide2 text-dimmer">
              {formatDate(letter.date)}
            </p>
          </div>
        </section>
      )}

      {/* ─────────────────────── NEWSLETTER CTA ─────────────────────── */}
      <NewsletterCTA />
    </>
  );
}

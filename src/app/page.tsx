import Image from "next/image";
import Link from "next/link";
import { ArticleCard, FeatureCard, postHref, SideCard } from "@/components/ArticleCard";
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
  const [featured, latestAll, transmissions, deepReads, sciFi, sundayLetter] =
    await Promise.all([
      getFeaturedPost(),
      getPosts({ perPage: 8, revalidate: REVALIDATE.home }),
      getPosts({ category: "transmissions", perPage: 4, revalidate: REVALIDATE.home }),
      getPosts({ category: "deep-read", perPage: 3, revalidate: REVALIDATE.home }),
      getPosts({ category: "sci-fi-lens", perPage: 1, revalidate: REVALIDATE.home }),
      getPosts({ category: "sunday-letter", perPage: 1, revalidate: REVALIDATE.home }),
    ]);

  const rail = latestAll.posts
    .filter((p) => p.id !== featured?.id)
    .slice(0, 3);
  const lens = sciFi.posts[0];
  const letter = sundayLetter.posts[0];

  return (
    <>
      {/* ─────────── MASTHEAD — compact cinematic band ─────────── */}
      <section
        aria-label="Android Dreams"
        className="relative overflow-hidden border-b border-cream/10"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 glow-cyan-left" />
        <div className="pointer-events-none absolute inset-0 glow-magenta-right" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_auto_1fr] lg:gap-14">
          <div>
            <h1 className="font-display font-bold leading-[0.95] tracking-[0.06em]">
              <span className="block text-[clamp(2.75rem,6.5vw,4.75rem)] text-cream">
                ANDROID DREAMS
              </span>
            </h1>
            <p className="mt-4 font-serif text-sm font-medium uppercase tracking-[0.18em] text-orange sm:text-base">
              Imagine the future
            </p>
            <p className="mt-5 max-w-lg font-serif text-lg font-light leading-relaxed text-cream/80">
              Quantum technology, artificial intelligence, and the deep
              science building our sci-fi future — reported from the frontier.
            </p>
            <p className="mt-6 font-serif text-[0.72rem] font-semibold uppercase tracking-wide4 text-cream/65">
              Vol 01 · {new Date().getUTCFullYear()} · Presented in 2.39:1
            </p>
          </div>

          {/* The seam */}
          <div aria-hidden className="hidden w-[3px] self-stretch rounded-full bg-orange lg:block" />
          <div aria-hidden className="h-[3px] w-24 rounded-full bg-orange lg:hidden" />

          <div className="relative flex items-center justify-center">
            <Image
              src="/brand/ad-mark.jpg"
              alt="The Android Dreams mark: a portrait split at a glowing seam — half human face in cool blue light, half machine in deep crimson."
              width={2351}
              height={2351}
              priority
              sizes="(min-width: 1024px) 32vw, 70vw"
              className="max-h-[38vh] w-auto rounded-xl shadow-float-lg"
            />
          </div>
        </div>
      </section>

      {/* ─────────── LEAD STORY + THE LATEST rail ─────────── */}
      <section aria-labelledby="lead-latest" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 id="lead-latest" className="sr-only">
          Top stories
        </h2>
        <div className="grid gap-5 lg:grid-cols-[5fr_3fr]">
          {/* Lead: text beside image, one card */}
          {featured ? (
            <FeatureCard post={featured} priority />
          ) : (
            <div className="floaty-static border border-cream/[0.07] bg-panel p-9">
              <p className="font-serif text-[0.9rem] font-bold text-orange">
                Transmission pending
              </p>
              <p className="mt-4 font-light text-dim">
                The first feature is on its way from the frontier.
              </p>
            </div>
          )}

          {/* Stacked side cards */}
          <div className="grid content-start gap-5">
            {rail.length > 0 ? (
              rail.map((post) => <SideCard key={post.id} post={post} />)
            ) : (
              <p className="font-serif text-sm font-medium text-cream/65">
                Awaiting the first signals.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────── TRANSMISSIONS row ──────────────────── */}
      <section aria-labelledby="home-transmissions" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {transmissions.posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="font-serif text-xs font-semibold uppercase tracking-wide2 text-cream/65">
            Awaiting the first dispatch.
          </p>
        )}
      </section>

      {/* ─────────────────────── THE DEEP READ row ─────────────────────── */}
      <section
        aria-labelledby="home-deep-read"
        className="relative border-y border-cream/10 bg-cream/[0.015]"
      >
        <div className="pointer-events-none absolute inset-0 glow-cyan-tr" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
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
          {deepReads.posts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {deepReads.posts.map((post) => (
                <ArticleCard key={post.id} post={post} showImage />
              ))}
            </div>
          ) : (
            <p className="font-serif text-xs font-semibold uppercase tracking-wide2 text-cream/65">
              The first deep read is being written.
            </p>
          )}
        </div>
      </section>

      {/* ─────────────────────── THE SCI-FI LENS ─────────────────────── */}
      <section aria-labelledby="home-sci-fi-lens" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-cream/10 pb-5">
          <h2
            id="home-sci-fi-lens"
            className="font-display text-4xl font-bold tracking-wide text-magenta sm:text-5xl"
          >
            The Sci-Fi Lens
          </h2>
          <Link
            href="/sci-fi-lens"
            className="font-serif text-[0.76rem] font-semibold uppercase tracking-wide2 text-cream/80 transition-colors hover:text-magenta"
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
              <p className="mt-6 font-serif text-[0.72rem] font-semibold uppercase tracking-wide2 text-cream/65">
                {formatDateStamp(lens.date)} · {lens.author.name} ·{" "}
                {lens.readingMinutes} min read
              </p>
            </div>
            <blockquote className="self-center rounded-r-xl border-l-[3px] border-magenta bg-magenta/[0.05] py-5 pl-8 pr-6 lg:ml-8">
              <p className="text-2xl italic leading-snug text-cream/90">
                “{pulledQuote(lens)}”
              </p>
            </blockquote>
          </article>
        ) : (
          <p className="font-serif text-xs font-semibold uppercase tracking-wide2 text-cream/65">
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
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <p className="eyebrow text-gold">From the Sunday Letter</p>
            <h2
              id="home-sunday-letter"
              className="mt-4 font-display text-4xl font-bold tracking-wide text-cream"
            >
              {letter.title}
            </h2>
            <p className="mt-8 text-left text-[1.15rem] leading-[1.75] text-cream/90">
              {firstParagraph(letter.content)}
            </p>
            <div aria-hidden className="mx-auto mt-10 h-[2px] w-24 rounded-full bg-gold" />
            <p className="mt-8">
              <Link
                href={postHref(letter)}
                className="font-serif text-xs font-semibold uppercase tracking-wide2 text-gold transition-colors hover:text-cream"
              >
                Read the full letter →
              </Link>
            </p>
            <p className="mt-3 font-serif text-[0.68rem] font-medium uppercase tracking-wide2 text-cream/65">
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

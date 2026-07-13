import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";
import type { Post } from "@/lib/types";
import { formatDateStamp } from "@/lib/utils";

/** The QFrontline mark: prompt · wordmark · cursor bar. One unit, always. */
export function QfLockup({ word = "qfrontline" }: { word?: string }) {
  return (
    <span className="inline-flex items-baseline gap-[0.18em]">
      <span aria-hidden className="font-qf-mono font-medium text-qf-signal">
        &gt;
      </span>
      <span className="font-qf-sans font-bold lowercase tracking-[-0.035em] text-qf-ink">
        {word}
      </span>
      <span
        aria-hidden
        className="inline-block h-[0.72em] w-[0.14em] translate-y-[0.04em] animate-cursor bg-qf-signal"
      />
    </span>
  );
}

/** Title-bar strip shared by the terminal cards. */
export function TerminalBar({ post }: { post: Post }) {
  const isBrief = post.tags.some((t) => t.slug === "dev-brief");
  return (
    <div className="flex items-center justify-between gap-3 border-b border-qf-void/15 bg-qf-void px-4 py-2">
      <p className="truncate font-qf-mono text-[0.65rem] text-qf-ink/80">
        <span aria-hidden className="text-qf-signal">&gt; </span>
        {isBrief ? "dev_brief" : "qfrontline"} · {formatDateStamp(post.date)}
      </p>
      <span
        aria-hidden
        className="h-[0.8em] w-[0.4em] shrink-0 bg-qf-signal opacity-60 transition-opacity group-hover:animate-cursor group-hover:opacity-100"
      />
    </div>
  );
}

/**
 * Terminal-window post card: half image, half terminal — arranged like
 * the Android Dreams cards. Standard cards stack image over terminal;
 * the lead puts the terminal beside a full-height image.
 */
export function TerminalCard({ post, lead = false }: { post: Post; lead?: boolean }) {
  if (lead) {
    return (
      <article className="floaty-light group relative grid overflow-hidden rounded-xl border border-qf-void/15 bg-white hover:border-qf-signal/60 lg:grid-cols-[6fr_7fr]">
        <div className="order-2 flex flex-col lg:order-1">
          <TerminalBar post={post} />
          <div className="flex flex-1 flex-col p-7 sm:p-8">
            <h3 className="font-qf-sans text-2xl font-semibold leading-snug tracking-tight text-qf-void sm:text-3xl">
              <Link href={`/qfrontline/${post.slug}`}>
                <span className="absolute inset-0" aria-hidden />
                {post.title}
              </Link>
            </h3>
            <p className="mt-3 line-clamp-4 font-qf-mono text-[0.85rem] leading-relaxed text-qf-void/65">
              {post.excerpt}
            </p>
            <p className="mt-auto pt-4 font-qf-mono text-[0.62rem] uppercase tracking-[0.15em] text-qf-void/45">
              {post.author.name} · {post.readingMinutes} min
            </p>
          </div>
        </div>
        <ImageSlot
          bare
          image={post.featuredImage}
          className="order-1 aspect-[16/9] lg:order-2 lg:aspect-auto lg:min-h-[20rem]"
          label="LEAD IMAGE SLOT"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </article>
    );
  }

  return (
    <article className="floaty-light group relative flex h-full flex-col overflow-hidden rounded-xl border border-qf-void/15 bg-white hover:border-qf-signal/60">
      <ImageSlot bare image={post.featuredImage} className="aspect-[16/9]" />
      <TerminalBar post={post} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-qf-sans text-xl font-semibold leading-snug tracking-tight text-qf-void">
          <Link href={`/qfrontline/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 font-qf-mono text-[0.75rem] leading-relaxed text-qf-void/65">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-4 font-qf-mono text-[0.62rem] uppercase tracking-[0.15em] text-qf-void/45">
          {post.author.name} · {post.readingMinutes} min
        </p>
      </div>
    </article>
  );
}

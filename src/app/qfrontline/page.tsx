import type { Metadata } from "next";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDateStamp, truncate } from "@/lib/utils";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

const QF_SUBSCRIBE_URL =
  process.env.NEXT_PUBLIC_QF_SUBSCRIBE_URL ||
  "https://qfrontline.beehiiv.com/subscribe";

export const metadata: Metadata = {
  title: "QFrontline — Quantum Technology for Builders",
  description:
    "The developer vertical inside Android Dreams — technical depth, working code, and the weekly Dev Brief that keeps quantum builders at the frontier.",
  alternates: {
    canonical: "/qfrontline",
    types: {
      "application/rss+xml": [
        { url: "/qfrontline/rss.xml", title: "QFrontline · Android Dreams" },
      ],
    },
  },
};

const AUDIENCES = [
  {
    title: "Classical Developers",
    body: "You ship software today and suspect quantum is about to become your problem. It is — and that's good news. We map the stack in your language: compilers, SDKs, APIs, and the shortest path from what you know to what's next.",
  },
  {
    title: "Quantum Developers",
    body: "You already write circuits and fight decoherence for a living. We track the tooling, the hardware access, the benchmarks worth trusting, and the weekly delta — so your attention goes to building, not monitoring.",
  },
  {
    title: "Researchers",
    body: "You need the engineering reality behind the papers — what actually runs, on which hardware, at what fidelity. We report from the place where theory meets the noise floor.",
  },
];

/** The primary mark: prompt · wordmark · cursor bar. One unit, always. */
function Lockup({ word = "qfrontline" }: { word?: string }) {
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

/** Terminal-window post card — the Dev Brief aesthetic, for every post. */
function TerminalCard({ post }: { post: Post }) {
  const isBrief = post.tags.some((t) => t.slug === "dev-brief");
  return (
    <article className="group relative flex h-full flex-col border border-qf-void/15 bg-white transition-all hover:border-qf-signal/60 hover:shadow-[0_2px_28px_rgba(255,43,94,0.12)]">
      {/* Title bar */}
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
      {/* Body */}
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

export default async function QFrontlinePage() {
  const [latest, briefs] = await Promise.all([
    getPosts({
      category: "qfrontline",
      excludeTag: "dev-brief",
      perPage: 6,
      revalidate: REVALIDATE.archive,
    }),
    getPosts({
      category: "qfrontline",
      tag: "dev-brief",
      perPage: 3,
      revalidate: REVALIDATE.archive,
    }),
  ]);

  // Hero signal feed: newest posts across the vertical, briefs included.
  const feed = [...latest.posts, ...briefs.posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="bg-white text-qf-void">
      {/* ─────────────── HERO — the masthead, full screen ─────────────── */}
      <section
        aria-label="QFrontline"
        className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-qf-void"
      >
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        {/* Oversized ghost prompt, watermark of the mark */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[4rem] top-1/2 hidden -translate-y-1/2 select-none font-qf-mono text-[38rem] font-medium leading-none text-qf-ink/[0.03] lg:block"
        >
          &gt;
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Left: lockup, tagline, CTAs */}
          <div>
            <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-dust">
              A section of Android Dreams
            </p>
            <h1 className="mt-8 text-[clamp(3.25rem,8vw,6.75rem)] leading-none">
              <Lockup />
            </h1>
            <p className="mt-8 font-qf-sans text-sm font-extralight uppercase tracking-[0.42em] text-qf-dust sm:text-base">
              Quantum technology for builders.
            </p>
            <p className="mt-8 max-w-xl font-qf-sans text-lg font-light leading-relaxed text-qf-ink/85">
              The developer vertical inside Android Dreams — technical depth,
              working code, and the weekly Dev Brief that keeps quantum
              builders at the frontier.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={QF_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-qf-signal px-7 py-3.5 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
              >
                Subscribe to the Dev Brief
              </a>
              <Link
                href="/community"
                className="group border border-qf-ink/30 px-7 py-3.5 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-ink transition-colors hover:border-qf-signal hover:text-qf-signal"
              >
                <span aria-hidden className="text-qf-signal">&gt; </span>
                qrc · Join the community
              </Link>
            </div>
            <p className="mt-4 font-qf-mono text-[0.62rem] uppercase tracking-[0.2em] text-qf-dust/70">
              Free · Weekly · Five things worth your terminal time
            </p>
          </div>

          {/* Right: the signal feed — a live terminal of the latest posts */}
          <div className="border border-qf-ink/15 bg-[#070410] shadow-[0_0_80px_rgba(255,43,94,0.1)]">
            <div className="flex items-center justify-between gap-3 border-b border-qf-ink/15 px-4 py-2.5">
              <p className="font-qf-mono text-xs text-qf-dust">
                qfrontline — signal.log
              </p>
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2 w-2 border border-qf-dust/40" />
                <span className="h-2 w-2 border border-qf-dust/40" />
                <span className="h-2 w-2 bg-qf-signal/70" />
              </span>
            </div>
            <div className="space-y-4 px-5 py-6 font-qf-mono text-[0.78rem] leading-relaxed">
              <p className="text-qf-dust">$ tail -f signal.log</p>
              {feed.length > 0 ? (
                feed.map((post) => (
                  <p key={post.id} className="text-qf-ink/90">
                    <span aria-hidden className="text-qf-signal">&gt; </span>
                    <span className="text-qf-dust">{formatDateStamp(post.date)}</span>{" "}
                    <Link
                      href={`/qfrontline/${post.slug}`}
                      className="transition-colors hover:text-qf-signal"
                    >
                      {truncate(post.title, 64)}
                    </Link>
                  </p>
                ))
              ) : (
                <p className="text-qf-ink/70">
                  <span aria-hidden className="text-qf-signal">&gt; </span>
                  awaiting first signal…
                </p>
              )}
              <p aria-hidden>
                <span className="text-qf-signal">&gt; </span>
                <span className="inline-block h-[0.9em] w-[0.45em] translate-y-[0.1em] animate-cursor bg-qf-signal" />
              </p>
            </div>
          </div>
        </div>

        {/* The bar, closing the masthead line */}
        <div aria-hidden className="relative h-[3px] w-full bg-qf-signal" />
      </section>

      {/* ─────────────────── LATEST FROM QFRONTLINE ─────────────────── */}
      <section aria-labelledby="qf-latest" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-qf-void/10 pb-5">
          <h2
            id="qf-latest"
            className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
          >
            Latest from QFrontline
          </h2>
          <span className="font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-void/50">
            Weekly
          </span>
        </div>
        {latest.posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.posts.map((post) => (
              <TerminalCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void/50">
            First posts compiling.
          </p>
        )}
      </section>

      {/* ──────────── THE DEV BRIEF — its own category shelf ──────────── */}
      <section
        aria-labelledby="dev-brief"
        className="border-y border-qf-void/10 bg-qf-void/[0.025]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-qf-void/10 pb-5">
            <div>
              <h2
                id="dev-brief"
                className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
              >
                The Dev Brief
              </h2>
              <p className="mt-2 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void/50">
                The weekly newsletter · Five things worth your attention
              </p>
            </div>
            <a
              href={QF_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-qf-signal px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
            >
              Subscribe
            </a>
          </div>
          {briefs.posts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {briefs.posts.map((post) => (
                <TerminalCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void/50">
              Issue 001 is compiling. Subscribe to receive it first.
            </p>
          )}
        </div>
      </section>

      {/* ─────────────────────── WHO IT SERVES ─────────────────────── */}
      <section aria-labelledby="qf-serves" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2
          id="qf-serves"
          className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
        >
          Who it serves
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <div key={a.title} className="border border-qf-void/10 bg-white p-6">
              <p className="font-qf-mono text-xs text-qf-signal-deep">
                [{String(i + 1).padStart(2, "0")}]
              </p>
              <h3 className="mt-3 font-qf-sans text-2xl font-semibold tracking-tight text-qf-void">
                {a.title}
              </h3>
              <p className="mt-3 font-qf-sans text-[0.95rem] font-light leading-relaxed text-qf-void/75">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── THE COMMUNITY — QFrontline is the entrance to QRC ───────── */}
      <section aria-labelledby="qrc" className="relative overflow-hidden bg-qf-void">
        <div aria-hidden className="h-[3px] w-full bg-qf-signal" />
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-dust">
            Where the column becomes practice
          </p>
          <h2 id="qrc" className="mt-6 flex items-baseline gap-[0.18em] text-5xl sm:text-6xl">
            <span aria-hidden className="font-qf-mono font-medium text-qf-signal">
              &gt;
            </span>
            <span className="font-qf-sans font-bold lowercase tracking-[-0.035em] text-qf-ink">
              qrc
            </span>
            <span
              aria-hidden
              className="inline-block h-[0.72em] w-[0.14em] translate-y-[0.04em] animate-cursor bg-qf-signal"
            />
          </h2>
          <p className="mt-4 font-qf-sans text-2xl font-semibold tracking-tight text-qf-ink">
            The Quantum Readiness Community
          </p>
          <p className="mt-4 max-w-2xl font-qf-sans text-lg font-light leading-relaxed text-qf-ink/85">
            Every Dev Brief ends with a question worth building on. QRC is
            where that happens — the community layer of QFrontline, where
            editorial signal turns into working groups, portfolio artifacts,
            and career visibility.
          </p>
          <ul className="mt-8 grid max-w-3xl gap-4 font-qf-mono text-[0.8rem] leading-relaxed text-qf-ink/80 sm:grid-cols-3">
            <li>
              <span aria-hidden className="text-qf-signal">&gt; </span>
              Structured, sourced discussion — no hype, no vendors steering
            </li>
            <li>
              <span aria-hidden className="text-qf-signal">&gt; </span>
              Four-week workgroups that end in a repo, brief, or demo
            </li>
            <li>
              <span aria-hidden className="text-qf-signal">&gt; </span>
              Career visibility earned through contribution
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/community"
              className="bg-qf-signal px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
            >
              Explore the community
            </Link>
            <Link
              href="/community/join"
              className="border border-qf-ink/30 px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-ink transition-colors hover:border-qf-signal hover:text-qf-signal"
            >
              Request an invite
            </Link>
          </div>
        </div>
      </section>

      {/* Attribution */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-center font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-void/50">
          <span aria-hidden className="text-qf-signal-deep">&gt; </span>
          A section of{" "}
          <Link
            href="/"
            className="text-qf-void/70 underline decoration-qf-signal/40 underline-offset-4 transition-colors hover:text-qf-signal-deep"
          >
            Android Dreams
          </Link>
        </p>
      </section>
    </div>
  );
}

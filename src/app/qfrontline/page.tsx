import type { Metadata } from "next";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDateStamp } from "@/lib/utils";
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
function Lockup() {
  return (
    <span className="inline-flex items-baseline gap-[0.18em]">
      <span aria-hidden className="font-qf-mono font-medium text-qf-signal">
        &gt;
      </span>
      <span className="font-qf-sans font-bold lowercase tracking-[-0.035em] text-qf-ink">
        qfrontline
      </span>
      <span
        aria-hidden
        className="inline-block h-[0.72em] w-[0.14em] translate-y-[0.04em] animate-cursor bg-qf-signal"
      />
    </span>
  );
}

/** Terminal-window post card — the Dev Brief aesthetic, for every post. */
function TerminalCard({ post, lead = false }: { post: Post; lead?: boolean }) {
  const isBrief = post.tags.some((t) => t.slug === "dev-brief");
  return (
    <article className="floaty-light group relative flex h-full flex-col overflow-hidden rounded-xl border border-qf-void/15 bg-white hover:border-qf-signal/60">
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
      <div className={`flex flex-1 flex-col ${lead ? "p-7 sm:p-9" : "p-5"}`}>
        <h3
          className={`font-qf-sans font-semibold leading-snug tracking-tight text-qf-void ${
            lead ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
        >
          <Link href={`/qfrontline/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p
          className={`mt-3 font-qf-mono leading-relaxed text-qf-void/65 ${
            lead ? "line-clamp-4 text-[0.85rem]" : "line-clamp-3 text-[0.75rem]"
          }`}
        >
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
      perPage: 7,
      revalidate: REVALIDATE.archive,
    }),
    getPosts({
      category: "qfrontline",
      tag: "dev-brief",
      perPage: 3,
      revalidate: REVALIDATE.archive,
    }),
  ]);

  const lead = latest.posts[0];
  const rail = [...latest.posts.slice(1), ...briefs.posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <div className="bg-white text-qf-void">
      {/* ─────────── MASTHEAD — compact Void band ─────────── */}
      <section aria-label="QFrontline" className="relative overflow-hidden bg-qf-void">
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 py-12 sm:px-6">
          <div>
            <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-signal">
              A section of Android Dreams
            </p>
            <h1 className="mt-4 text-[clamp(2.75rem,6vw,4.5rem)] leading-none">
              <Lockup />
            </h1>
            <p className="mt-4 font-qf-sans text-sm font-medium uppercase tracking-[0.18em] text-qf-ink/90 sm:text-base">
              Quantum technology for builders.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={QF_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-qf-signal px-7 py-3.5 text-center font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
            >
              Subscribe to the Dev Brief
            </a>
            <Link
              href="/community"
              className="rounded-lg border border-qf-ink/30 px-7 py-3.5 text-center font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-ink transition-colors hover:border-qf-signal hover:text-qf-signal"
            >
              <span aria-hidden className="text-qf-signal">&gt; </span>
              qrc · Join the community
            </Link>
          </div>
        </div>
        <div aria-hidden className="h-[3px] w-full bg-qf-signal" />
      </section>

      {/* ─────────── LEAD + LATEST SIGNALS rail ─────────── */}
      <section aria-labelledby="qf-lead" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 id="qf-lead" className="sr-only">
          Top stories
        </h2>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {lead ? (
            <TerminalCard post={lead} lead />
          ) : (
            <div className="rounded-xl border border-qf-void/15 p-9 font-qf-mono text-sm text-qf-void/60">
              <span aria-hidden className="text-qf-signal">&gt; </span>
              first posts compiling…
            </div>
          )}

          <aside aria-labelledby="latest-signals">
            <h3
              id="latest-signals"
              className="border-b-2 border-qf-signal pb-3 font-qf-sans text-2xl font-bold tracking-tight text-qf-void"
            >
              Latest signals
            </h3>
            <ul className="mt-2">
              {rail.map((post) => {
                const isBrief = post.tags.some((t) => t.slug === "dev-brief");
                return (
                  <li
                    key={post.id}
                    className="group border-b border-qf-void/10 py-4 last:border-b-0"
                  >
                    <p className="font-qf-mono text-[0.62rem] uppercase tracking-[0.15em] text-qf-signal-deep">
                      <span aria-hidden>&gt; </span>
                      {isBrief ? "dev_brief" : "qfrontline"} · {formatDateStamp(post.date)}
                    </p>
                    <h4 className="mt-1.5 font-qf-sans text-[1.02rem] font-semibold leading-snug text-qf-void">
                      <Link
                        href={`/qfrontline/${post.slug}`}
                        className="transition-colors group-hover:text-qf-signal-deep"
                      >
                        {post.title}
                      </Link>
                    </h4>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      {/* ──────────── THE DEV BRIEF — its own category shelf ──────────── */}
      <section
        aria-labelledby="dev-brief"
        className="border-y border-qf-void/10 bg-qf-void/[0.025]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-qf-void/10 pb-5">
            <div>
              <h2
                id="dev-brief"
                className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
              >
                The Dev Brief
              </h2>
              <p className="mt-2 font-qf-mono text-xs uppercase tracking-[0.15em] text-qf-void/60">
                The weekly newsletter · Five things worth your attention
              </p>
            </div>
            <a
              href={QF_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-qf-signal px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
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
            <p className="font-qf-mono text-xs uppercase tracking-[0.15em] text-qf-void/60">
              Issue 001 is compiling. Subscribe to receive it first.
            </p>
          )}
        </div>
      </section>

      {/* ─────────────────────── WHO IT SERVES ─────────────────────── */}
      <section aria-labelledby="qf-serves" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2
          id="qf-serves"
          className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
        >
          Who it serves
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <div
              key={a.title}
              className="floaty-light rounded-xl border border-qf-void/10 bg-white p-6"
            >
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
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-signal">
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
              className="rounded-lg bg-qf-signal px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
            >
              Explore the community
            </Link>
            <Link
              href="/community/join"
              className="rounded-lg border border-qf-ink/30 px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-ink transition-colors hover:border-qf-signal hover:text-qf-signal"
            >
              Request an invite
            </Link>
          </div>
        </div>
      </section>

      {/* Attribution */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-center font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-void/50">
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

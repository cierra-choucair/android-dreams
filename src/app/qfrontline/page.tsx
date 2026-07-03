import type { Metadata } from "next";
import Link from "next/link";
import { JetBrains_Mono, Outfit } from "next/font/google";
import type { Post } from "@/lib/types";
import { formatDateStamp, stripHtml, truncate } from "@/lib/utils";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

// QFrontline brand v1.0 typography: Outfit for everything visual,
// JetBrains Mono for prompts, code, and metadata. Scoped to this page.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

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

/** Prompt lines derived from the latest Dev Brief post. */
function briefLines(post: Post | undefined): string[] {
  if (!post) {
    return [
      "no brief loaded — first dispatch imminent",
      "subscribe to receive issue_001",
    ];
  }
  return post.content
    .split(/<\/p>/i)
    .map((p) => stripHtml(p))
    .filter((p) => p.length > 24)
    .slice(0, 5)
    .map((p) => truncate(p, 110));
}

/** The primary mark: prompt · wordmark · cursor bar. One unit, always. */
function Lockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.18em] ${className}`}>
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

export default async function QFrontlinePage() {
  const [latest, devBrief] = await Promise.all([
    getPosts({ category: "qfrontline", perPage: 6, revalidate: REVALIDATE.archive }),
    getPosts({
      category: "qfrontline",
      tag: "dev-brief",
      perPage: 1,
      revalidate: REVALIDATE.archive,
    }),
  ]);
  const brief = devBrief.posts[0];

  return (
    <div className={`${outfit.variable} ${jetbrains.variable} bg-white text-qf-void`}>
      {/* ───────────── HERO — Void surface, per brand: masthead/hero ───────────── */}
      <section aria-label="QFrontline" className="relative overflow-hidden bg-qf-void">
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-dust">
            A section of Android Dreams
          </p>
          <h1 className="mt-8 text-[clamp(3rem,9vw,7rem)] leading-none">
            <Lockup />
          </h1>
          <p className="mt-8 font-qf-sans text-sm font-extralight uppercase tracking-[0.42em] text-qf-dust sm:text-base">
            Quantum technology for builders.
          </p>
          <p className="mt-8 max-w-2xl font-qf-sans text-lg font-light leading-relaxed text-qf-ink/85">
            The developer vertical inside Android Dreams — technical depth,
            working code, and the weekly Dev Brief that keeps quantum builders
            at the frontier.
          </p>
        </div>
        {/* The bar, closing the masthead line */}
        <div aria-hidden className="h-[3px] w-full bg-qf-signal" />
      </section>

      {/* ───────────────────────── DEV BRIEF ───────────────────────── */}
      <section aria-labelledby="dev-brief" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2
          id="dev-brief"
          className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
        >
          The Dev Brief
        </h2>
        <p className="mt-2 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void/50">
          Weekly · Five things worth your attention
        </p>

        <div className="mt-8 max-w-3xl border border-qf-void/15">
          <div className="flex items-center justify-between gap-4 border-b border-qf-void/15 bg-qf-void px-5 py-3">
            <p className="font-qf-mono text-xs text-qf-ink">
              <span className="text-qf-signal">&gt;</span> DEV BRIEF
              {brief && (
                <span className="text-qf-dust"> · {formatDateStamp(brief.date)}</span>
              )}
            </p>
            <span aria-hidden className="h-[0.9em] w-[0.45em] animate-cursor bg-qf-signal" />
          </div>
          <div className="space-y-3 px-5 py-6 font-qf-mono text-[0.8rem] leading-relaxed text-qf-void sm:px-6">
            {briefLines(brief).map((line, i) => (
              <p key={i} className="flex gap-3">
                <span aria-hidden className="shrink-0 text-qf-signal">
                  &gt;
                </span>
                <span>{line}</span>
              </p>
            ))}
            {brief && (
              <p className="pt-3">
                <Link
                  href={`/qfrontline/${brief.slug}`}
                  className="border-b border-qf-signal/50 pb-0.5 font-medium text-qf-signal-deep transition-colors hover:border-qf-signal hover:text-qf-signal"
                >
                  read the full brief →
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────── LATEST FROM QFRONTLINE ─────────────────── */}
      <section aria-labelledby="qf-latest" className="border-y border-qf-void/10 bg-qf-void/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
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
                <article
                  key={post.id}
                  className="group relative flex h-full flex-col border border-qf-void/10 bg-white transition-shadow hover:shadow-[0_2px_24px_rgba(10,6,16,0.08)]"
                >
                  <span
                    aria-hidden
                    className="block h-[2px] w-full bg-qf-signal opacity-50 transition-opacity group-hover:opacity-100"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-qf-mono text-[0.6rem] uppercase tracking-[0.25em] text-qf-signal-deep">
                      &gt; qfrontline
                    </p>
                    <h3 className="mt-3 font-qf-sans text-xl font-semibold leading-snug tracking-tight text-qf-void">
                      <Link href={`/qfrontline/${post.slug}`}>
                        <span className="absolute inset-0" aria-hidden />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-2 font-qf-sans text-[0.9rem] font-light leading-relaxed text-qf-void/70">
                      {post.excerpt}
                    </p>
                    <p className="mt-auto pt-4 font-qf-mono text-[0.62rem] uppercase tracking-[0.15em] text-qf-void/50">
                      {formatDateStamp(post.date)}
                      {post.author.name && <> · {post.author.name}</>}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void/50">
              First posts compiling.
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

        {/* Attribution */}
        <p className="mt-16 border-t border-qf-void/10 pt-8 text-center font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-void/50">
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

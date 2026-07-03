import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { FORMATS } from "@/lib/formats";
import type { Post } from "@/lib/types";
import { formatDateStamp, stripHtml, truncate } from "@/lib/utils";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "QFrontline — Quantum Technology for Developers & Builders",
  description:
    "The developer vertical inside Android Dreams — technical depth, terminal aesthetic, and the weekly Dev Brief that keeps quantum builders at the frontier.",
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

/** Faux terminal lines derived from the latest Dev Brief post. */
function terminalLines(post: Post | undefined): string[] {
  if (!post) {
    return [
      "$ ./dev_brief.sh --latest",
      "connecting to frontier …",
      "no brief loaded — first dispatch imminent",
      "subscribe to receive week 01",
      "$ ▌",
    ];
  }
  const paragraphs = post.content
    .split(/<\/p>/i)
    .map((p) => stripHtml(p))
    .filter((p) => p.length > 24)
    .slice(0, 5);
  return paragraphs.map((p) => `> ${truncate(p, 92)}`);
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
  const qf = FORMATS.qfrontline;

  return (
    <div className="relative">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        aria-label="QFrontline"
        className="relative overflow-hidden border-b border-matrix/20"
      >
        <div className="pointer-events-none absolute inset-0 scanlines" />
        <div className="pointer-events-none absolute inset-0 glow-matrix-tl" />
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <h1 className="flex flex-wrap items-baseline gap-1 leading-none">
            <span
              className="text-[clamp(4rem,10vw,8rem)] font-bold text-matrix"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              Q
            </span>
            <span className="font-display text-[clamp(4rem,10vw,8rem)] tracking-wide text-cream">
              FRONTLINE
            </span>
          </h1>
          <p className="mt-6 font-mono text-sm uppercase tracking-wide2 text-matrix sm:text-base">
            Quantum technology for developers &amp; builders.
          </p>
          <p className="mt-6 max-w-2xl text-lg italic leading-relaxed text-dim">
            The developer vertical inside Android Dreams — technical depth,
            terminal aesthetic, and the weekly Dev Brief that keeps quantum
            builders at the frontier.
          </p>
        </div>
      </section>

      {/* ──────────────────── DEV BRIEF TERMINAL ──────────────────── */}
      <section aria-labelledby="dev-brief" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="dev-brief" className="eyebrow text-matrix">
          The Dev Brief · Weekly
        </h2>
        <div className="mt-8 border border-matrix-dark bg-[#040705] shadow-[0_0_60px_rgba(0,255,65,0.06)]">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-matrix-dark bg-[#071009] px-4 py-2.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 border border-matrix/40" />
              <span className="h-2.5 w-2.5 border border-matrix/40" />
              <span className="h-2.5 w-2.5 bg-matrix/40" />
            </span>
            <p className="font-mono text-xs text-matrix/70">
              qfrontline — dev_brief.sh
            </p>
          </div>
          {/* Output */}
          <div className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-[1.9] text-matrix sm:p-6">
            {brief && (
              <p className="text-matrix/60">
                $ ./dev_brief.sh --week {formatDateStamp(brief.date)}
              </p>
            )}
            {terminalLines(brief).map((line, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
            {brief && (
              <p className="mt-4">
                <Link
                  href={`/qfrontline/${brief.slug}`}
                  className="border-b border-matrix/50 pb-0.5 transition-colors hover:border-matrix hover:text-cream"
                >
                  $ open full_brief ↵
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────── LATEST FROM QFRONTLINE ─────────────────── */}
      <section
        aria-labelledby="qf-latest"
        className="relative border-y border-matrix/15 bg-cream/[0.015]"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-matrix/15 pb-5">
            <h2 id="qf-latest" className="font-display text-4xl tracking-wide text-cream sm:text-5xl">
              Latest from QFrontline
            </h2>
            <span className="font-mono text-[0.65rem] uppercase tracking-wide2 text-matrix">
              {qf.cadence}
            </span>
          </div>
          {latest.posts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.posts.map((post) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  accentOverride={{ text: "text-matrix", bg: "bg-matrix" }}
                />
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
              stdout is quiet. First posts compiling.
            </p>
          )}
        </div>
      </section>

      {/* ─────────────────────── WHO IT SERVES ─────────────────────── */}
      <section aria-labelledby="qf-serves" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="qf-serves" className="eyebrow text-matrix">
          Who it serves
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <div key={a.title} className="border border-matrix/20 bg-[#050A06] p-6">
              <p className="font-mono text-xs text-matrix/60">
                [{String(i + 1).padStart(2, "0")}]
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-wide text-cream">
                {a.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-dim">{a.body}</p>
            </div>
          ))}
        </div>

        {/* Attribution */}
        <p className="mt-16 border-t border-matrix/15 pt-8 text-center font-mono text-[0.65rem] uppercase tracking-wide4 text-dimmer">
          A section of{" "}
          <Link href="/" className="text-dim transition-colors hover:text-orange">
            Android Dreams
          </Link>
        </p>
      </section>
    </div>
  );
}

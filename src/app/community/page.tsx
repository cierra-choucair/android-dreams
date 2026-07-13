import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quantum Readiness Community — Practical Quantum Readiness for Builders",
  description:
    "The developer community from QFrontline and Android Dreams. Structured discussion, four-week workgroups, portfolio-ready projects, and career visibility earned through contribution — free to join.",
  alternates: { canonical: "/community" },
};

const NOT_LIST = [
  "Not a general science forum",
  "Not a promotional channel for vendors",
  "Not a space for speculative claims",
];

/** The member journey, reader to builder — shown as a terminal strip. */
const JOURNEY = [
  "read the reporting",
  "join the discussion",
  "build in a workgroup",
  "ship a repo, brief, or demo",
  "get seen for your work",
];

const AUDIENCES = [
  {
    title: "Classical Software & IT",
    body: "Software engineers, cloud and DevOps specialists, platform teams, architects, data professionals, and cybersecurity teams — including experienced technical workers exploring a credible transition into quantum software, post-quantum cryptography, or hybrid infrastructure.",
  },
  {
    title: "Quantum Practitioners",
    body: "Researchers, algorithm developers, quantum software engineers, technical founders, and developer advocates who strengthen the technical quality of the community and keep informed discussion separate from speculation.",
  },
  {
    title: "Technical Decision-Makers",
    body: "CTOs, product leads, innovation teams, enterprise architects, and security leaders who bring practical context on use cases, organizational needs, implementation barriers, and market demand.",
  },
];

const PRINCIPLES = [
  {
    title: "Quality over quantity",
    body: "Fewer substantive discussions beat constant activity without value.",
  },
  {
    title: "Developer relevance is central",
    body: "Topics connect to tools, workflows, architecture, security, algorithms, skills, or careers.",
  },
  {
    title: "Evidence before opinion",
    body: "Claims need a source, implementation detail, benchmark, code reference — or a clear statement of uncertainty.",
  },
  {
    title: "Separate current from unproven",
    body: "Announcements, simulations, demos, pilots, and usable workflows are clearly distinguished.",
  },
  {
    title: "Vendor-neutral by default",
    body: "Vendors may contribute expertise, but never control the direction or framing.",
  },
  {
    title: "Workgroups over chatter",
    body: "Small groups with defined outputs beat broad discussions that lead nowhere.",
  },
  {
    title: "Career access is earned",
    body: "Visibility and introductions follow credible participation and useful work.",
  },
];

const TRACKS = [
  "PQC migration",
  "Cloud QPU access",
  "Hybrid quantum-classical workflows",
  "Algorithms",
  "SDK tooling",
  "Paper-to-practice",
  "Quantum career readiness",
];

const CADENCE = [
  { freq: "Daily", what: "QFrontline thread — one technical question tied to a news item, paper, tool, or market signal." },
  { freq: "2× weekly", what: "Discussion sprint — one article becomes a structured thread: what changed, what is usable, what remains unclear." },
  { freq: "Weekly", what: "Office hour / builder session — live discussion, code walkthrough, paper breakdown, or career Q&A." },
  { freq: "Biweekly", what: "Workgroup review — short demo, repo update, resource brief, or claim-check output." },
  { freq: "Monthly", what: "Readiness session — skill-track review, job-market signals, and member portfolio review." },
  { freq: "Quarterly", what: "QRC Readiness Report — community-derived insights on skills, tools, workgroups, and hiring signals." },
];

function QrcLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.18em] ${className}`}>
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
    </span>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-qf-sans text-4xl font-semibold tracking-tight text-qf-signal sm:text-5xl"
    >
      {children}
    </h2>
  );
}

export default function CommunityPage() {
  const discordUrl = process.env.NEXT_PUBLIC_QRC_DISCORD_URL;
  const linkedinUrl = process.env.NEXT_PUBLIC_QRC_LINKEDIN_URL;

  return (
    <div className="bg-white text-qf-void">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section aria-label="Quantum Readiness Community" className="relative overflow-hidden bg-qf-void">
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-28">
          <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-dust">
            The QFrontline community · An Android Dreams property
          </p>
          <h1 className="mt-8 text-[clamp(3rem,9vw,7rem)] leading-none">
            <QrcLockup />
          </h1>
          <p className="mt-6 font-qf-sans text-3xl font-semibold tracking-tight text-qf-ink sm:text-4xl">
            Quantum Readiness Community
          </p>
          <p className="mt-6 max-w-2xl font-qf-sans text-lg font-light leading-relaxed text-qf-ink/85">
            Practical quantum readiness for developers, IT teams, security
            professionals, and technically oriented builders. QRC turns
            QFrontline&apos;s reporting into structured discussion, working
            groups, technical practice, portfolio projects, and professional
            opportunity.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/community/join"
              className="rounded-lg bg-qf-signal px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
            >
              Request an invite
            </Link>
            <Link
              href="/qfrontline"
              className="rounded-lg border border-qf-ink/30 px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-ink transition-colors hover:border-qf-signal hover:text-qf-signal"
            >
              Read QFrontline first
            </Link>
          </div>
        </div>
        <div aria-hidden className="h-[3px] w-full bg-qf-signal" />
      </section>

      {/* ──────────────── WHAT IT IS / WHAT IT ISN'T ──────────────── */}
      <section aria-labelledby="what-it-is" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle id="what-it-is">What this room is for</SectionTitle>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <p className="max-w-2xl font-qf-sans text-lg font-light leading-relaxed text-qf-void/85">
            QRC helps technical professionals distinguish between current
            applications, unresolved limitations, and credible pathways for
            building skills relevant to the emerging quantum market. The
            minimum standard for participation: technical curiosity,
            source-based discussion, no spam, no false expertise, and a
            willingness to learn openly.
          </p>
          <ul className="space-y-3 self-center">
            {NOT_LIST.map((item) => (
              <li key={item} className="flex gap-3 font-qf-mono text-[0.8rem] text-qf-void/70">
                <span aria-hidden className="text-qf-signal-deep">×</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* The member journey */}
        <p className="mt-12 font-qf-mono text-[0.75rem] uppercase tracking-[0.2em] text-qf-void/50">
          How membership works
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-qf-void/15 bg-qf-void px-5 py-5 shadow-float-light">
          <p className="whitespace-nowrap font-qf-mono text-[0.75rem] leading-loose text-qf-ink">
            <span aria-hidden className="text-qf-signal">&gt; </span>
            {JOURNEY.map((step, i) => (
              <span key={step}>
                {i > 0 && <span aria-hidden className="text-qf-signal"> → </span>}
                {step}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ─────────────────────── WHO IT'S FOR ─────────────────────── */}
      <section
        aria-labelledby="who-its-for"
        className="border-y border-qf-void/10 bg-qf-void/[0.025]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle id="who-its-for">Who it&apos;s for</SectionTitle>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <div key={a.title} className="floaty-light rounded-xl border border-qf-void/10 bg-white p-6">
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
        </div>
      </section>

      {/* ──────────────────── OPERATING PRINCIPLES ──────────────────── */}
      <section aria-labelledby="principles" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle id="principles">How it operates</SectionTitle>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title}>
              <p className="font-qf-mono text-xs text-qf-signal-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-qf-sans text-lg font-semibold tracking-tight text-qf-void">
                {p.title}
              </h3>
              <p className="mt-2 font-qf-sans text-[0.9rem] font-light leading-relaxed text-qf-void/70">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── WORKGROUPS ─────────────────────── */}
      <section aria-labelledby="workgroups" className="border-y border-qf-void/10 bg-qf-void/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle id="workgroups">Built around workgroups</SectionTitle>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="max-w-xl font-qf-sans text-lg font-light leading-relaxed text-qf-void/85">
                Every workgroup runs a four-week cycle and must end with a
                visible output: one lead, one reviewer, three to eight
                members, one defined deliverable — a GitHub repo, an
                implementation note, a resource brief, a claim check, a
                learning path, a market map, or a public demo.
              </p>
              <p className="mt-6 font-qf-mono text-[0.75rem] uppercase tracking-[0.2em] text-qf-void/50">
                Default tracks
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {TRACKS.map((track) => (
                  <li
                    key={track}
                    className="border border-qf-void/15 px-3 py-1 font-qf-mono text-[0.7rem] text-qf-void/75"
                  >
                    {track}
                  </li>
                ))}
              </ul>
            </div>
            <div className="floaty-light rounded-xl border border-qf-void/15 bg-white p-6">
              <p className="font-qf-mono text-[0.75rem] uppercase tracking-[0.2em] text-qf-signal-deep">
                The rhythm
              </p>
              <ul className="mt-4 space-y-3">
                {CADENCE.map((c) => (
                  <li key={c.freq} className="flex gap-4 text-[0.85rem] leading-relaxed">
                    <span className="w-20 shrink-0 font-qf-mono text-[0.7rem] uppercase tracking-wide text-qf-signal-deep">
                      {c.freq}
                    </span>
                    <span className="font-qf-sans font-light text-qf-void/80">{c.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── CAREERS + WHERE IT LIVES ─────────────────── */}
      <section aria-labelledby="careers" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle id="careers">Credible, not just informed</SectionTitle>
        <p className="mt-6 max-w-2xl font-qf-sans text-lg font-light leading-relaxed text-qf-void/85">
          QRC helps members become credible for quantum-adjacent work. The
          portfolio standard: one reproduced tutorial, one interpreted paper,
          one small project, one concise technical write-up. Job threads,
          hiring-signal briefs, recruiter sessions, and portfolio reviews
          prioritize members who contribute.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="floaty-light rounded-xl border border-qf-void/10 bg-white p-7">
            <p className="font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-signal-deep">
              Follow in public
            </p>
            <h3 className="mt-3 font-qf-sans text-2xl font-semibold tracking-tight text-qf-void">
              LinkedIn
            </h3>
            <p className="mt-3 font-qf-sans text-[0.95rem] font-light leading-relaxed text-qf-void/75">
              Visibility, professional identity, expert participation,
              recruiter discovery, and weekly highlights. Concise, sourced,
              discussion-led.
            </p>
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg border border-qf-void/30 px-5 py-2.5 font-qf-mono text-[0.7rem] uppercase tracking-[0.2em] text-qf-void transition-colors hover:border-qf-signal hover:text-qf-signal"
              >
                Follow on LinkedIn →
              </a>
            ) : (
              <p className="mt-5 font-qf-mono text-[0.65rem] uppercase tracking-[0.2em] text-qf-void/40">
                Opening soon
              </p>
            )}
          </div>
          <div className="floaty-light rounded-xl border border-qf-void/10 bg-white p-7">
            <p className="font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-signal-deep">
              Where the work happens
            </p>
            <h3 className="mt-3 font-qf-sans text-2xl font-semibold tracking-tight text-qf-void">
              Discord
            </h3>
            <p className="mt-3 font-qf-sans text-[0.95rem] font-light leading-relaxed text-qf-void/75">
              Onboarding, structured threads, live sessions, workgroups,
              resource library, and project rooms — organized by signal,
              learn, build, and market.
            </p>
            {discordUrl ? (
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-qf-signal px-5 py-2.5 font-qf-mono text-[0.7rem] uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
              >
                Join the Discord →
              </a>
            ) : (
              <Link
                href="/community/join"
                className="mt-5 inline-block rounded-lg bg-qf-signal px-5 py-2.5 font-qf-mono text-[0.7rem] uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
              >
                Request an invite →
              </Link>
            )}
          </div>
        </div>

        {/* Attribution */}
        <p className="mt-16 border-t border-qf-void/10 pt-8 text-center font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-void/50">
          <span aria-hidden className="text-qf-signal-deep">&gt; </span>
          The community of{" "}
          <Link
            href="/qfrontline"
            className="text-qf-void/70 underline decoration-qf-signal/40 underline-offset-4 transition-colors hover:text-qf-signal-deep"
          >
            QFrontline
          </Link>{" "}
          · An{" "}
          <Link
            href="/"
            className="text-qf-void/70 underline decoration-qf-signal/40 underline-offset-4 transition-colors hover:text-qf-signal-deep"
          >
            Android Dreams
          </Link>{" "}
          property
        </p>
      </section>
    </div>
  );
}

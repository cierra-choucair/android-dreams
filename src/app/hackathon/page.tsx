import type { Metadata } from "next";
import Link from "next/link";
import { HackathonSignup } from "@/components/HackathonSignup";

export const metadata: Metadata = {
  title: "The Quantum Hackathon — Universum Labs × CQT Serbia",
  description:
    "Serbia's first applied quantum hackathon, from the Center for Quantum Technologies Serbia and Universum Labs. Real problem statements, beginner-friendly framing — Belgrade, autumn 2026. Sign up for launch updates.",
  alternates: { canonical: "/hackathon" },
};

const PARTNERS = [
  {
    eyebrow: "The Center",
    name: "Center for Quantum Technologies Serbia",
    accent: "text-cyan",
    border: "border-cyan/30",
    wash: "from-cyan/[0.12] to-transparent",
    body: "One of the first dedicated quantum organizations of its kind in Serbia — an independent nonprofit association emerging from the Quantum Serbia community to build quantum education, research capacity, and the foundations of a national quantum ecosystem.",
    role: "Convenes the community · hosts the challenge",
  },
  {
    eyebrow: "The Partner",
    name: "Universum Labs",
    accent: "text-orange",
    border: "border-orange/30",
    wash: "from-orange/[0.12] to-transparent",
    body: "Building quantum intelligence infrastructure — structured use-case analysis, classical-versus-quantum benchmarking, and technology-readiness assessment — with relationships across the international quantum ecosystem of companies, platforms, and education initiatives.",
    role: "Designs the challenges · connects the ecosystem",
  },
];

// Candidate challenge areas — final tracks are announced at launch.
const TRACKS = [
  {
    number: "01",
    title: "Optimization",
    accent: "text-orange",
    wash: "from-orange/[0.14] to-transparent",
    border: "border-orange/30",
    body: "Quantum optimization for logistics and infrastructure — routing, scheduling, and allocation problems drawn from sectors where Serbia already runs deep.",
  },
  {
    number: "02",
    title: "Data Science",
    accent: "text-cyan",
    wash: "from-cyan/[0.14] to-transparent",
    border: "border-cyan/30",
    body: "Quantum algorithms for data science — bringing quantum methods to the datasets and models Serbian teams already work with every day.",
  },
  {
    number: "03",
    title: "Comms & Security",
    accent: "text-magenta",
    wash: "from-magenta/[0.14] to-transparent",
    border: "border-magenta/30",
    body: "Quantum communications and cybersecurity — the networks, and the post-quantum defenses, the next decade will run on.",
  },
];

const FACTS = [
  { value: "Belgrade", label: "Serbia · host city" },
  { value: "Autumn 2026", label: "Dates announced at launch" },
  { value: "Students First", label: "No quantum background required" },
];

/** Two states drifting through each other — the field before measurement. */
function EntangledField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-[8%] top-[8%] h-[70%] w-[55%] animate-drift1 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(58,143,255,0.24), transparent 65%)" }}
      />
      <div
        className="absolute right-[6%] top-[18%] h-[75%] w-[55%] animate-drift2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,138,61,0.16), transparent 65%)" }}
      />
      <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-ringPulse rounded-full border border-cyan/25" />
        <div
          className="absolute inset-0 animate-ringPulse rounded-full border border-cream/20"
          style={{ animationDelay: "4.5s" }}
        />
      </div>
      <div className="absolute inset-0 bg-cyber" />
    </div>
  );
}

export default function HackathonPage() {
  return (
    <div className="relative">
      {/* ──────── HERO — a first for Serbia ──────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden border-b border-cream/10">
        <EntangledField />
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <p className="eyebrow text-cyan">
            Universum Labs × Center for Quantum Technologies Serbia
          </p>
          <h1 className="mt-8 font-display text-6xl font-bold leading-[0.92] tracking-[0.04em] sm:text-8xl">
            <span className="block text-cream">The Quantum</span>
            <span className="block text-cyan">Hackathon</span>
          </h1>
          <p className="mt-8 text-xl italic leading-relaxed text-cyan sm:text-2xl">
            Serbia&apos;s first applied quantum hackathon.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-[1.75] text-cream/85">
            Real problem statements, real quantum tools, and challenges you
            can actually get your hands around — built for students, staged
            in Belgrade. The official launch is coming. Be first in line.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#updates"
              className="floaty rounded-lg bg-cyan px-8 py-4 font-serif text-xs font-semibold uppercase tracking-wide2 text-ink hover:bg-cyan/85"
            >
              Get launch updates
            </a>
            <a
              href="#challenge"
              className="rounded-lg border border-cream/30 px-8 py-4 font-serif text-xs font-semibold uppercase tracking-wide2 text-cream transition-colors hover:border-cyan hover:text-cyan"
            >
              About the challenge
            </a>
          </div>
        </div>
        <p className="relative pb-8 text-center font-serif text-[0.68rem] font-semibold uppercase tracking-wide4 text-cream/65">
          One weekend · Sector-aligned tracks · A country&apos;s first
        </p>
      </section>

      {/* ──────── THE PREMISE ──────── */}
      <section aria-label="The premise" className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-4xl font-bold leading-[1.15] tracking-wide sm:text-6xl">
          <span className="block text-cream/60">Not a lecture.</span>
          <span className="mt-2 block text-cream/80">Not a demo.</span>
          <span className="mt-2 block text-cream">
            A problem worth <span className="text-cyan">solving</span>.
          </span>
        </p>
        <p className="mx-auto mt-10 max-w-2xl text-lg italic leading-relaxed text-dim">
          Most quantum events talk about the future. This one hands you a
          problem that matters, the tools that apply, and a weekend to build
          — proof that Serbia&apos;s quantum community is here, and working.
        </p>
      </section>

      {/* ──────── THE PARTNERS ──────── */}
      <section
        id="partners"
        aria-labelledby="partners-heading"
        className="relative overflow-hidden border-y border-cream/10"
      >
        <div className="pointer-events-none absolute inset-0 bg-cyber" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 id="partners-heading" className="eyebrow text-cyan">
            The partnership
          </h2>
          <p className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-wide text-cream sm:text-5xl">
            Two organizations. One founding bet on Serbian quantum.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className={`floaty relative overflow-hidden border ${partner.border} bg-gradient-to-b ${partner.wash} bg-cream/[0.02] p-9`}
              >
                <p className={`eyebrow ${partner.accent}`}>{partner.eyebrow}</p>
                <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-wide text-cream">
                  {partner.name}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-dim">{partner.body}</p>
                <p
                  className={`mt-6 font-serif text-[0.7rem] font-semibold uppercase tracking-wide2 ${partner.accent}`}
                >
                  {partner.role}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-lg italic leading-relaxed text-dim">
            A founding strategic partnership: the Center convenes Serbia&apos;s
            emerging quantum community, and Universum Labs turns quantum use
            cases into challenges students can win.
          </p>
        </div>
      </section>

      {/* ──────── ABOUT THE CHALLENGE ──────── */}
      <section aria-labelledby="challenge-heading" id="challenge" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="challenge-heading" className="eyebrow text-cyan">
          About the challenge
        </h2>
        <p className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-wide text-cream sm:text-5xl">
          Challenges you understand. Problems that matter.
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-dim">
          Every track starts from a real quantum use case — assessed for
          technical maturity, matched against its classical baseline, and
          chosen for its relevance to Serbia&apos;s industry and research
          strengths. You&apos;ll know exactly what you&apos;re solving, why
          the problem matters, and which quantum tools apply. No deep quantum
          training required to enter: each challenge comes with
          beginner-friendly framing, recommended tools, and clear judging
          criteria.
        </p>

        <p className="mt-14 font-serif text-[0.72rem] font-semibold uppercase tracking-wide4 text-cream/65">
          Candidate challenge areas · final tracks announced at launch
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {TRACKS.map((track) => (
            <div
              key={track.number}
              className={`floaty relative overflow-hidden border ${track.border} bg-gradient-to-b ${track.wash} bg-cream/[0.02] p-8`}
            >
              <p
                aria-hidden
                className={`font-display text-7xl font-bold leading-none ${track.accent} opacity-30`}
              >
                {track.number}
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold leading-none tracking-wide text-cream">
                {track.title}
              </h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-dim">{track.body}</p>
              <p className={`mt-6 font-serif text-[0.7rem] font-semibold uppercase tracking-wide2 ${track.accent}`}>
                Problem statement · tools · judging criteria
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[0.98rem] italic leading-relaxed text-dimmer">
          The final challenge tracks are being selected now, guided by a
          structured review of which quantum use cases are technically ready,
          relevant to Serbia, and right-sized for a student weekend. Sign up
          below and you&apos;ll be the first to know when they&apos;re
          announced.
        </p>
      </section>

      {/* ──────── FAST FACTS ──────── */}
      <section aria-label="When and where" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div
              key={fact.value}
              className="floaty-static border border-cyan/25 bg-ink/70 px-6 py-6 text-center backdrop-blur-sm"
            >
              <p className="font-display text-3xl font-bold tracking-wide text-cyan">{fact.value}</p>
              <p className="mt-2 font-serif text-[0.68rem] font-semibold uppercase tracking-wide2 text-cream/65">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── EMAIL CAPTURE — stay up to date ──────── */}
      <section id="updates" aria-labelledby="updates-heading" className="relative border-t border-cream/10">
        <div className="pointer-events-none absolute inset-0 glow-cyan-tr" />
        <div className="pointer-events-none absolute inset-0 bg-cyber" />
        <div className="relative mx-auto max-w-2xl px-4 py-24 sm:px-6">
          <h2
            id="updates-heading"
            className="text-center font-display text-5xl font-bold tracking-wide text-cream"
          >
            Be first at the starting line.
          </h2>
          <p className="mt-4 text-center text-lg italic leading-relaxed text-dim">
            Challenge tracks, dates, and registration all land by email
            before they&apos;re public. A handful of messages between now and
            launch — no noise.
          </p>
          <div className="floaty-static mt-12 border border-cyan/20 bg-ink/60 p-8 backdrop-blur-sm sm:p-10">
            <HackathonSignup />
          </div>
          <p className="mt-6 text-center font-serif text-[0.68rem] font-semibold uppercase tracking-wide2 text-cream/65">
            Your address is used for hackathon updates only.
          </p>
          <p className="mt-10 text-center">
            <Link
              href="/contact"
              className="font-serif text-xs font-semibold uppercase tracking-wide2 text-cyan transition-colors hover:text-cream"
            >
              Universities, sponsors, platforms — talk to us →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

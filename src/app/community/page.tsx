import type { Metadata } from "next";
import Link from "next/link";
import { CircleDot, MessagesSquare, Radio, Swords } from "lucide-react";

export const metadata: Metadata = {
  title: "Quantum Readiness Community",
  description:
    "For the developers, researchers, and builders learning to make quantum come alive. Gated content, live sessions with practitioners, and a room of people building the same future.",
  alternates: { canonical: "/community" },
};

const BENEFITS = [
  {
    icon: CircleDot,
    title: "Gated Content",
    body: "Member-only briefings, deep tutorials, and the working notes behind our reporting — the material too specific for the magazine and too valuable to lose.",
  },
  {
    icon: Radio,
    title: "Monthly Live Sessions",
    body: "Practitioners, not keynote speakers. Every month, someone who builds quantum systems for a living walks through what they're building and takes your questions.",
  },
  {
    icon: MessagesSquare,
    title: "Private Discussion Space",
    body: "A Discord/Circle space where the questions are technical, the answers are sourced, and nobody is farming engagement.",
  },
  {
    icon: Swords,
    title: "Niels' Chess",
    body: "Our strategy salon for Builder tier and above — a recurring session where members war-game where the field moves next, and what to do about it.",
  },
];

const TIERS = [
  {
    name: "Community",
    price: 19,
    highlight: false,
    features: ["Gated content library", "Monthly live sessions", "Private discussion space"],
  },
  {
    name: "Builder",
    price: 49,
    highlight: true,
    features: [
      "Everything in Community",
      "Niels' Chess access",
      "Session archives & working notes",
      "Early access to Summit registration",
    ],
  },
  {
    name: "Enterprise",
    price: 199,
    highlight: false,
    features: [
      "Everything in Builder",
      "Team access — 5 seats",
      "Private onboarding session",
      "Quarterly readiness review",
    ],
  },
];

const REASONS = [
  {
    number: "01",
    title: "The window is open",
    body: "Quantum advantage is moving from paper to practice on a timeline measured in quarters, not decades. The people who understand it early will set the defaults everyone else inherits.",
  },
  {
    number: "02",
    title: "The signal is scattered",
    body: "The knowledge exists — in papers, repos, conference hallways, and the heads of a few hundred practitioners. Nobody has gathered it into a room. This is the room.",
  },
  {
    number: "03",
    title: "Readiness is a practice",
    body: "You don't get ready for a platform shift by reading about it once. You get ready by building, asking, and correcting course in the company of people doing the same.",
  },
];

export default function CommunityPage() {
  return (
    <div className="relative">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 rings opacity-70" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 30% 20%, rgba(232,25,125,0.14), transparent 70%), radial-gradient(ellipse 55% 60% at 80% 90%, rgba(138,79,255,0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <p className="eyebrow text-violet">Android Dreams Media</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-wide sm:text-7xl lg:text-8xl">
            <span className="text-cream">Quantum Readiness</span>{" "}
            <span className="text-magenta">Community</span>
          </h1>
          <p className="mt-8 text-xl italic leading-relaxed text-dim sm:text-2xl">
            For the developers, researchers, and builders learning to make
            quantum come alive.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-cream/80">
            The paid layer of the Android Dreams ecosystem: a private room
            where the reporting becomes practice. Members get the material we
            can't publish, the practitioners we can't book twice, and each
            other — the rarest resource in a field this young.
          </p>
        </div>
      </section>

      {/* ──────────────────── WHAT MEMBERS GET ──────────────────── */}
      <section aria-labelledby="benefits" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="benefits" className="eyebrow text-magenta">
          What members get
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="border border-cream/10 bg-cream/[0.02] p-6">
              <b.icon size={22} strokeWidth={1.25} className="text-magenta" aria-hidden />
              <h3 className="mt-4 font-display text-2xl tracking-wide text-cream">{b.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-dim">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── TIERS ─────────────────────────── */}
      <section
        aria-labelledby="tiers"
        className="relative border-y border-cream/10 bg-cream/[0.015]"
      >
        <div className="pointer-events-none absolute inset-0 glow-magenta-center opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 id="tiers" className="eyebrow text-magenta">
            Membership
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col border p-8 ${
                  tier.highlight
                    ? "border-magenta/60 bg-magenta/[0.04] shadow-[0_0_50px_rgba(232,25,125,0.15)]"
                    : "border-cream/10 bg-ink"
                }`}
              >
                {tier.highlight && (
                  <p className="absolute -top-3 left-8 bg-magenta px-3 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide2 text-ink">
                    Recommended
                  </p>
                )}
                <h3 className="font-display text-3xl tracking-wide text-cream">{tier.name}</h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-6xl text-cream">${tier.price}</span>
                  <span className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
                    /mo
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] leading-relaxed text-dim">
                      <span
                        aria-hidden
                        className={`mt-[0.55rem] h-1.5 w-1.5 shrink-0 ${
                          tier.highlight ? "bg-magenta" : "bg-cream/30"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/community/join"
                  className={`mt-8 block px-6 py-3 text-center font-mono text-xs uppercase tracking-wide2 transition-colors ${
                    tier.highlight
                      ? "bg-magenta text-ink hover:bg-magenta/85"
                      : "border border-cream/25 text-cream hover:border-magenta hover:text-magenta"
                  }`}
                >
                  Join {tier.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── WHY NOW ─────────────────────────── */}
      <section aria-labelledby="why-now" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="why-now" className="eyebrow text-violet">
          Why now
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.number} className="border border-cream/10 bg-cream/[0.02] p-6">
              <p className="font-mono text-xs tracking-wide2 text-violet">{r.number}</p>
              <h3 className="mt-3 font-display text-2xl tracking-wide text-cream">{r.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-dim">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── FOUNDER'S NOTE ─────────────────────── */}
      <section aria-labelledby="founders-note" className="relative border-t border-cream/10">
        <div className="pointer-events-none absolute inset-0 glow-magenta-br" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 id="founders-note" className="eyebrow text-magenta">
            A note from the founder
          </h2>
          <div className="mt-8 border-l-[3px] border-magenta pl-6 sm:pl-8">
            <p className="text-[1.15rem] italic leading-[1.75] text-cream/90">
              I started this community because the most useful conversations I
              have about quantum never happen on a stage. They happen after —
              in the hallway, over a laptop, with someone halfway through
              building the thing. The Quantum Readiness Community is that
              hallway, made permanent. It is small on purpose, technical on
              purpose, and hopeful on purpose. If you are learning to make
              quantum come alive, you should not have to do it alone.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wide2 text-dim">
              — Cierra Lunde Choucair · Founder, Android Dreams Media
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

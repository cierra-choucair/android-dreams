import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "House of Quantum — By Invitation · 2028",
  description:
    "Quantum is arriving faster than the rooms set up to discuss it. We are building one of those rooms. This is where it begins.",
  alternates: { canonical: "/davos" },
};

const META_TILES = [
  { value: "2028", label: "Coming Soon" },
  { value: "Five Days", label: "One Week" },
  { value: "By Invitation", label: "A Small Room" },
];

const PILLARS = [
  "Quantum Intelligence Briefings",
  "CEO Readiness Dialogues",
  "Investor Intelligence Sessions",
  "The Open Stage",
  "The Quantum Room",
];

export default function DavosPage() {
  return (
    <div className="relative">
      {/* ─────────────────── STEALTH HERO — single screen ─────────────────── */}
      <section
        aria-label="House of Quantum"
        className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden border-b border-gold/20"
      >
        <div className="pointer-events-none absolute inset-0 bg-cyber" />
        {/* A slow sweep of light — the room, turning */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 animate-spin-slower"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.06) 20deg, transparent 55deg, transparent 360deg)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 glow-gold-center" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <p className="eyebrow text-gold">By invitation · 2028</p>

          <h1 className="mt-12 font-display leading-[0.92]">
            <span className="block text-[clamp(4rem,11vw,8rem)] font-bold tracking-[0.08em] text-cream">
              HOUSE
            </span>
            <span className="my-2 block font-serif text-[clamp(1.4rem,3.5vw,2.25rem)] font-extralight lowercase italic tracking-[0.5em] text-cream/70">
              of
            </span>
            <span className="block text-[clamp(3.25rem,9vw,6.5rem)] font-medium tracking-[0.14em] text-gold">
              QUANTUM
            </span>
          </h1>

          <div aria-hidden className="mt-10 h-px w-24 bg-gold/60" />

          <p className="mt-8 font-serif text-xs font-semibold uppercase tracking-[0.3em] text-magenta">
            Coming 2028
          </p>

          <p className="mt-10 max-w-xl text-xl italic leading-relaxed text-dim">
            Quantum is arriving faster than the rooms set up to discuss it. We
            are building one of those rooms. This is where it begins.
          </p>

          {/* Meta tiles */}
          <div className="mt-16 grid w-full gap-4 sm:grid-cols-3">
            {META_TILES.map((tile) => (
              <div
                key={tile.value}
                className="floaty-static border border-gold/25 bg-ink/70 px-6 py-6 backdrop-blur-sm"
              >
                <p className="font-display text-3xl font-bold tracking-wide text-gold">
                  {tile.value}
                </p>
                <p className="mt-2 font-serif text-[0.68rem] font-semibold uppercase tracking-wide2 text-cream/65">
                  {tile.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── THE PROGRAMME, IN OUTLINE ─────────────────── */}
      <section aria-labelledby="programme" className="relative border-b border-gold/15">
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
          <h2 id="programme" className="eyebrow text-gold">
            Five days · Five rooms
          </h2>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-4">
            {PILLARS.map((pillar, i) => (
              <li key={pillar} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-gold/40">·</span>}
                <span className="font-serif text-sm font-medium tracking-wide2 text-cream/85">
                  {pillar}
                </span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-xl text-[1.02rem] italic leading-relaxed text-dim">
            The full programme is shared with invited guests. What we can say:
            at the most concentrated gathering of global power in the world,
            quantum will finally have an address.
          </p>
        </div>
      </section>

      {/* ─────────────────── INVITATION REQUEST ─────────────────── */}
      <section aria-labelledby="request-invitation" className="relative">
        <div className="pointer-events-none absolute inset-0 glow-gold-center opacity-50" />
        <div className="relative mx-auto max-w-2xl px-4 py-24 sm:px-6">
          <h2
            id="request-invitation"
            className="text-center font-display text-5xl font-bold tracking-wide text-cream"
          >
            Request an invitation
          </h2>
          <p className="mt-4 text-center italic text-dim">
            Tell us who you are. We are listening carefully.
          </p>
          <div className="floaty-static mt-12 border border-gold/20 bg-ink/60 p-8 backdrop-blur-sm sm:p-10">
            <InquiryForm form="davos" />
          </div>
        </div>
      </section>
    </div>
  );
}

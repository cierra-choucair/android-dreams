import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ImageSlot";

export const metadata: Metadata = {
  title: "Quantum State Summit — Make Quantum Come Alive",
  description:
    "The annual immersive quantum summit from Android Dreams Media. Three tracks, the Superposition Room, and a provider marketplace — built to give quantum a frame of reference.",
  alternates: { canonical: "/summit" },
};

const TRACKS = [
  {
    number: "TRACK 01",
    title: "Classical → Quantum",
    accent: { text: "text-orange", border: "border-orange/40" },
    body: "For engineers crossing over. From the software you ship today to your first circuit on real hardware — in one summit.",
  },
  {
    number: "TRACK 02",
    title: "Building on Quantum",
    accent: { text: "text-magenta", border: "border-magenta/40" },
    body: "For teams already building. Architecture patterns, error mitigation in practice, and the product decisions that survive contact with the noise floor.",
  },
  {
    number: "TRACK 03",
    title: "Quantum at the Edge",
    accent: { text: "text-cyan", border: "border-cyan/40" },
    body: "For the frontier-minded. Sensing, networking, post-quantum security — the places where quantum leaves the datacenter and enters the world.",
  },
];

const EXPERIENCE = [
  {
    title: "The Superposition Room",
    slot: "INSTALLATION IMAGE SLOT",
    body: "An immersive installation that puts you inside the mathematics — superposition, entanglement, and measurement rendered as space you walk through, not slides you sit through. Quantum has no frame of reference in daily life. This room builds one.",
  },
  {
    title: "Hands-On Tracks",
    slot: "WORKSHOP IMAGE SLOT",
    body: "Every track ends at a terminal. Real hardware access, guided by practitioners, with your own code running on quantum processors before you leave the building.",
  },
  {
    title: "Provider Marketplace",
    slot: "MARKETPLACE IMAGE SLOT",
    body: "The hardware and platform providers, in one hall, demonstrating — not pitching. Compare architectures side by side and leave with access credentials, not brochures.",
  },
];

export default function SummitPage() {
  return (
    <div className="relative">
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 rings opacity-80" />
        <div className="pointer-events-none absolute inset-0 glow-magenta-center" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-36">
          <p className="eyebrow text-magenta">The Annual Summit · Android Dreams Media</p>
          <h1 className="mt-6 font-display text-7xl leading-[0.9] tracking-wide sm:text-8xl lg:text-9xl">
            <span className="text-cream">Quantum</span>{" "}
            <span className="text-magenta">State</span>
          </h1>
          <p className="mt-8 text-2xl italic leading-relaxed text-magenta">
            “Make Quantum Come Alive.”
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-cream/80">
            Quantum has no frame of reference in daily life. You cannot hold a
            qubit, picture a superposition, or feel an entangled state — and
            so the technology that will define the next computing era stays
            abstract to the people who most need to understand it. The summit
            exists to build that frame: through immersive experience, working
            hardware, and three days among the people making it real.
          </p>
        </div>
      </section>

      {/* ─────────────────────── THREE TRACKS ─────────────────────── */}
      <section aria-labelledby="tracks" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="tracks" className="eyebrow text-magenta">
          Three tracks
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TRACKS.map((track) => (
            <div key={track.number} className={`border ${track.accent.border} bg-cream/[0.02] p-7`}>
              <p className={`font-mono text-xs tracking-wide2 ${track.accent.text}`}>
                {track.number}
              </p>
              <h3 className="mt-4 font-display text-3xl leading-none tracking-wide text-cream">
                {track.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-dim">{track.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── THE EXPERIENCE ─────────────────────── */}
      <section
        aria-labelledby="experience"
        className="relative border-y border-cream/10 bg-cream/[0.015]"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 id="experience" className="eyebrow text-cyan">
            The experience
          </h2>
          <div className="mt-8 space-y-12">
            {EXPERIENCE.map((item, i) => (
              <div
                key={item.title}
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ImageSlot image={null} className="aspect-[16/9]" label={item.slot} />
                <div>
                  <h3 className="font-display text-4xl tracking-wide text-cream">{item.title}</h3>
                  <p className="mt-4 text-[1.05rem] leading-[1.75] text-dim">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── WHEN + WHERE ─────────────────────── */}
      <section aria-labelledby="when-where" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 border border-cream/10 bg-cream/[0.02] p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 id="when-where" className="eyebrow text-magenta">
              When + Where
            </h2>
            <p className="mt-5 font-display text-4xl tracking-wide text-cream sm:text-5xl">
              Dates &amp; location — TBA
            </p>
            <p className="mt-4 max-w-xl text-lg italic leading-relaxed text-dim">
              The first Quantum State Summit is being staged now. Early bird
              registration opens before the public announcement — and closes
              fast.
            </p>
          </div>
          <Link
            href="/summit/register"
            className="justify-self-start bg-magenta px-8 py-4 font-mono text-xs uppercase tracking-wide2 text-ink transition-colors hover:bg-magenta/85 md:justify-self-end"
          >
            Early bird registration
          </Link>
        </div>
      </section>

      {/* ─────────────────────── SPONSORS ─────────────────────── */}
      <section aria-labelledby="sponsor" className="relative border-t border-cream/10">
        <div className="pointer-events-none absolute inset-0 glow-magenta-br" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 id="sponsor" className="font-display text-4xl tracking-wide text-cream sm:text-5xl">
            Become a Founding Partner
          </h2>
          <p className="mt-5 text-lg italic leading-relaxed text-dim">
            A small number of partners will define the first summit — on the
            installation, in the marketplace, and in the room where an
            industry meets its audience for the first time. Founding
            partnerships are limited by design.
          </p>
          <p className="mt-8">
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-wide2 text-magenta transition-colors hover:text-cream"
            >
              Inquire →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

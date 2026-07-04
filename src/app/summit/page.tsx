import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quantum State Summit — Make Quantum Come Alive",
  description:
    "The annual immersive quantum summit from Android Dreams Media. Walk through superposition, run your first circuit on real hardware, and meet the field in one room.",
  alternates: { canonical: "/summit" },
};

const TRACKS = [
  {
    number: "01",
    title: "Classical → Quantum",
    accent: "text-orange",
    wash: "from-orange/[0.14] to-transparent",
    border: "border-orange/30",
    body: "For engineers crossing over. From the software you ship today to your first circuit on real hardware — in one summit.",
  },
  {
    number: "02",
    title: "Building on Quantum",
    accent: "text-magenta",
    wash: "from-magenta/[0.14] to-transparent",
    border: "border-magenta/30",
    body: "For teams already building. Architecture patterns, error mitigation in practice, and the product decisions that survive contact with the noise floor.",
  },
  {
    number: "03",
    title: "Quantum at the Edge",
    accent: "text-cyan",
    wash: "from-cyan/[0.14] to-transparent",
    border: "border-cyan/30",
    body: "For the frontier-minded. Sensing, networking, post-quantum security — the places where quantum leaves the datacenter and enters the world.",
  },
];

/** The superposition field: two states drifting through each other. */
function SuperpositionField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-[10%] top-[5%] h-[70%] w-[55%] animate-drift1 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,31,61,0.24), transparent 65%)" }}
      />
      <div
        className="absolute right-[8%] top-[15%] h-[75%] w-[55%] animate-drift2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(58,143,255,0.22), transparent 65%)" }}
      />
      {/* Interference rings — measurement rippling outward */}
      <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-ringPulse rounded-full border border-cream/20" />
        <div
          className="absolute inset-0 animate-ringPulse rounded-full border border-magenta/25"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0 animate-ringPulse rounded-full border border-cyan/25"
          style={{ animationDelay: "6s" }}
        />
      </div>
      <div className="absolute inset-0 bg-grid" />
    </div>
  );
}

export default function SummitPage() {
  return (
    <div className="relative">
      {/* ──────── HERO — stand inside the superposition ──────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden border-b border-cream/10">
        <SuperpositionField />
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <p className="eyebrow text-magenta">The Annual Summit · Android Dreams Media</p>
          <h1 className="mt-8 font-display text-7xl font-bold leading-[0.9] tracking-[0.04em] sm:text-8xl lg:text-9xl">
            <span className="text-cream">Quantum</span>{" "}
            <span className="text-magenta">State</span>
          </h1>
          <p className="mt-8 text-2xl italic leading-relaxed text-magenta sm:text-3xl">
            “Make Quantum Come Alive.”
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-[1.75] text-cream/85">
            You cannot hold a qubit. You cannot picture a superposition. The
            technology defining the next computing era has no frame of
            reference in daily life — so we built one you can walk through.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/summit/register"
              className="floaty rounded-lg bg-magenta px-8 py-4 font-serif text-xs font-semibold uppercase tracking-wide2 text-ink hover:bg-magenta/85"
            >
              Early bird registration
            </Link>
            <a
              href="#experience"
              className="rounded-lg border border-cream/30 px-8 py-4 font-serif text-xs font-semibold uppercase tracking-wide2 text-cream transition-colors hover:border-magenta hover:text-magenta"
            >
              See the experience
            </a>
          </div>
        </div>
        <p className="relative pb-8 text-center font-serif text-[0.68rem] font-semibold uppercase tracking-wide4 text-cream/65">
          Two days · Three tracks · One room where it all becomes real
        </p>
      </section>

      {/* ──────── THE VISCERAL CLAIM ──────── */}
      <section aria-label="The premise" className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-4xl font-bold leading-[1.15] tracking-wide sm:text-6xl">
          <span className="block text-cream/60">You can&apos;t see it.</span>
          <span className="mt-2 block text-cream/80">You can&apos;t touch it.</span>
          <span className="mt-2 block text-cream">
            You&apos;re about to <span className="text-magenta">feel</span> it.
          </span>
        </p>
        <p className="mx-auto mt-10 max-w-2xl text-lg italic leading-relaxed text-dim">
          Every other quantum event is a conference. Quantum State is an
          experience — superposition, entanglement, and coherence rendered as
          space, sound, and light, with real hardware humming in the next room.
        </p>
      </section>

      {/* ──────── THE SUPERPOSITION ROOM — full-bleed installation ──────── */}
      <section
        id="experience"
        aria-labelledby="superposition-room"
        className="relative overflow-hidden border-y border-cream/10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,31,61,0.16) 0%, rgba(5,3,8,0.4) 45%, rgba(58,143,255,0.16) 100%)",
          }}
        />
        <SuperpositionField className="opacity-70" />
        <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6">
          <p className="eyebrow text-magenta">Signature installation</p>
          <h2
            id="superposition-room"
            className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-wide text-cream sm:text-7xl"
          >
            The Superposition Room
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">
            Step inside the mathematics. Two states of light occupy the room
            at once, drifting through each other until you interact — and the
            room resolves around your choice. Superposition, entanglement,
            and measurement as space you walk through, not slides you sit
            through.
          </p>
          <p className="mt-6 font-serif text-[0.72rem] font-semibold uppercase tracking-wide4 text-cream/65">
            Installation photography arrives with the venue · this space is a promise
          </p>
        </div>
      </section>

      {/* ──────── THREE TRACKS — big, color-washed ──────── */}
      <section aria-labelledby="tracks" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="tracks" className="eyebrow text-magenta">
          Three tracks · every level of the stack
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                Ends at a terminal, on real hardware
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── HANDS ON + MARKETPLACE — two experiential panels ──────── */}
      <section aria-label="The experience" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="floaty relative overflow-hidden border border-cyan/25 bg-cream/[0.02] p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(58,143,255,0.14), transparent 70%)" }}
            />
            <p className="eyebrow relative text-cyan">Hands-on, not hand-wavy</p>
            <h3 className="relative mt-4 font-display text-4xl font-bold tracking-wide text-cream">
              Your first circuit runs here
            </h3>
            <p className="relative mt-4 max-w-xl text-[1.02rem] leading-relaxed text-dim">
              Every track ends at a terminal with hardware access and a
              practitioner beside you. You leave having run your own code on
              a quantum processor — not having watched someone else do it.
            </p>
          </div>
          <div className="floaty relative overflow-hidden border border-orange/25 bg-cream/[0.02] p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 60% at 0% 100%, rgba(255,138,61,0.14), transparent 70%)" }}
            />
            <p className="eyebrow relative text-orange">The Provider Marketplace</p>
            <h3 className="relative mt-4 font-display text-4xl font-bold tracking-wide text-cream">
              The whole field, one hall
            </h3>
            <p className="relative mt-4 max-w-xl text-[1.02rem] leading-relaxed text-dim">
              Hardware and platform providers demonstrating side by side —
              not pitching. Compare architectures directly and leave with
              access credentials, not brochures.
            </p>
          </div>
        </div>
      </section>

      {/* ──────── WHEN + WHERE ──────── */}
      <section aria-labelledby="when-where" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="floaty-static relative grid gap-10 overflow-hidden border border-cream/10 bg-cream/[0.02] p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="pointer-events-none absolute inset-0 glow-magenta-center opacity-60" />
          <div className="relative">
            <h2 id="when-where" className="eyebrow text-magenta">
              When + Where
            </h2>
            <p className="mt-5 font-display text-4xl font-bold tracking-wide text-cream sm:text-5xl">
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
            className="floaty relative justify-self-start rounded-lg bg-magenta px-8 py-4 font-serif text-xs font-semibold uppercase tracking-wide2 text-ink hover:bg-magenta/85 md:justify-self-end"
          >
            Early bird registration
          </Link>
        </div>
      </section>

      {/* ──────── FOUNDING PARTNERS ──────── */}
      <section aria-labelledby="sponsor" className="relative border-t border-cream/10">
        <div className="pointer-events-none absolute inset-0 glow-magenta-br" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 id="sponsor" className="font-display text-4xl font-bold tracking-wide text-cream sm:text-5xl">
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
              className="font-serif text-xs font-semibold uppercase tracking-wide2 text-magenta transition-colors hover:text-cream"
            >
              Inquire →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

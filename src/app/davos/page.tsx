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

export default function DavosPage() {
  return (
    <div className="relative">
      {/* ─────────────────── STEALTH HERO — single screen ─────────────────── */}
      <section
        aria-label="House of Quantum"
        className="relative flex min-h-[calc(100vh-6.25rem)] flex-col overflow-hidden border-b border-gold/20"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 rings-gold" />
        <div className="pointer-events-none absolute inset-0 glow-gold-center" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <p className="eyebrow text-gold">By invitation · 2028</p>

          <h1 className="mt-10 font-display leading-[0.88] tracking-wide">
            <span className="block text-[clamp(4rem,12vw,9rem)] text-cream">HOUSE</span>
            <span className="text-stroke-white block text-[clamp(2.5rem,7vw,5rem)]">of</span>
            <span className="text-stroke-gold block text-[clamp(4rem,12vw,9rem)]">QUANTUM</span>
          </h1>

          <p className="mt-10 font-mono text-xs uppercase tracking-wide4 text-magenta">
            Coming 2028
          </p>

          <p className="mt-10 max-w-xl text-xl italic leading-relaxed text-dim">
            Quantum is arriving faster than the rooms set up to discuss it. We
            are building one of those rooms. This is where it begins.
          </p>

          {/* Meta tiles */}
          <div className="mt-16 grid w-full gap-4 sm:grid-cols-3">
            {META_TILES.map((tile) => (
              <div key={tile.value} className="border border-gold/25 bg-ink/60 px-6 py-6">
                <p className="font-display text-3xl tracking-wide text-gold">{tile.value}</p>
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-wide2 text-dimmer">
                  {tile.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── INVITATION REQUEST ─────────────────── */}
      <section aria-labelledby="request-invitation" className="relative">
        <div className="pointer-events-none absolute inset-0 glow-gold-center opacity-50" />
        <div className="relative mx-auto max-w-2xl px-4 py-24 sm:px-6">
          <h2
            id="request-invitation"
            className="text-center font-display text-5xl tracking-wide text-cream"
          >
            Request an invitation
          </h2>
          <p className="mt-4 text-center italic text-dim">
            Tell us who you are. We are listening carefully.
          </p>
          <div className="mt-12">
            <InquiryForm form="davos" />
          </div>
        </div>
      </section>
    </div>
  );
}

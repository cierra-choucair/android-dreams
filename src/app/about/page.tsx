import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Android Dreams Media",
  description:
    "Android Dreams Media is a studio at the intersection of rigorous journalism and visionary storytelling: the Android Dreams magazine, QFrontline, the Quantum Readiness Community, the Quantum State Summit, and House of Quantum.",
  alternates: { canonical: "/about" },
};

const PROPERTIES = [
  {
    name: "Android Dreams",
    href: "/",
    accent: "text-orange",
    border: "border-orange/40",
    role: "The flagship",
    body: "A digital magazine covering quantum technology, artificial intelligence, and the deep science reshaping civilization — daily Transmissions, long-form Deep Reads, the Sci-Fi Lens, and the Sunday Letter.",
  },
  {
    name: "QFrontline",
    href: "/qfrontline",
    accent: "text-magenta",
    border: "border-magenta/40",
    role: "The developer vertical",
    body: "Quantum technology for builders. Technical depth, working code, and the weekly Dev Brief that keeps quantum developers at the frontier.",
  },
  {
    name: "Quantum Readiness Community",
    href: "/community",
    accent: "text-magenta",
    border: "border-magenta/40",
    role: "The community layer",
    body: "A developer-first community where editorial signal becomes working groups, portfolio artifacts, and career visibility — free, and gated by contribution rather than price.",
  },
  {
    name: "Quantum State Summit",
    href: "/summit",
    accent: "text-cyan",
    border: "border-cyan/40",
    role: "The annual summit",
    body: "An immersive annual event built to give quantum a frame of reference: three hands-on tracks, the Superposition Room, and a provider marketplace.",
  },
  {
    name: "House of Quantum",
    href: "/davos",
    accent: "text-gold",
    border: "border-gold/40",
    role: "Coming 2028",
    body: "Quantum is arriving faster than the rooms set up to discuss it. We are building one of those rooms. By invitation.",
  },
];

const FOUNDERS = [
  {
    name: "Cierra Lunde Choucair",
    title: "Executive Director & Editor-in-Chief",
    image: "cierra.jpg",
    bio: "Cierra founded Android Dreams to follow the oldest human question — what is all of this, and what are we inside of it? — with journalistic rigor and an unembarrassed sense of wonder. She leads editorial across the studio, wrote its manifesto, and writes The Sunday Letter every week.",
  },
  {
    name: "Sandro Bilobrk",
    title: "Co-Founder & Creative Director",
    image: "sandro.jpg",
    bio: "Sandro leads video strategy across the studio and is building Android Dreams' cinematic presence on screen — the moving-image counterpart to the magazine's voice. He also lends that eye to the writing room, where the visual and editorial languages are designed as one.",
  },
  {
    name: "Christina Wu",
    title: "President & Head of Partnerships",
    image: "christina.jpg",
    bio: "Christina runs the business of the studio: operations, growth, and the partnerships that carry Android Dreams into the world — from the Quantum State Summit's founding partners to the rooms being built for House of Quantum.",
  },
];

function Headshot({ image, name }: { image: string; name: string }) {
  const exists = existsSync(
    path.join(process.cwd(), "public", "brand", "founders", image),
  );
  if (exists) {
    return (
      <div className="relative aspect-square overflow-hidden border border-cream/10">
        <Image
          src={`/brand/founders/${image}`}
          alt={`Portrait of ${name}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="image-slot relative flex aspect-square items-center justify-center border border-cream/10"
    >
      <div className="absolute inset-0 bg-grid" />
      <span className="relative font-mono text-[0.6rem] uppercase tracking-wide4 text-dimmer">
        Headshot slot
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] glow-cyan-left" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] glow-magenta-right" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6">
        {/* ─────────────────────────── Masthead ─────────────────────────── */}
        <header className="max-w-3xl">
          <p className="eyebrow text-orange">About the studio</p>
          <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-[0.06em] text-cream sm:text-7xl">
            Android Dreams Media
          </h1>
          <p className="mt-8 text-xl italic leading-relaxed text-dim">
            A media studio at the intersection of rigorous journalism and
            visionary storytelling — covering quantum technology, artificial
            intelligence, and the deep science building our sci-fi future.
          </p>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-[1.75] text-cream/85">
            The future is being built quietly, quickly, and often without
            context. Android Dreams Media exists to document it, interpret
            it, and remind everyone who reads, watches, or gathers with us
            that it is still something we can shape.
          </p>
        </header>

        <blockquote className="my-16 max-w-3xl border-l-[3px] border-orange py-2 pl-6 sm:pl-10">
          <p className="font-serif text-2xl italic leading-snug text-cream sm:text-3xl">
            Every technology is a decision about what kind of world we want.
            And decisions can go differently.
          </p>
        </blockquote>

        {/* ─────────────────────── The properties ─────────────────────── */}
        <section aria-labelledby="properties" className="mt-20">
          <h2 id="properties" className="eyebrow text-magenta">
            Five properties · One thesis
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROPERTIES.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className={`group border ${p.border} bg-cream/[0.02] p-7 transition-colors hover:bg-cream/[0.05]`}
              >
                <p className={`font-mono text-[0.65rem] uppercase tracking-wide2 ${p.accent}`}>
                  {p.role}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none tracking-wide text-cream">
                  {p.name}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-dim">{p.body}</p>
                <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer transition-colors group-hover:text-cream">
                  Visit →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─────────────────────── The founders ─────────────────────── */}
        <section aria-labelledby="founders" className="mt-24">
          <h2 id="founders" className="eyebrow text-cyan">
            The founders
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {FOUNDERS.map((f) => (
              <article key={f.name}>
                <Headshot image={f.image} name={f.name} />
                <h3 className="mt-6 font-display text-3xl leading-none tracking-wide text-cream">
                  {f.name}
                </h3>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide2 text-orange">
                  {f.title}
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-dim">{f.bio}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────────────── The manifesto, one door down ─────────────────── */}
        <section
          aria-labelledby="manifesto-cta"
          className="relative mt-24 overflow-hidden border border-cream/10"
        >
          <div className="pointer-events-none absolute inset-0 glow-orange-tl" />
          <div className="relative flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="manifesto-cta" className="font-display text-4xl tracking-wide text-cream">
                Why we do this
              </h2>
              <p className="mt-3 max-w-xl italic text-dim">
                The full case — what we believe, what we commit to, and what
                we refuse — lives in the editorial manifesto.
              </p>
            </div>
            <Link
              href="/manifesto"
              className="shrink-0 border border-orange px-6 py-3 font-mono text-xs uppercase tracking-wide2 text-orange transition-colors hover:bg-orange hover:text-ink"
            >
              Read the manifesto
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

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
    role: "The anchor publication",
    body: "The correspondent at the frontier. Most coverage of frontier technology hypes, regurgitates, or sterilizes — Android Dreams makes science feel alive while remaining rigorous, across daily Transmissions, the Deep Read, the Sci-Fi Lens, and the Sunday Letter.",
  },
  {
    name: "QFrontline",
    href: "/qfrontline",
    accent: "text-magenta",
    border: "border-magenta/40",
    role: "The developer vertical",
    body: "Most quantum coverage talks about quantum. QFrontline talks to the people building it — technical depth, working code, and the weekly Dev Brief.",
  },
  {
    name: "Quantum Readiness Community",
    href: "/community",
    accent: "text-magenta",
    border: "border-magenta/40",
    role: "The community layer",
    body: "Where editorial signal becomes practice: working groups, portfolio artifacts, and career visibility for the developers and builders learning to make quantum come alive.",
  },
  {
    name: "Quantum State Summit",
    href: "/summit",
    accent: "text-cyan",
    border: "border-cyan/40",
    role: "The annual summit",
    body: "Every other quantum event is a conference. Quantum State is an experience — immersive installations, hands-on tracks, and a provider marketplace that make quantum felt rather than explained.",
  },
  {
    name: "House of Quantum",
    href: "/davos",
    accent: "text-gold",
    border: "border-gold/40",
    role: "Coming 2028",
    body: "At Davos, AI has multiple stages and climate has permanent infrastructure. Quantum has nothing comparable — yet. We are building the room where quantum enters the global conversation at the level it demands.",
  },
];

const FOUNDERS = [
  {
    name: "Cierra Lunde Choucair",
    title: "Executive Director & Editor-in-Chief",
    image: "cierra.jpg",
    bio: "Cierra founded Android Dreams to follow the oldest human question — what is all of this, and what are we inside of it? — with journalistic rigor and an unembarrassed sense of wonder. She leads editorial across the studio's publications, curates the programming of the Quantum State Summit and House of Quantum, wrote the manifesto, and writes The Sunday Letter every week.",
  },
  {
    name: "Sandro Bilobrk",
    title: "Co-Founder & Creative Director",
    image: "sandro.jpg",
    bio: "Sandro leads video strategy and the studio's presence on screen — the moving-image counterpart to the magazine's voice — and runs the operational infrastructure that keeps four properties publishing as one house. He also lends that eye to the writing room, where the visual and editorial languages are designed together.",
  },
  {
    name: "Christina Wu",
    title: "President & Head of Partnerships",
    image: "christina.jpg",
    bio: "Christina leads the partnerships that carry Android Dreams Media into the world — from the Summit's founding partners to the rooms being built for House of Quantum — alongside the community's flagship products and the studio's bridge to Chinese-language audiences.",
  },
];

function Headshot({ image, name }: { image: string; name: string }) {
  const exists = existsSync(
    path.join(process.cwd(), "public", "brand", "founders", image),
  );
  if (exists) {
    return (
      <div className="floaty-static relative aspect-square overflow-hidden border border-cream/10">
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
      className="image-slot floaty-static relative flex aspect-square items-center justify-center overflow-hidden border border-cream/10"
    >
      <div className="absolute inset-0 bg-cyber" />
      <span className="relative font-serif font-semibold text-[0.68rem] uppercase tracking-wide4 text-cream/65">
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
            We are building media infrastructure for the quantum and AI era —
            rigorous journalism and visionary storytelling about the deep
            science building our sci-fi future.
          </p>
          <p className="mt-6 max-w-2xl text-[1.15rem] leading-[1.75] text-cream/85">
            The future is being built quietly, quickly, and often without
            context. Android Dreams Media exists to document it, interpret
            it, and remind everyone who reads, watches, or gathers with us
            that it is still something we can shape. The studio operates five
            properties — each with its own front door, all living in the same
            house.
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
                className={`floaty group border ${p.border} bg-cream/[0.03] p-7 hover:bg-cream/[0.05]`}
              >
                <p className={`font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 ${p.accent}`}>
                  {p.role}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none tracking-wide text-cream">
                  {p.name}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-dim">{p.body}</p>
                <p className="mt-5 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65 transition-colors group-hover:text-cream">
                  Visit →
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65">
            · The magazine seeds the community · the community fills the
            summit · the summit earns Davos ·
          </p>
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
                <p className="mt-2 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-orange">
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
          className="floaty-static relative mt-24 overflow-hidden border border-cream/10"
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
              className="shrink-0 rounded-lg border border-orange px-6 py-3 font-serif font-semibold text-xs uppercase tracking-wide2 text-orange transition-colors hover:bg-orange hover:text-ink"
            >
              Read the manifesto
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

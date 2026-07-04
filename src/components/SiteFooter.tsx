import Link from "next/link";

const FORMAT_LINKS = [
  { href: "/transmissions", label: "Transmissions" },
  { href: "/deep-read", label: "The Deep Read" },
  { href: "/sci-fi-lens", label: "The Sci-Fi Lens" },
  { href: "/sunday-letter", label: "The Sunday Letter · Subscribe" },
  { href: "/manifesto", label: "The Editorial Manifesto" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const STUDIO_LINKS = [
  { href: "/qfrontline", label: "QFrontline" },
  { href: "/community", label: "Quantum Readiness Community" },
  { href: "/summit", label: "Quantum State Summit" },
  { href: "/davos", label: "House of Quantum" },
];

const SOCIAL_LINKS = [
  { href: "https://x.com/androiddreams", label: "X" },
  { href: "https://linkedin.com/company/android-dreams-media", label: "LinkedIn" },
  { href: "/rss.xml", label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-cream/10 bg-[#040308]">
      <div className="pointer-events-none absolute inset-0 bg-cyber" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-baseline gap-2 font-display text-xl font-bold leading-none tracking-[0.06em]"
            >
              <span className="text-cream">ANDROID</span>
              <span aria-hidden className="inline-block h-5 w-[3px] translate-y-[2px] bg-orange" />
              <span className="text-cream">DREAMS</span>
            </Link>
            <p className="mt-2 font-serif text-[0.72rem] font-extralight uppercase tracking-[0.55em] text-gold">
              Imagine the future
            </p>
            <p className="mt-6 max-w-xs text-[0.95rem] italic leading-relaxed text-dim">
              A digital magazine at the intersection of rigorous journalism and
              visionary storytelling — quantum technology, artificial
              intelligence, and the deep science building our sci-fi future.
            </p>
          </div>

          {/* Formats */}
          <nav aria-label="Formats">
            <p className="eyebrow text-orange">The Magazine</p>
            <ul className="mt-6 space-y-3">
              {FORMAT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-serif font-semibold text-xs uppercase tracking-wide2 text-dim transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <nav aria-label="Android Dreams Media properties">
            <p className="eyebrow text-magenta">The Studio</p>
            <ul className="mt-6 space-y-3">
              {STUDIO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-serif font-semibold text-xs uppercase tracking-wide2 text-dim transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xs text-sm italic leading-relaxed text-cream/65">
              Four properties. One thesis: the future is still shapeable.
            </p>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65">
            © {new Date().getFullYear()} Android Dreams Media
          </p>
          <p className="font-serif font-semibold text-[0.72rem] tracking-wide2 text-cream/65">
            Set in Outfit and JetBrains Mono. Presented in 2.39:1. Published
            from the frontier.
          </p>
          <ul className="flex items-center gap-5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-dim transition-colors hover:text-orange"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

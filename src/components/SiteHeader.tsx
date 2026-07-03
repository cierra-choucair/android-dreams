"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";

const FORMAT_LINKS = [
  { href: "/transmissions", label: "Transmissions" },
  { href: "/deep-read", label: "The Deep Read" },
  { href: "/sci-fi-lens", label: "The Sci-Fi Lens" },
  { href: "/sunday-letter", label: "Sunday Letter" },
  { href: "/qfrontline", label: "QFrontline" },
];

const STUDIO_LINKS = [
  { href: "/", label: "Android Dreams" },
  { href: "/qfrontline", label: "QFrontline" },
  { href: "/community", label: "Community" },
  { href: "/summit", label: "Summit" },
  { href: "/davos", label: "Davos" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on navigation
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Focus search input when the overlay opens; close on Escape
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSearchSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const q = new FormData(e.currentTarget).get("q");
      if (typeof q === "string" && q.trim()) {
        router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        setSearchOpen(false);
      }
    },
    [router],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Studio bar — discoverability layer for the sibling properties */}
      <div
        className={`overflow-hidden border-b border-cream/[0.06] bg-[#030207]/95 backdrop-blur transition-all duration-300 ${
          scrolled ? "max-h-0 border-b-0" : "max-h-10"
        }`}
      >
        <nav aria-label="Android Dreams Media properties" className="overflow-x-auto">
          <ul className="mx-auto flex w-max max-w-none items-center gap-5 whitespace-nowrap px-4 py-1.5 sm:w-auto sm:max-w-7xl sm:justify-center sm:gap-8">
            {STUDIO_LINKS.map((link, i) => (
              <li key={link.label} className="flex items-center gap-5 sm:gap-8">
                {i > 0 && (
                  <span aria-hidden className="text-[0.55rem] text-dimmer">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className={`font-mono text-[0.6rem] uppercase tracking-wide2 transition-colors sm:text-[0.65rem] ${
                    i === 0 ? "text-dim hover:text-orange" : "text-dimmer hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main nav */}
      <div
        className={`border-b border-cream/10 bg-ink/90 backdrop-blur transition-all duration-300 ${
          scrolled ? "py-2" : "py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Wordmark with the vertical orange divider motif */}
          <Link
            href="/"
            className="group flex items-baseline gap-2 font-display text-2xl leading-none tracking-wide"
          >
            <span className="text-cream">ANDROID</span>
            <span
              aria-hidden
              className="inline-block h-5 w-[3px] translate-y-[2px] bg-orange transition-all group-hover:h-6"
            />
            <span className="text-orange">DREAMS</span>
          </Link>

          <nav aria-label="Formats" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {FORMAT_LINKS.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`font-mono text-[0.7rem] uppercase tracking-wide2 transition-colors ${
                        active ? "text-orange" : "text-dim hover:text-cream"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-1.5 text-dim transition-colors hover:text-cream"
            >
              <Search size={18} strokeWidth={1.5} aria-hidden />
            </button>
            <Link
              href="/newsletter"
              className="hidden border border-gold px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide2 text-gold transition-colors hover:bg-gold hover:text-ink sm:inline-block"
            >
              Subscribe
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-1.5 text-dim transition-colors hover:text-cream lg:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search Android Dreams"
          className="fixed inset-0 z-[60] bg-ink/[0.97] bg-grid"
        >
          <div className="pointer-events-none absolute inset-0 glow-orange-tl" />
          <div className="pointer-events-none absolute inset-0 glow-magenta-br" />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="absolute right-6 top-6 p-2 text-dim transition-colors hover:text-cream"
          >
            <X size={24} strokeWidth={1.5} aria-hidden />
          </button>
          <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-6">
            <p className="eyebrow text-orange">Search the archive</p>
            <form onSubmit={onSearchSubmit} className="mt-6">
              <label htmlFor="site-search" className="sr-only">
                Search query
              </label>
              <input
                ref={searchInputRef}
                id="site-search"
                name="q"
                type="search"
                placeholder="Quantum, alignment, coherence…"
                autoComplete="off"
                className="w-full border-b-2 border-orange/60 bg-transparent pb-4 font-display text-4xl tracking-wide text-cream placeholder:text-dimmer focus:border-orange focus:outline-none sm:text-6xl"
              />
              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-wide2 text-dimmer">
                Press Enter to search · Esc to close
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] overflow-y-auto bg-ink/[0.97] bg-grid lg:hidden"
        >
          <div className="pointer-events-none absolute inset-0 glow-orange-tl" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 p-2 text-dim transition-colors hover:text-cream"
          >
            <X size={24} strokeWidth={1.5} aria-hidden />
          </button>
          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-24">
            <p className="eyebrow text-orange">Formats</p>
            <ul className="mt-6 space-y-4">
              {FORMAT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-4xl tracking-wide text-cream transition-colors hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 text-magenta">The Studio</p>
            <ul className="mt-6 space-y-3">
              {STUDIO_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-2xl tracking-wide text-dim transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 text-gold">Elsewhere</p>
            <ul className="mt-6 space-y-3 font-mono text-sm">
              {[
                { href: "/about", label: "About" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/contact", label: "Contact" },
                { href: "/search", label: "Search" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="uppercase tracking-wide2 text-dim transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

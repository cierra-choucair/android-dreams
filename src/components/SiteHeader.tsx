"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { AD_SUBSCRIBE_URL } from "@/lib/links";

const AD_MENU = [
  { href: "/transmissions", label: "Transmissions" },
  { href: "/deep-read", label: "The Deep Read" },
  { href: "/sci-fi-lens", label: "The Sci-Fi Lens" },
  { href: "/manifesto", label: "The Editorial Manifesto" },
];

const STUDIO_MENU = [
  { href: "/community", label: "Quantum Readiness Community" },
  { href: "/summit", label: "Quantum State Summit" },
  { href: "/davos", label: "House of Quantum" },
];

type DropdownId = "ad" | "studio";

function NavDropdown({
  id,
  label,
  items,
  open,
  setOpen,
  pathname,
}: {
  id: DropdownId;
  label: string;
  items: { href: string; label: string }[];
  open: DropdownId | null;
  setOpen: (id: DropdownId | null) => void;
  pathname: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const isOpen = open === id;
  const active = items.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [isOpen, setOpen]);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setOpen(isOpen ? null : id)}
        onMouseEnter={() => setOpen(id)}
        className={`inline-flex items-center gap-1.5 font-serif font-semibold text-[0.76rem] uppercase leading-none tracking-wide2 transition-colors ${
          active || isOpen ? "text-orange" : "text-dim hover:text-cream"
        }`}
      >
        {label}
        <ChevronDown
          size={13}
          strokeWidth={1.5}
          aria-hidden
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul
          onMouseLeave={() => setOpen(null)}
          className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-xl border border-cream/15 bg-ink py-2 shadow-float-lg"
        >
          <span
            aria-hidden
            className="absolute -top-[2px] left-1/2 h-[2px] w-10 -translate-x-1/2 bg-orange"
          />
          {items.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-5 py-2.5 font-serif font-semibold text-[0.68rem] uppercase tracking-wide2 transition-colors ${
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "text-orange"
                    : "text-dim hover:bg-cream/[0.04] hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
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
    setOpenDropdown(null);
  }, [pathname]);

  // Focus search input when the overlay opens
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
        setOpenDropdown(null);
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
      {/* One line: wordmark · dropdowns · flat links · search · subscribe */}
      <div
        className={`border-b border-cream/10 bg-ink/90 backdrop-blur transition-all duration-300 ${
          scrolled ? "py-2" : "py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Wordmark with the seam */}
          <Link
            href="/"
            className="group flex items-baseline gap-2 font-display text-xl font-bold leading-none tracking-[0.06em]"
          >
            <span className="text-cream">ANDROID</span>
            <span
              aria-hidden
              className="inline-block h-5 w-[3px] translate-y-[2px] bg-orange transition-all group-hover:h-6"
            />
            <span className="text-cream">DREAMS</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              <NavDropdown
                id="ad"
                label="Android Dreams"
                items={AD_MENU}
                open={openDropdown}
                setOpen={setOpenDropdown}
                pathname={pathname}
              />
              <li>
                <Link
                  href="/qfrontline"
                  className={`inline-flex items-center font-serif font-semibold text-[0.76rem] uppercase leading-none tracking-wide2 transition-colors ${
                    pathname.startsWith("/qfrontline") ? "text-orange" : "text-dim hover:text-cream"
                  }`}
                >
                  QFrontline
                </Link>
              </li>
              <NavDropdown
                id="studio"
                label="The Studio"
                items={STUDIO_MENU}
                open={openDropdown}
                setOpen={setOpenDropdown}
                pathname={pathname}
              />
              <li>
                <Link
                  href="/about"
                  className={`inline-flex items-center font-serif font-semibold text-[0.76rem] uppercase leading-none tracking-wide2 transition-colors ${
                    pathname === "/about" ? "text-orange" : "text-dim hover:text-cream"
                  }`}
                >
                  About
                </Link>
              </li>
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
            <a
              href={AD_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-orange px-4 py-1.5 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-orange transition-colors hover:bg-orange hover:text-ink sm:inline-block"
            >
              Subscribe
            </a>
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
          className="fixed inset-0 z-[60] bg-ink/[0.97] bg-cyber"
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
                className="w-full rounded-2xl border border-orange/50 bg-ink/70 px-7 py-6 font-display text-3xl font-bold tracking-wide text-cream shadow-float placeholder:text-cream/40 focus:border-orange focus:outline-none sm:text-5xl"
              />
              <p className="mt-4 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65">
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
          className="fixed inset-0 z-[60] overflow-y-auto bg-ink/[0.97] bg-cyber lg:hidden"
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
            <p className="eyebrow text-orange">Android Dreams</p>
            <ul className="mt-6 space-y-4">
              {AD_MENU.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-3xl font-bold tracking-wide text-cream transition-colors hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/qfrontline"
                  className="font-display text-3xl font-bold tracking-wide text-cream transition-colors hover:text-orange"
                >
                  QFrontline
                </Link>
              </li>
            </ul>
            <p className="eyebrow mt-12 text-magenta">The Studio</p>
            <ul className="mt-6 space-y-3">
              {STUDIO_MENU.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-xl tracking-wide text-dim transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 text-gold">Elsewhere</p>
            <ul className="mt-6 space-y-3 font-serif font-semibold text-sm">
              {[
                { href: "/sunday-letter", label: "The Sunday Letter · Subscribe" },
                { href: "/about", label: "About" },
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

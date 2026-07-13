"use client";

import { useState } from "react";
import { Check, Facebook, Link2, Linkedin, Mail, Twitter } from "lucide-react";

/**
 * Share row for article pages: plain intent links, no SDKs, no trackers.
 * Hover accent inherits the article's --format-accent CSS variable.
 */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const eUrl = encodeURIComponent(url);
  const eTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${eTitle}&url=${eUrl}`,
      external: true,
      Icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${eUrl}`,
      external: true,
      Icon: Linkedin,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${eUrl}`,
      external: true,
      Icon: Facebook,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${eTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
      external: false,
      Icon: Mail,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const itemClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cream/15 text-dim transition-colors hover:border-[color:var(--format-accent)] hover:text-[color:var(--format-accent)]";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2.5">
      <span className="mr-1.5 font-serif font-semibold text-[0.68rem] uppercase tracking-wide2 text-cream/65">
        Share with your network
      </span>
      {links.map(({ label, href, external, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          className={itemClass}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon size={15} strokeWidth={1.5} aria-hidden />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        title="Copy link"
        className={itemClass}
      >
        {copied ? (
          <Check size={15} strokeWidth={1.5} aria-hidden />
        ) : (
          <Link2 size={15} strokeWidth={1.5} aria-hidden />
        )}
      </button>
      <span
        role="status"
        aria-live="polite"
        className="font-serif font-semibold text-[0.68rem] uppercase tracking-wide2 text-cream/65"
      >
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}

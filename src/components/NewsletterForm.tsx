"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const ACCENTS = {
  orange: {
    button:
      "bg-orange text-ink hover:bg-orange/85 focus-visible:outline-orange",
    border: "border-orange/40 focus:border-orange",
  },
  gold: {
    button: "bg-gold text-ink hover:bg-gold/85 focus-visible:outline-gold",
    border: "border-gold/40 focus:border-gold",
  },
  matrix: {
    button:
      "bg-matrix text-ink hover:bg-matrix/85 focus-visible:outline-matrix",
    border: "border-matrix/40 focus:border-matrix",
  },
} as const;

export function NewsletterForm({
  accent = "orange",
  compact = false,
}: {
  accent?: keyof typeof ACCENTS;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const colors = ACCENTS[accent];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string" || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setStatus("success");
        setMessage("Signal received. Check your inbox to confirm.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(data.error || "Something interfered. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something interfered. Try again.");
    }
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={`flex w-full flex-col gap-3 sm:flex-row ${compact ? "" : "sm:items-stretch"}`}
      >
        <label htmlFor={`newsletter-email-${accent}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${accent}`}
          name="email"
          type="email"
          required
          placeholder="you@thefuture.com"
          autoComplete="email"
          className={`min-w-0 flex-1 border bg-ink/60 px-4 py-3 font-mono text-sm text-cream placeholder:text-dimmer focus:outline-none ${colors.border}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wide2 transition-colors disabled:opacity-60 ${colors.button}`}
        >
          {status === "loading" ? "Transmitting…" : "Subscribe"}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] font-mono text-xs tracking-wide ${
          status === "error" ? "text-magenta" : "text-dim"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

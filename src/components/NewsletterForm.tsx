"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const ACCENTS = {
  orange: {
    input:
      "border-orange/40 bg-ink/60 text-cream placeholder:text-dimmer focus:border-orange font-mono",
    button:
      "bg-orange text-ink hover:bg-orange/85 focus-visible:outline-orange",
    note: "text-dim",
  },
  gold: {
    input:
      "border-gold/40 bg-ink/60 text-cream placeholder:text-dimmer focus:border-gold font-mono",
    button: "bg-gold text-ink hover:bg-gold/85 focus-visible:outline-gold",
    note: "text-dim",
  },
  // QFrontline light surface — white page, Void text, Signal accent
  qf: {
    input:
      "border-qf-void/25 bg-white text-qf-void placeholder:text-qf-void/40 focus:border-qf-signal font-qf-mono",
    button:
      "bg-qf-signal text-qf-void font-medium hover:bg-qf-signal-deep hover:text-white focus-visible:outline-qf-signal font-qf-mono",
    note: "text-qf-void/60",
  },
} as const;

export function NewsletterForm({
  accent = "orange",
  publication = "ad",
}: {
  accent?: keyof typeof ACCENTS;
  /** Which beehiiv publication to subscribe to: Android Dreams or QFrontline. */
  publication?: "ad" | "qf";
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
        body: JSON.stringify({ email, publication }),
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
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
        <label htmlFor={`newsletter-email-${publication}-${accent}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${publication}-${accent}`}
          name="email"
          type="email"
          required
          placeholder="you@thefuture.com"
          autoComplete="email"
          className={`min-w-0 flex-1 border px-4 py-3 text-sm focus:outline-none ${colors.input}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`px-6 py-3 text-xs uppercase tracking-wide2 transition-colors disabled:opacity-60 ${
            accent === "qf" ? "" : "font-mono"
          } ${colors.button}`}
        >
          {status === "loading" ? "Transmitting…" : "Subscribe"}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-xs tracking-wide ${
          accent === "qf" ? "font-qf-mono" : "font-mono"
        } ${status === "error" ? "text-magenta" : colors.note}`}
      >
        {message}
      </p>
    </div>
  );
}

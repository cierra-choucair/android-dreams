"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const VARIANTS = {
  // Dark surfaces with gold accents (Davos, Contact)
  gold: {
    input:
      "w-full rounded-lg border border-gold/30 bg-ink/60 px-4 py-3 font-serif text-sm text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none",
    label: "mb-2 block font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-dim",
    button:
      "rounded-lg bg-gold px-8 py-3.5 font-serif font-semibold text-xs uppercase tracking-wide2 text-ink transition-colors hover:bg-gold/85 disabled:opacity-60",
    status: "font-serif font-semibold",
    error: "text-magenta",
    ok: "text-dim",
  },
  // QRC light surface (white page, Void text, Signal accent)
  qrc: {
    input:
      "w-full rounded-lg border border-qf-void/25 bg-white px-4 py-3 font-qf-mono text-sm text-qf-void placeholder:text-qf-void/40 focus:border-qf-signal focus:outline-none",
    label:
      "mb-2 block font-qf-mono text-[0.72rem] uppercase tracking-[0.2em] text-qf-void/60",
    button:
      "rounded-lg bg-qf-signal px-8 py-3.5 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink disabled:opacity-60",
    status: "font-qf-mono",
    error: "text-qf-signal-deep",
    ok: "text-qf-void/60",
  },
} as const;

/**
 * Inquiry form. Posts to /api/inquire, which relays to the WordPress
 * Contact Form 7 endpoint configured per form via env vars.
 */
export function InquiryForm({
  form = "davos",
  messageLabel = "What brings you to this page?",
  submitLabel = "Request an invitation",
}: {
  form?: "davos" | "contact" | "qrc";
  messageLabel?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const v = VARIANTS[form === "qrc" ? "qrc" : "gold"];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el).entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, form }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setStatus("success");
        setMessage("Received. We read everything — you will hear from us.");
        el.reset();
      } else {
        setStatus("error");
        setMessage(body.error || "Something interfered. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something interfered. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${form}-name`} className={v.label}>
            Name
          </label>
          <input id={`${form}-name`} name="name" type="text" required autoComplete="name" className={v.input} />
        </div>
        <div>
          <label htmlFor={`${form}-email`} className={v.label}>
            Email
          </label>
          <input id={`${form}-email`} name="email" type="email" required autoComplete="email" className={v.input} />
        </div>
      </div>
      <div>
        <label htmlFor={`${form}-organization`} className={v.label}>
          Organization
        </label>
        <input
          id={`${form}-organization`}
          name="organization"
          type="text"
          autoComplete="organization"
          className={v.input}
        />
      </div>
      <div>
        <label htmlFor={`${form}-message`} className={v.label}>
          {messageLabel}
        </label>
        <textarea id={`${form}-message`} name="message" rows={5} required className={v.input} />
      </div>
      <button type="submit" disabled={status === "loading"} className={v.button}>
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.25rem] text-xs tracking-wide ${v.status} ${
          status === "error" ? v.error : v.ok
        }`}
      >
        {message}
      </p>
    </form>
  );
}

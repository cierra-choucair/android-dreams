"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border border-gold/30 bg-ink/60 px-4 py-3 font-mono text-sm text-cream placeholder:text-dimmer focus:border-gold focus:outline-none";

/**
 * Invitation/contact form. Posts to /api/inquire, which relays to the
 * WordPress Contact Form 7 endpoint configured via env vars.
 */
export function InquiryForm({
  form = "davos",
  messageLabel = "What brings you to this page?",
  submitLabel = "Request an invitation",
}: {
  form?: "davos" | "contact";
  messageLabel?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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
          <label
            htmlFor={`${form}-name`}
            className="mb-2 block font-mono text-[0.65rem] uppercase tracking-wide2 text-dim"
          >
            Name
          </label>
          <input id={`${form}-name`} name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label
            htmlFor={`${form}-email`}
            className="mb-2 block font-mono text-[0.65rem] uppercase tracking-wide2 text-dim"
          >
            Email
          </label>
          <input id={`${form}-email`} name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>
      <div>
        <label
          htmlFor={`${form}-organization`}
          className="mb-2 block font-mono text-[0.65rem] uppercase tracking-wide2 text-dim"
        >
          Organization
        </label>
        <input
          id={`${form}-organization`}
          name="organization"
          type="text"
          autoComplete="organization"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor={`${form}-message`}
          className="mb-2 block font-mono text-[0.65rem] uppercase tracking-wide2 text-dim"
        >
          {messageLabel}
        </label>
        <textarea id={`${form}-message`} name="message" rows={5} required className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-wide2 text-ink transition-colors hover:bg-gold/85 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.25rem] font-mono text-xs tracking-wide ${
          status === "error" ? "text-magenta" : "text-dim"
        }`}
      >
        {message}
      </p>
    </form>
  );
}

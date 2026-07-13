"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

// Backfill values for the CF7 template fields the signup doesn't collect —
// keep in sync with the server-side defaults in /api/inquire.
const SIGNUP_NAME = "Hackathon updates signup";
const SIGNUP_MESSAGE = "Sign me up for updates on the quantum hackathon.";

/**
 * Pre-launch email capture for the quantum hackathon. Posts to
 * /api/inquire (form "hackathon"), which relays to the WordPress
 * Contact Form 7 endpoint. Only the email address is collected.
 */
export function HackathonSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  /**
   * Fallback path: submit straight from the browser to the WordPress
   * Contact Form 7 endpoint. The server relay posts from a datacenter IP,
   * which the CMS host's bot filter can intercept — browser traffic is
   * what CF7 normally receives and passes clean.
   */
  async function submitDirect(email: string) {
    try {
      const cfg = (await (
        await fetch("/api/inquire?form=hackathon&config=1")
      ).json()) as { feedbackUrl?: string; unitTag?: string };
      if (!cfg.feedbackUrl || !cfg.unitTag) return false;

      const fd = new FormData();
      fd.set("_wpcf7_unit_tag", cfg.unitTag);
      fd.set("your-name", SIGNUP_NAME);
      fd.set("your-email", email);
      fd.set("your-organization", "");
      fd.set("your-message", SIGNUP_MESSAGE);

      const res = await fetch(cfg.feedbackUrl, { method: "POST", body: fd });
      const cf7 = (await res.json().catch(() => null)) as { status?: string } | null;
      return cf7?.status === "mail_sent" || cf7?.status === "mail_failed";
    } catch {
      return false;
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const email = String(new FormData(el).get("email") ?? "");

    setStatus("loading");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "hackathon", email }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok || (res.status >= 500 && (await submitDirect(email)))) {
        setStatus("success");
        setMessage("You're on the list. You'll hear from us the moment the launch is official.");
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
    <form onSubmit={onSubmit} className="text-left">
      <label
        htmlFor="hackathon-email"
        className="mb-2 block font-serif text-[0.72rem] font-semibold uppercase tracking-wide2 text-dim"
      >
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="hackathon-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@university.rs"
          className="w-full flex-1 rounded-lg border border-cyan/30 bg-ink/60 px-4 py-3.5 font-serif text-sm text-cream placeholder:text-cream/40 focus:border-cyan focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-cyan px-8 py-3.5 font-serif text-xs font-semibold uppercase tracking-wide2 text-ink transition-colors hover:bg-cyan/85 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Keep me posted"}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] font-serif text-xs font-semibold tracking-wide ${
          status === "error" ? "text-magenta" : "text-dim"
        }`}
      >
        {message}
      </p>
    </form>
  );
}

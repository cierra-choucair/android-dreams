import { NextResponse } from "next/server";

/**
 * Inquiry endpoint for the /davos invitation form and the /contact page.
 * Relays to the WordPress Contact Form 7 REST endpoint; the target form ID
 * is configured per form via env vars.
 */

function resolveTarget(form: unknown) {
  const wpBase = (process.env.NEXT_PUBLIC_WP_API_URL || "").replace(/\/$/, "");
  const formId =
    form === "contact"
      ? process.env.WP_CF7_CONTACT_FORM_ID
      : form === "qrc"
        ? process.env.WP_CF7_QRC_FORM_ID || process.env.WP_CF7_CONTACT_FORM_ID
        : process.env.WP_CF7_DAVOS_FORM_ID;
  return { wpBase, formId };
}

const feedbackUrl = (wpBase: string, formId: string) =>
  `${wpBase}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

/**
 * Self-diagnosis: GET /api/inquire?form=qrc posts an EMPTY submission to the
 * configured CF7 form and reports the raw response. Nothing gets stored —
 * required fields are missing, so CF7 rejects it — but the status tells us
 * whether the form ID, the REST route, and the host firewall are all sound.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const form = url.searchParams.get("form") ?? "qrc";
  const { wpBase, formId } = resolveTarget(form);

  if (!wpBase) {
    return NextResponse.json({ ok: false, verdict: "NEXT_PUBLIC_WP_API_URL is not set on this deployment." });
  }
  if (!formId) {
    return NextResponse.json({ ok: false, verdict: `No form ID configured for "${form}" — set the WP_CF7_*_FORM_ID env var on Vercel and redeploy.` });
  }

  const target = feedbackUrl(wpBase, formId);

  // Config mode: hand the browser the CF7 endpoint without probing it.
  // Used by the form's direct-submission fallback when the CMS host's
  // bot filter blocks POSTs arriving from this server's datacenter IP.
  if (url.searchParams.get("config") === "1") {
    return NextResponse.json({ ok: true, feedbackUrl: target });
  }
  try {
    const res = await fetch(target, { method: "POST", body: new FormData(), cache: "no-store" });
    const raw = await res.text();
    let cf7: { status?: string; message?: string } = {};
    try {
      cf7 = JSON.parse(raw) as typeof cf7;
    } catch {
      // Non-JSON response: a firewall or security layer intercepted the call.
    }

    const verdict =
      cf7.status === "validation_failed"
        ? "Wiring is correct: the form exists and accepts API submissions (this empty test was rejected for missing fields, as expected). If real submissions still fail, the failure text now includes the CMS status — submit once more and read it."
        : res.status === 404
          ? "No CF7 form with this ID — the WP_CF7_*_FORM_ID value doesn't match the number in the form's edit URL (post=…)."
          : cf7.status
            ? `Unexpected CF7 status "${cf7.status}" — see message.`
            : `Non-CF7 response (HTTP ${res.status}) — a security plugin or the host firewall is likely intercepting REST API calls.`;

    return NextResponse.json({
      ok: cf7.status === "validation_failed",
      checked: target,
      httpStatus: res.status,
      cf7Status: cf7.status ?? null,
      cf7Message: cf7.message ?? null,
      bodyPreview: cf7.status ? undefined : raw.slice(0, 300),
      verdict,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      checked: target,
      verdict: `Could not reach the CMS at all: ${err instanceof Error ? err.message : "network error"}`,
    });
  }
}

export async function POST(request: Request) {
  let body: {
    form?: unknown;
    name?: unknown;
    email?: unknown;
    organization?: unknown;
    message?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { form, name, email, organization, message } = body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message are required." },
      { status: 400 },
    );
  }

  const { wpBase, formId } = resolveTarget(form);

  if (!wpBase || !formId) {
    return NextResponse.json(
      { error: "The inbox isn't wired up yet. Email us directly for now." },
      { status: 503 },
    );
  }

  // Contact Form 7 expects multipart/form-data with its field naming scheme.
  const cf7 = new FormData();
  cf7.set("your-name", name.trim().slice(0, 200));
  cf7.set("your-email", email.trim().slice(0, 200));
  cf7.set(
    "your-organization",
    typeof organization === "string" ? organization.trim().slice(0, 200) : "",
  );
  cf7.set("your-message", message.trim().slice(0, 5000));

  try {
    const res = await fetch(feedbackUrl(wpBase, formId), {
      method: "POST",
      body: cf7,
    });
    const data = (await res.json().catch(() => ({}))) as {
      status?: string;
      message?: string;
    };

    // "mail_sent" is the clean path. "mail_failed" means CF7 accepted the
    // submission but WordPress couldn't send the notification email —
    // Flamingo has still stored it, so the sign-up is safe. Don't turn a
    // captured lead away; log it so the mail problem gets fixed.
    if (res.ok && (data.status === "mail_sent" || data.status === "mail_failed")) {
      if (data.status === "mail_failed") {
        console.error(
          `[inquire] form=${String(form)}: submission stored, but WordPress could not send the notification email. Install/configure WP Mail SMTP on the CMS.`,
        );
      }
      return NextResponse.json({ ok: true });
    }

    if (data.status === "validation_failed") {
      console.error(`[inquire] form=${String(form)}: CF7 validation failed — ${data.message}`);
      return NextResponse.json(
        {
          error:
            "The CMS rejected the fields — the form template's field names don't match (your-name, your-email, your-organization, your-message).",
        },
        { status: 502 },
      );
    }

    if (res.status === 404) {
      return NextResponse.json(
        { error: "No form with that ID on the CMS — check WP_CF7_QRC_FORM_ID." },
        { status: 502 },
      );
    }

    console.error(
      `[inquire] form=${String(form)}: unexpected CF7 response ${res.status} status=${data.status} — ${data.message}`,
    );
    return NextResponse.json(
      {
        error: `The message didn't go through — the CMS answered HTTP ${res.status}${
          data.status ? ` · "${data.status}"` : ""
        }${data.message ? `: ${data.message}` : ""}`,
      },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the newsroom. Try again." },
      { status: 502 },
    );
  }
}

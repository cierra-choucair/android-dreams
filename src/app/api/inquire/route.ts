import { NextResponse } from "next/server";

/**
 * Inquiry endpoint for the /davos invitation form and the /contact page.
 * Relays to the WordPress Contact Form 7 REST endpoint; the target form ID
 * is configured per form via env vars.
 */
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

  const wpBase = (process.env.NEXT_PUBLIC_WP_API_URL || "").replace(/\/$/, "");
  const formId =
    form === "contact"
      ? process.env.WP_CF7_CONTACT_FORM_ID
      : form === "qrc"
        ? process.env.WP_CF7_QRC_FORM_ID || process.env.WP_CF7_CONTACT_FORM_ID
        : process.env.WP_CF7_DAVOS_FORM_ID;

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
    const res = await fetch(
      `${wpBase}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
      { method: "POST", body: cf7 },
    );
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
      { error: "The message didn't go through. Try again." },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the newsroom. Try again." },
      { status: 502 },
    );
  }
}

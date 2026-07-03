import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint. Relays to the beehiiv API server-side so
 * the API key never reaches the client.
 *
 * Two publications:
 *  - "ad" — Android Dreams / The Sunday Letter
 *  - "qf" — QFrontline / The Dev Brief
 */
function publicationId(publication: unknown): string | undefined {
  if (publication === "qf") {
    return process.env.NEXT_PUBLIC_BEEHIIV_QF_PUBLICATION_ID;
  }
  // Default: Android Dreams (legacy env var kept as fallback)
  return (
    process.env.NEXT_PUBLIC_BEEHIIV_AD_PUBLICATION_ID ||
    process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID
  );
}

export async function POST(request: Request) {
  let email: unknown;
  let publication: unknown;
  try {
    ({ email, publication } = (await request.json()) as {
      email?: unknown;
      publication?: unknown;
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't parse. Check it and retry." },
      { status: 400 },
    );
  }

  const pubId = publicationId(publication);
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!pubId || !apiKey) {
    return NextResponse.json(
      { error: "Subscriptions open soon — the newsletter backend isn't connected yet." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "androiddreamsmedia.com",
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "The subscription service balked. Try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the subscription service. Try again." },
      { status: 502 },
    );
  }
}

import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint. Relays to the beehiiv API server-side so
 * the API key never reaches the client.
 */
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = (await request.json()) as { email?: unknown });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't parse. Check it and retry." },
      { status: 400 },
    );
  }

  const publicationId = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!publicationId || !apiKey) {
    return NextResponse.json(
      { error: "Subscriptions open soon — the newsletter backend isn't connected yet." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
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
          utm_source: "androiddreams.com",
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

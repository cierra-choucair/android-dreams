/** Hosted beehiiv destinations — env-overridable, sensible defaults. */

export const AD_SUBSCRIBE_URL =
  process.env.NEXT_PUBLIC_AD_SUBSCRIBE_URL ||
  "https://android-dreams.beehiiv.com/subscribe";

export const AD_NEWSLETTER_ARCHIVE_URL =
  process.env.NEXT_PUBLIC_AD_NEWSLETTER_ARCHIVE_URL ||
  "https://android-dreams.beehiiv.com/";

export const QF_SUBSCRIBE_URL =
  process.env.NEXT_PUBLIC_QF_SUBSCRIBE_URL ||
  "https://qfrontline.beehiiv.com/subscribe";

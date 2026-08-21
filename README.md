# Android Dreams

The flagship site of Android Dreams Media — a digital magazine at the
intersection of rigorous journalism and visionary storytelling, covering
quantum technology, artificial intelligence, and the deep science building
our sci-fi future.

**Tagline:** Imagine the future.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **WordPress** as a headless CMS via the native REST API (`/wp-json/wp/v2`)
- **ISR** — homepage revalidates every 1 min, archives every 5 min,
  articles every 15 min
- **beehiiv** for newsletter subscriptions (server-side API relay)
- Deploys to **Vercel** as-is

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WP_API_URL` | WordPress base URL (no trailing slash). **When unset, the site serves built-in sample content** so the design is reviewable before the CMS exists. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonicals, OG tags, RSS, sitemap. |
| `NEXT_PUBLIC_AD_SUBSCRIBE_URL` | Hosted beehiiv subscribe page for The Sunday Letter (default baked in). |
| `NEXT_PUBLIC_AD_NEWSLETTER_ARCHIVE_URL` | Hosted beehiiv archive for past letters (default baked in). |
| `NEXT_PUBLIC_QF_SUBSCRIBE_URL` | Hosted beehiiv subscribe page for the Dev Brief (default baked in). |
| `NEXT_PUBLIC_QRC_DISCORD_URL` | QRC Discord invite. Unset = "request an invite" flow. |
| `NEXT_PUBLIC_QRC_LINKEDIN_URL` | QRC LinkedIn page/group. Unset = "opening soon". |
| `WP_CF7_DAVOS_FORM_ID` | Contact Form 7 form ID for the `/davos` invitation form. |
| `WP_CF7_CONTACT_FORM_ID` | Contact Form 7 form ID for the `/contact` page. |
| `WP_CF7_QRC_FORM_ID` | Contact Form 7 form ID for QRC invite requests (falls back to contact form). |
| `REVALIDATE_SECRET` | Shared secret for on-demand revalidation — see "Instant publishing" below. |

## Content model (WordPress)

Posts are the only content type. WordPress **categories** map to editorial
formats:

| Category slug | Format | Accent |
| --- | --- | --- |
| `transmissions` | Daily dispatches | Warm `#FF8A3D` |
| `deep-read` | Long-form journalism | Cyan `#3A8FFF` |
| `sci-fi-lens` | Science fiction as framework | Magenta `#FF1F3D` |
| `sunday-letter` | The founder's weekly letter | Dust `#A098B8` |
| `qfrontline` | Developer vertical | Signal Magenta `#FF2B5E` |

Special **tags**: `featured` pins a post to the homepage hero;
`dev-brief` feeds the QFrontline terminal mockup.

## Routes

- `/` home · `/[format]` archives · `/[format]/[slug]` articles
- `/qfrontline` developer vertical landing + `/qfrontline/[slug]`
- `/authors/[slug]`, `/topics/[slug]`, `/search`
- `/community` (+ `/community/join`), `/summit`, `/davos` — sibling property landings
- `/about`, `/contact` — `/newsletter` redirects to `/sunday-letter`, which is the newsletter
- `/rss.xml` + per-format `/[format]/rss.xml`, `/sitemap.xml`, `/robots.txt`

## Instant publishing (on-demand revalidation)

ISR keeps pages fresh on a schedule (homepage 1 min, archives 5 min,
articles 15 min). For instant updates when a post is published or edited,
wire WordPress to ping the site:

1. Set `REVALIDATE_SECRET` in Vercel (any long random string).
2. Copy `wordpress/ad-revalidate.php` into the WordPress install at
   `wp-content/mu-plugins/ad-revalidate.php` (create the folder if needed).
3. Add to `wp-config.php`:

   ```php
   define('AD_REVALIDATE_URL',    'https://www.androiddreamsmedia.com/api/revalidate');
   define('AD_REVALIDATE_SECRET', 'the-same-value-as-REVALIDATE_SECRET');
   ```

Publishing, updating, or unpublishing a post then regenerates the post
page, its archive, the feeds, and the homepage immediately. The scheduled
ISR windows remain as a backstop.

## Deployment

```bash
vercel deploy
```

Set the environment variables in the Vercel project settings. No other
configuration is required.

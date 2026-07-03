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
| `NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID` | beehiiv publication ID. |
| `BEEHIIV_API_KEY` | beehiiv API key — server-side only. |
| `WP_CF7_DAVOS_FORM_ID` | Contact Form 7 form ID for the `/davos` invitation form. |
| `WP_CF7_CONTACT_FORM_ID` | Contact Form 7 form ID for the `/contact` page. |

## Content model (WordPress)

Posts are the only content type. WordPress **categories** map to editorial
formats:

| Category slug | Format | Accent |
| --- | --- | --- |
| `transmissions` | Daily dispatches | Orange `#FF6A00` |
| `deep-read` | Long-form journalism | Cyan `#00D4FF` |
| `sci-fi-lens` | Science fiction as framework | Magenta `#E8197D` |
| `sunday-letter` | The founder's weekly letter | Gold `#C9A84C` |
| `qfrontline` | Developer vertical | Matrix green `#00FF41` |

Special **tags**: `featured` pins a post to the homepage hero;
`dev-brief` feeds the QFrontline terminal mockup.

## Routes

- `/` home · `/[format]` archives · `/[format]/[slug]` articles
- `/qfrontline` developer vertical landing + `/qfrontline/[slug]`
- `/authors/[slug]`, `/topics/[slug]`, `/search`
- `/community`, `/summit`, `/davos` — sibling property landings
- `/about`, `/newsletter`, `/contact`
- `/rss.xml` + per-format `/[format]/rss.xml`, `/sitemap.xml`, `/robots.txt`

## Deployment

```bash
vercel deploy
```

Set the environment variables in the Vercel project settings. No other
configuration is required.

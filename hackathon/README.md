# Quantum Hackathon — standalone pre-launch site

Pre-launch landing page for Serbia's first applied quantum hackathon, a
partnership between **Universum Labs** and the **Center for Quantum
Technologies Serbia (CQT Serbia)**.

This is a fully standalone static site — plain HTML/CSS/JS, no build
step, no dependencies. It is **not** part of the Next.js app in the rest
of this repository.

```
index.html   page structure + all copy
styles.css   design system (light theme, violet/cyan accents)
script.js    animated Bloch sphere hero + signup form handler
```

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve hackathon
```

## Deploy

Any static host works — the folder is the site:

- **Vercel**: `vercel deploy hackathon` (or a new project with root
  directory set to `hackathon/`)
- **Netlify**: drag the folder into the dashboard
- **GitHub Pages / Cloudflare Pages**: point at this directory

## Wire up email capture

The signup form posts to the URL in the form's `data-endpoint` attribute
in `index.html`:

```html
<form id="signup" class="signup" data-endpoint="" novalidate>
```

Until it's set, submitting shows an inline "not connected yet" notice.
Options:

1. **Formspree** (fastest) — create a form at formspree.io and paste its
   URL: `data-endpoint="https://formspree.io/f/XXXXXXXX"`. The handler
   already sends `Accept: application/json` and an `email` field.
2. **Any form backend** (Basin, Getform, Web3Forms, …) — same deal:
   paste the POST URL. The request is `multipart/form-data` with a
   single `email` field, plus a `company` honeypot field that is empty
   for real submissions (most backends let you filter on it).
3. **Newsletter tool** (beehiiv, Mailchimp, Buttondown, …) — either
   point `data-endpoint` at a small serverless relay to the tool's
   subscribe API, or replace the `<form>` block with the tool's embed
   code.

## Content still to land

- **Event name** — the hero currently leads with "Serbia's first applied
  quantum hackathon" as the working title.
- **Challenge tracks** — the three cards under *About the challenge* are
  candidate areas and labeled as such; swap in the final tracks when
  they're confirmed.
- **Dates/venue** — "Belgrade · Autumn 2026" placeholder tiles in the
  facts row.

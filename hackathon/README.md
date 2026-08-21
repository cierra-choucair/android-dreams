# Qiskit Fall Fest Serbia — standalone pre-launch site

Pre-launch landing page for the Qiskit Fall Fest Serbia and Serbia's
first applied quantum hackathon — **Universum Labs**, the **Center for
Quantum Technologies of Serbia**, and **IBM Quantum** (Qiskit Fall
Fest program). Two Saturdays in Belgrade: Fall Fest lecture day on
21 November 2026, hackathon on 28 November 2026.

This is a fully standalone static site — plain HTML/CSS/JS, no build
step, no dependencies. It is **not** part of the Next.js app in the rest
of this repository.

```
index.html   page structure + all copy
styles.css   design system (light theme, violet/cyan accents)
script.js    animated Bloch sphere hero + signup form handler
assets/      partner logos (see "Logos" below)
```

## Logos

- `assets/ibm-quantum-rev.svg` — the official IBM Quantum reversed
  (white) logotype, converted from the supplied `.ai`. It is white-only,
  so the page shows it on a dark chip, which is what reversed logos are
  for.
- `assets/universum-labs.svg` and `assets/cqt-serbia.svg` are **interim
  stand-ins** drawn to match the real marks — the originals arrived as
  chat images, not files. Overwrite these two files with the official
  exports (SVG or PNG at the same paths, updating the `src` extension in
  `index.html` if PNG) and the site picks them up with no other changes.

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

- **Official logos** — replace the two interim files in `assets/` (see
  "Logos" above).
- **Challenge tracks** — the three cards under *About the challenge* are
  candidate areas and labeled as such; swap in the final tracks when
  they're confirmed.
- **Venue room** — copy says "university venue in Belgrade, room
  announced with registration" until the space is reserved in September.
- **Registration/application links** — the signup form collects emails
  for now; add Fall Fest registration and the hackathon application form
  when they exist.

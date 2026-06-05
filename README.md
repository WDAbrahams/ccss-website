# CCSS Website

Multi-page marketing website for **CCSS** — a hospitality, conferencing, and venue management business. Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no package managers.

---

## Tech stack

- **HTML5** — semantic markup
- **CSS** — custom properties, Flexbox, CSS Grid, mobile-first media queries
- **Vanilla JavaScript (ES6+)** — no jQuery, React, or Tailwind
- **No build step** — files are served directly to the browser
- **No npm packages** — everything is either native browser APIs or CDN-loaded

---

## File structure

```
/
├── index.html              ← Home (hero, nav cards, testimonials, logo strip)
├── about.html              ← About: story, mission, values
├── team.html               ← Team: grid of member cards
├── services.html           ← Services: 6 service cards (5 + 1 placeholder)
├── gallery.html            ← Gallery: masonry grid + lightbox
├── contact.html            ← Contact: Web3Forms form, map, business details
├── 404.html                ← Not Found page
├── robots.txt              ← Crawler rules + sitemap pointer
├── sitemap.xml             ← Page list for search engines
├── README.md               ← This file
├── .gitignore
├── css/
│   └── styles.css          ← All site styles (sectioned with comments)
├── js/
│   ├── main.js             ← Navbar, mobile menu, scroll fade-ins, footer year
│   ├── carousel.js         ← Testimonial carousel
│   ├── gallery.js          ← Lightbox (open, prev/next, ESC, click-outside)
│   └── form.js             ← Contact form: validation + Web3Forms submit
├── images/
│   ├── hero/               ← Full-screen hero images per page
│   ├── services/           ← Service card backgrounds
│   ├── gallery/            ← Gallery photographs
│   ├── team/               ← Team headshots
│   ├── logos/              ← Membership / affiliation logos
│   └── og-image.jpg        ← Open Graph share image (1200x630)
└── assets/
    └── icons/              ← Reserved for SVG icons (currently inline in HTML)
```

> The `images/` and `assets/icons/` folders may not exist in your initial clone — create them as you add content. Until you drop in real images, the site uses placeholders from `placehold.co` (no setup required).

---

## Local development

### Easiest: open in a browser

Double-click `index.html`. The site will load.

### Better: VS Code Live Server

1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` → **Open with Live Server**

Use Live Server (or any local HTTP server) rather than opening the file directly because:

- Some browsers block `fetch()` requests from `file://` URLs (the contact form uses `fetch`)
- Some font-loading optimisations only work over HTTP
- Auto-reload on save makes editing much faster

Alternative one-liners if you have Python or Node available:

```bash
# Python 3
python -m http.server 8000

# Node (with npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## How to edit content

| I want to change…                          | Edit this file                                              |
| ------------------------------------------ | ----------------------------------------------------------- |
| Hero headline (home)                       | `index.html` — `.hero__title`                               |
| The four cards on the home page            | `index.html` — `.home-nav-cards` block                      |
| Testimonial quotes / authors               | `index.html` — `.carousel__track` (3 `.carousel__slide`s)   |
| Affiliation logos                          | `index.html` — `.logos` block (drop new files in `images/logos/`) |
| About story / mission / values             | `about.html`                                                |
| Team members                               | `team.html` — copy a `.team-card` block, edit                |
| Service titles or descriptions             | `services.html` — each `.service-card` block                |
| The 6th service ("Coming Soon" placeholder)| `services.html` — search for `SIXTH SERVICE` comment        |
| Gallery images                             | `gallery.html` — `.gallery` block (see "Add a gallery image" below) |
| Contact details, address, hours            | `contact.html` — `.contact-info` block + every footer       |
| Embedded Google Map                        | `contact.html` — `<iframe class="contact-map" …>`           |
| Footer text, social links                  | every HTML file (footer is duplicated — search & replace)   |
| Brand colours                              | `css/styles.css` — `:root { … }` block at the top           |
| Fonts                                      | `<link rel="stylesheet" …>` in each HTML `<head>`, plus `--font-serif` in `:root` |
| Web3Forms access key                       | `contact.html` — `value="…"` (already set; replace to use a different key) |
| GA4 measurement ID                         | every HTML file — search for `G-TRFS920L8L` (already set)   |

### How to add a gallery image

1. Drop the image file into `images/gallery/` (use a SEO-friendly name like `cape-town-conference-2026.webp`).
2. Open `gallery.html` and copy one of the `<button class="gallery__item">…</button>` blocks.
3. Update the `<img src="…">` to point to your new file, and rewrite the `alt` text to describe the image.
4. (Optional) Add `data-full="path/to/highres.webp"` to the button if you want a higher-resolution image to load in the lightbox.

### How to add a team member

1. Drop a portrait photo into `images/team/`.
2. Open `team.html` and copy any `<article class="team-card">…</article>` block.
3. Update the `background-image` URL on `.team-card__photo`, the name, the role, and the bio.

### How to add or change a service card

Open `services.html` and find the card you want to edit (or copy an existing one). Update:

- `<h3 class="service-card__title">`
- the description in `<p>`
- the `background-image` URL on `.service-card__media`
- the `aria-label` on the `<a>`

The 6th service is a placeholder — search for the `SIXTH SERVICE` comment in `services.html` for instructions on filling it in.

---

## Integrations

### Web3Forms (contact form)

The contact form is **already wired up** with the live CCSS access key in `contact.html`:

```html
<input type="hidden" name="access_key" value="86d6b3d9-64ba-4a7e-b190-ba9d71ddd481">
```

To use a different account: visit [web3forms.com](https://web3forms.com), sign up (free), copy your **access key**, and replace the value above.

The access key is **public-safe** to commit to a repo — Web3Forms is designed for static sites.

### Google Analytics 4

GA4 is **already configured** with the live CCSS measurement ID `G-TRFS920L8L`. The `gtag.js` snippet is present in the `<head>` of every HTML file (`index.html`, `about.html`, `team.html`, `services.html`, `gallery.html`, `contact.html`, `404.html`).

To use a different property: visit [analytics.google.com](https://analytics.google.com), create a property, copy your **measurement ID** (looks like `G-XXXXXXXXXX`), and find-and-replace `G-TRFS920L8L` across the project — there are **two** instances per file:
   - Once in the `<script async src="https://www.googletagmanager.com/gtag/js?id=G-TRFS920L8L">` line
   - Once in the inline `gtag('config', 'G-TRFS920L8L')` call

### Google Maps embed

In `contact.html` the map is currently a generic embed URL. To use your real address:

1. Go to [maps.google.com](https://maps.google.com), find your business address.
2. Click **Share → Embed a map → Copy HTML**.
3. Replace the `src="…"` of the `<iframe class="contact-map">` with the URL Google gives you.

### Future integrations

`js/main.js` ends with a clearly commented block:

```js
/* === Future integrations (newsletter, chatbot, booking widget) ===
   Add new integrations here. Keep each one in its own function. */
```

Add new integrations there, each as its own function called from `init()`.

---

## Deployment: GitHub → Cloudflare Pages

### 1. Initialise Git and push to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial CCSS website scaffold"
git branch -M main
```

Then create a new repository on GitHub (don't add a README — you already have one), and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/ccss-website.git
git push -u origin main
```

### 2. Connect the repo to Cloudflare Pages

1. Sign in to [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorise Cloudflare to access your GitHub account, then select the `ccss-website` repository.
3. On the build settings page:
   - **Project name**: `ccss-website` (or whatever subdomain you'd like at `*.pages.dev`)
   - **Production branch**: `main`
   - **Framework preset**: *None*
   - **Build command**: *(leave blank)* — this is a static site
   - **Build output directory**: `/`
4. Click **Save and Deploy**. Within a minute or two, Cloudflare will give you a URL like `https://ccss-website.pages.dev`.

Every push to `main` will redeploy automatically.

### 3. Verify the deploy

- Visit the `*.pages.dev` URL.
- Confirm the SSL padlock is active in the browser.
- Open Chrome DevTools → **Lighthouse** → **Generate report**. Target: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.

---

## Custom domain (GoDaddy → Cloudflare)

You have two options. **Option A** is recommended because it gives you Cloudflare's full DNS / caching / SSL feature set.

### Option A — change GoDaddy nameservers to Cloudflare (recommended)

1. In Cloudflare, go to **Websites** → **Add a site** → enter your domain (e.g. `ccss.co.za`) → choose the **Free** plan.
2. Cloudflare will scan your existing DNS records and give you **two nameservers** (e.g. `xxx.ns.cloudflare.com` and `yyy.ns.cloudflare.com`).
3. In **GoDaddy** → **My Domains** → your domain → **DNS** → **Nameservers** → **Change** → choose **Custom** → paste the two Cloudflare nameservers.
4. Save. DNS propagation can take a few minutes to a few hours.
5. Back in Cloudflare → **Websites** → your domain → **DNS**, add:
   - A `CNAME` record: name `@` (root) → target `ccss-website.pages.dev` → Proxy status **Proxied**
   - A `CNAME` record: name `www` → target `ccss-website.pages.dev` → Proxy status **Proxied**
6. In **Pages** → your project → **Custom domains** → **Set up a custom domain** → enter `ccss.co.za`. Cloudflare wires it up automatically.

### Option B — keep GoDaddy DNS

1. In **GoDaddy** → your domain → **DNS** → **Records**.
2. Add a `CNAME` record: name `www` → value `ccss-website.pages.dev`.
3. (For the root domain `ccss.co.za`, GoDaddy doesn't allow `CNAME` at the apex — use **Forwarding** to redirect `ccss.co.za` to `https://www.ccss.co.za` instead.)
4. In **Cloudflare Pages** → your project → **Custom domains** → add `www.ccss.co.za`.

---

## Performance notes

- All non-hero images use `loading="lazy"`.
- Hero images use `loading="eager"` and `fetchpriority="high"` (the home hero is also `<link rel="preload">`-ed).
- Fonts use `font-display: swap` to avoid invisible text during load.
- The CSS file is intentionally readable rather than minified — for production you can run a minifier (e.g. [csso](https://css.github.io/csso/csso.html) or VS Code's "Minify" extension) if you need to squeeze every byte. This is optional and not required for the deploy.

---

## Colour palette

| Token                   | Hex       | Use                                            |
| ----------------------- | --------- | ---------------------------------------------- |
| `--color-bg`            | `#0B0B0B` | Main background (black)                        |
| `--color-bg-alt`        | `#1A1A1A` | Alternating sections (charcoal)                |
| `--color-surface`       | `#333533` | Cards, elevated surfaces (jet)                 |
| `--color-accent`        | `#B87333` | Buttons, highlights, links (copper)            |
| `--color-accent-hover`  | `#D08A47` | Hover states (lighter copper)                  |
| `--color-text`          | `#F2ECDD` | Body text (eggshell)                           |
| `--color-text-muted`    | `#94908A` | Secondary text (muted eggshell)                |
| `--color-border`        | `#2A2A2A` | Borders, dividers                              |

To rebrand: edit only the `:root` block at the top of `css/styles.css`. Every component reads from these tokens.

---

## Browser support

Modern evergreen browsers — **Chrome, Firefox, Safari, Edge** (current and previous major versions). The site uses:

- CSS custom properties, Flexbox, Grid
- IntersectionObserver
- `fetch()`
- `backdrop-filter` (with `-webkit-` fallback)

These are all supported in the target browsers without polyfills.

---

## Licence

© CCSS. All rights reserved. Replace this notice with the licence of your choice (e.g. MIT) before open-sourcing.

# Project Brief: CCSS Website

## Goal
Build a multi-page, fully responsive marketing website for **CCSS** (a hospitality / events / venue management business) using **vanilla HTML, CSS, and JavaScript only**. No frameworks, no build tools, no package managers. The site must be easy for a beginner programmer to read, edit, and maintain.

The site will be version-controlled on GitHub and deployed to **Cloudflare Pages**. The domain is registered with GoDaddy and will be pointed at Cloudflare.

---

## Tech stack (strict — do not deviate)

- **HTML5** — semantic markup
- **Vanilla CSS** — CSS custom properties for theming, Flexbox and Grid for layout
- **Vanilla JavaScript (ES6+)** — no jQuery, no React, no Next.js, no Tailwind, no frameworks
- **No build step** — files served directly to the browser
- **No npm packages** — if a third-party library is unavoidable, load it via CDN; otherwise prefer native browser APIs (IntersectionObserver, fetch, etc.)

---

## Pages (multi-page architecture — one HTML file per page)

1. `index.html` — Home
2. `about.html` — About CCSS
3. `team.html` — Our Team
4. `services.html` — Services
5. `gallery.html` — Gallery
6. `contact.html` — Contact Us
7. `404.html` — Not Found

Every page shares:
- A sticky navbar (with the active page link highlighted)
- A full-screen hero image with the page name overlaid in large type
- A shared footer

Navigation between pages uses standard `<a href="page.html">` links. In-page anchor links (`#section-id`) are only used for scrolling within the home page.

---

## Page-by-page content

### Home (`index.html`)
- **Hero**: full-screen image, headline, subheadline, CTA button
- **4 navigation cards** below the hero, linking to About CCSS, The Team, Services, Gallery
- **"Our Clients"**: carousel/slider of 3 testimonial quotes (name, role, avatar placeholder, 5-star SVG rating)
- **"Membership & Affiliations"**: static logo strip (placeholder logos); each logo brightens slightly on hover
- Footer

### About CCSS (`about.html`)
- Hero with page name
- Company story, mission, values sections (placeholder copy)
- Footer

### Our Team (`team.html`)
- Hero with page name
- Grid of team member cards (placeholder photo, name, role, short bio)
- Footer

### Services (`services.html`)
- Hero with page name
- **6 luxury service cards**, each with a background image, the service name overlaid on the image, and a short description below. Clicking a card navigates to `gallery.html`.
- Services:
    1. Hospitality Management
    2. Conferencing & Events
    3. Facility & Venue Operations
    4. Catering
    5. Business Tourism Solutions
    6. **[6th service — to be added later. Leave a clearly commented placeholder card with "Coming Soon" or similar so it's obvious where to edit.]**
- Footer

### Gallery (`gallery.html`)
- Hero with page name
- Responsive masonry image grid (CSS columns approach is fine — simplest for vanilla)
- Lightbox overlay on click — vanilla JS, fullscreen image with prev/next arrows, close button, ESC-to-close, click-outside-to-close
- Footer

### Contact (`contact.html`)
- Hero with page name
- Contact form: Name, Email, Phone, Message, Submit — wired to **Web3Forms** (see Integrations)
- Embedded Google Maps `<iframe>` placeholder
- Sidebar with business details: address, phone, email, hours
- Social links with SVG icons: Facebook, Instagram, TikTok, LinkedIn (no icon library — use inline SVG)
- Footer

---

## File / folder structure

```
/
├── index.html
├── about.html
├── team.html
├── services.html
├── gallery.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
├── .gitignore
├── css/
│   └── styles.css          # All site styles, organised with section comments
├── js/
│   ├── main.js             # Navbar toggle, smooth scroll, scroll-triggered fade-ins
│   ├── carousel.js         # Testimonial carousel
│   ├── gallery.js          # Masonry helper + lightbox
│   └── form.js             # Web3Forms submission + client-side validation
├── images/
│   ├── hero/               # Full-screen hero images per page
│   ├── services/
│   ├── gallery/
│   ├── team/
│   ├── logos/              # Membership / affiliation logos
│   └── og-image.jpg        # Open Graph share image (1200×630)
└── assets/
    └── icons/              # SVG social and UI icons
```

All content is **hardcoded directly into the HTML files**. No Markdown, no JSON content store, no CMS. Editing a service description means editing `services.html`.

---

## Design system

### Colour palette (define as CSS custom properties in `:root` at the top of `styles.css`)

```css
:root {
  --color-bg:           #0B0B0B; /* black — main background */
  --color-bg-alt:       #1A1A1A; /* charcoal — alternating sections */
  --color-surface:      #333533; /* jet — cards, elevated surfaces */
  --color-accent:       #B87333; /* copper — buttons, highlights, links */
  --color-accent-hover: #D08A47; /* lighter copper — hover states */
  --color-text:         #F2ECDD; /* eggshell — body text */
  --color-text-muted:   #94908A; /* muted eggshell — secondary text */
  --color-border:       #2A2A2A;
}
```

### Typography
- Headings: **PT Serif Bold** (Google Fonts)
- Body: **PT Serif Regular** (Google Fonts)
- Load via `<link>` in `<head>` of every page, with `rel="preconnect"` to `fonts.googleapis.com` and `fonts.gstatic.com`
- Use `font-display: swap` to avoid invisible text during load

### Layout & responsiveness
- **Mobile-first**: base styles target mobile; media queries add tablet/desktop refinements
- Breakpoints (use consistently throughout):
    - `sm`: 640px
    - `md`: 768px
    - `lg`: 1024px
    - `xl`: 1280px
- Sticky navbar with translucent blur backdrop (`backdrop-filter: blur(10px)`) when scrolled
- Animated hamburger menu on mobile — vanilla JS toggle, CSS transitions for the open/close animation
- Full-screen hero images: use `<picture>` with responsive WebP sources, or `background-size: cover` on a hero `<div>`

### Animations (simple, performant, no libraries)
- **Section fade-in on scroll**: use the IntersectionObserver API. When a section enters the viewport, add a class that triggers a CSS transition (opacity + small `translateY`).
- **Service card hover**: subtle lift via `transform: translateY(-4px)` and a box-shadow change
- **Testimonial carousel**: vanilla JS auto-rotate every 6 seconds, with manual prev/next controls; use CSS transitions for the slide
- **Hero parallax**: subtle background-position shift on scroll — only include if it doesn't impact perceived performance
- No external animation libraries (no Framer Motion, GSAP, AOS, etc.)

---

## Integrations

### Contact form — Web3Forms
- Form `action="https://api.web3forms.com/submit"`, `method="POST"`
- Hidden input: `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">`
- In `js/form.js`: intercept submit with `fetch()`, show inline success/error messages, clear the form on success, prevent double-submission
- The access key is a public key safe to commit, but use the placeholder string `YOUR_WEB3FORMS_ACCESS_KEY` so it's obvious where to paste the real key — documented in the README
- Client-side validation: required fields, valid email format, basic phone format

### Analytics — Google Analytics 4 (GA4)
- Add the GA4 `gtag.js` snippet in the `<head>` of every page
- Use placeholder measurement ID `G-XXXXXXXXXX` — documented in the README

### Future integrations (skeletal placeholders only)
- In `js/main.js`, include a clearly commented block:
  ```js
  // === Future integrations (newsletter, chatbot, booking widget) ===
  // Add new integrations here. Keep each one in its own function.
  ```
- No actual integration code — just the comment block so the structure is obvious later

---

## SEO

- Unique `<title>`, `<meta name="description">`, and `<meta name="keywords">` per page
- Open Graph tags on every page: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<link rel="canonical">` on every page
- JSON-LD structured data (`LocalBusiness` schema) embedded in `<head>` of `index.html`
- `robots.txt` at root — allow all crawlers, reference sitemap
- `sitemap.xml` at root — list every page with `<lastmod>`, `<changefreq>`, `<priority>`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- One `<h1>` per page, then `<h2>`/`<h3>` in correct hierarchy
- Descriptive `alt` text on every image
- SEO-friendly filenames: lowercase, hyphenated, descriptive (e.g. `hospitality-management-hero.webp`, not `IMG_2391.jpg`)
- Folder structure mirrors content for crawl clarity

---

## Performance

- Serve images in **WebP** with JPEG fallbacks via `<picture>` element
- `loading="lazy"` on all non-hero images (gallery, team, logos)
- `loading="eager"` and `fetchpriority="high"` on hero images
- Preload critical fonts and the home hero image in `<head>`
- Keep `styles.css` lean — readability beats inlining for a beginner project
- Note in README how to minify CSS/JS for production (optional — beginners can skip)
- Target Lighthouse: Performance 90+, Accessibility 100, Best Practices 100, SEO 100

---

## Code quality (vanilla, beginner-readable)

**HTML**
- 2-space indent, lowercase tags and attributes, double quotes on attributes
- Use semantic elements; don't reach for `<div>` when a `<section>` or `<article>` fits
- Comments above non-obvious blocks explaining what they are

**CSS** — organise `styles.css` with clearly commented section dividers in this order:
1. CSS custom properties (`:root`)
2. Reset / base styles
3. Typography
4. Layout utilities (containers, grids)
5. Navbar
6. Footer
7. Components (buttons, cards, forms, lightbox)
8. Page-specific styles (each page in its own labelled block)
9. Animations / `@keyframes`
10. Media queries (group at the end, ordered mobile → desktop)

**JavaScript**
- ES6+ syntax, `const`/`let` only (no `var`)
- Arrow functions where they read more clearly; named functions for anything reused
- Comment above every function explaining what it does in one sentence
- Use `addEventListener` — no inline `onclick=`
- No global variables: wrap each JS file in an IIFE, or rely on `defer` and module scope
- Every `<script>` tag uses `defer` so the DOM is ready when JS runs

---

## Deployment: GitHub → Cloudflare Pages

The README must include step-by-step instructions for:

1. **Initialising the Git repo** (`git init`, first commit) and pushing to a new GitHub repository
2. **Connecting the GitHub repo to Cloudflare Pages**:
   - Sign in to Cloudflare → Pages → Create a project → Connect to Git
   - Select the GitHub repo
   - Build command: *leave blank* (static site, no build)
   - Build output directory: `/`
   - Save and Deploy
3. **Pointing the GoDaddy-registered domain at Cloudflare**:
   - **Option A (recommended)**: change the GoDaddy nameservers to Cloudflare's, giving full Cloudflare DNS / caching / SSL features
   - **Option B**: keep GoDaddy DNS and add a CNAME record pointing to the `*.pages.dev` URL
4. **Verifying the deploy**: visit the `*.pages.dev` URL, confirm SSL is active, run Lighthouse

---

## README requirements

`README.md` must include:

1. **Project name and one-line description**
2. **Tech stack** — HTML, CSS, JS, no frameworks
3. **File structure** with a one-line description of each folder/file
4. **Local development**:
   - Easiest: open `index.html` in a browser
   - Better: use VS Code's Live Server extension (explain why — `fetch()` and some font loading need a server, not a `file://` URL)
5. **How to edit content** — a table mapping common edits to the file to open:
   | I want to change... | Edit this file |
   | --- | --- |
   | Hero headline | `index.html` |
   | A service description | `services.html` |
   | Colours | `css/styles.css` (`:root` block at top) |
   | Footer text | every HTML file (footer is duplicated — search & replace) |
   | ...etc | |
6. **How to add a gallery image**: drop into `images/gallery/`, add an `<img>` block to `gallery.html` with proper `alt` text
7. **How to add a team member**: copy the team card block in `team.html` and edit
8. **Web3Forms setup**: link to web3forms.com, where to paste the access key
9. **GA4 setup**: link to analytics.google.com, where to paste the measurement ID
10. **Deployment**: full GitHub → Cloudflare Pages walkthrough (see Deployment section above)
11. **Custom domain**: pointing the GoDaddy domain at Cloudflare (both options)
12. **Colour palette** reference table
13. **Browser support**: modern evergreen browsers (Chrome, Firefox, Safari, Edge — current and previous version)
14. **Licence**

---

## Final instructions

Scaffold the entire project as described above. Generate **complete, working files** — not stubs. Use placeholder images via `https://placehold.co/` URLs (or note clearly where to drop real images). Use realistic placeholder copy that reflects a hospitality / events / venue management business; Lorem Ipsum is acceptable for paragraph body text but headings and CTAs should read naturally.

After scaffolding, **verify internal consistency**:
- Every link points to a real file
- Every image reference points to a real path (placeholder or otherwise)
- Every CSS custom property used is defined in `:root`
- Every JS event listener targets an element that exists in the HTML
- Navbar and footer markup is identical across all pages

If anything in this brief is ambiguous or seems to contradict itself, **stop and ask before generating** rather than guessing.

// Generates a 1200x630 social share card (og-image.jpg) for CCSS.
// Run: node scripts/make-og-image.js
const sharp = require('sharp');
const path = require('path');

const W = 1200;
const H = 630;
const ROOT = path.join(__dirname, '..');
const LOGO = path.join(ROOT, 'images', 'og-image.png');
const OUT = path.join(ROOT, 'images', 'og-image.jpg');

// Brand palette (from index.html :root)
const BG = '#0B0B0B';
const BG_ALT = '#1A1A1A';
const ACCENT = '#B87333';
const TEXT = '#F2ECDD';

const logoSize = 300;
const logoX = 120;
const logoY = Math.round((H - logoSize) / 2);

// Text column begins to the right of the logo.
const tx = logoX + logoSize + 80; // 500

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_ALT}"/>
      <stop offset="55%" stop-color="${BG}"/>
      <stop offset="100%" stop-color="${BG}"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- copper frame -->
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}"
        fill="none" stroke="${ACCENT}" stroke-width="2" opacity="0.85"/>

  <!-- wordmark -->
  <text x="${tx}" y="278" font-family="Georgia, 'Times New Roman', serif"
        font-size="132" font-weight="700" letter-spacing="6" fill="${TEXT}">CCSS</text>

  <!-- sub-name -->
  <text x="${tx + 4}" y="328" font-family="Georgia, 'Times New Roman', serif"
        font-size="30" font-weight="400" letter-spacing="8" fill="${ACCENT}"
        text-transform="uppercase">SPECIALIZED SERVICES</text>

  <!-- divider -->
  <rect x="${tx + 4}" y="360" width="430" height="2" fill="${ACCENT}" opacity="0.6"/>

  <!-- tagline -->
  <text x="${tx + 4}" y="404" font-family="Georgia, 'Times New Roman', serif"
        font-size="27" font-weight="400" fill="${TEXT}" opacity="0.92">Hospitality &#183; Conferencing &#183; Events</text>
  <text x="${tx + 4}" y="442" font-family="Georgia, 'Times New Roman', serif"
        font-size="27" font-weight="400" fill="${TEXT}" opacity="0.92">Catering &#183; Venue Management</text>
</svg>`;

async function run() {
  const logo = await sharp(LOGO)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: logoX, top: logoY }])
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    .toFile(OUT);

  const meta = await sharp(OUT).metadata();
  console.log(`Wrote ${OUT}`);
  console.log(`  ${meta.width}x${meta.height} ${meta.format}`);
}

run().catch((e) => { console.error(e); process.exit(1); });

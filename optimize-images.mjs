/**
 * optimize-images.mjs
 *
 * Resize + recompress every image in ./images using sharp, writing optimized
 * WebP variants to ./images-optimized (folder structure mirrored).
 * ORIGINALS ARE NEVER TOUCHED — review the output, then copy what you want back.
 *
 * Variants get a "-<width>w" suffix, e.g. home-hero-...-800w.webp / -1600w.webp.
 * The home hero <img srcset> in index.html expects the -800w / -1600w variants.
 *
 * Run via optimize-images.ps1, or directly:  node optimize-images.mjs
 */

import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'images');
const OUT = path.join(__dirname, 'images-optimized');

const QUALITY = 75;                                  // WebP quality (0-100)
const EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

// Per-folder output widths. Small sources are never upscaled (withoutEnlargement).
const FOLDERS = {
  hero:     [800, 1600],   // full-bleed hero banners
  gallery:  [600, 1200],   // gallery thumbnails / lightbox
  services: [600, 1200],   // service card media
  about:    [600, 1200],   // about-page imagery
  team:     [600],         // headshots
  logos:    [400],         // small partner logos
};

let savedBytes = 0;
let fileCount = 0;

async function optimizeFolder(folder, widths) {
  const inDir = path.join(SRC, folder);
  const outDir = path.join(OUT, folder);

  let entries;
  try {
    entries = await readdir(inDir);
  } catch {
    console.log(`  (skip) no folder: images/${folder}`);
    return;
  }

  const files = entries.filter((f) => EXTS.has(path.extname(f).toLowerCase()));
  if (files.length === 0) {
    console.log(`  (skip) no images in images/${folder}`);
    return;
  }

  await mkdir(outDir, { recursive: true });

  for (const file of files) {
    const inPath = path.join(inDir, file);
    const base = path.basename(file, path.extname(file));
    const srcSize = (await stat(inPath)).size;

    for (const w of widths) {
      const outPath = path.join(outDir, `${base}-${w}w.webp`);
      const info = await sharp(inPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);

      fileCount++;
      const delta = srcSize - info.size; // rough per-variant comparison vs original
      savedBytes += delta;
      const kb = (n) => (n / 1024).toFixed(0).padStart(4);
      console.log(
        `  images/${folder}/${base}-${w}w.webp  ${kb(srcSize)}KB -> ${kb(info.size)}KB`
      );
    }
  }
}

console.log('Optimizing images -> images-optimized/ (originals untouched)\n');

for (const [folder, widths] of Object.entries(FOLDERS)) {
  await optimizeFolder(folder, widths);
}

console.log(`\nDone. ${fileCount} variants written to images-optimized/.`);
console.log('Review them, then copy the variants you want into images/.');
console.log(
  'Reminder: the home hero needs home-hero-wedding-bride-dress-outdoor-800w.webp ' +
    'and -1600w.webp in images/hero/.'
);

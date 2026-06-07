# Self-hosted fonts

The site loads **PT Serif** from this folder instead of Google Fonts (faster, no
render-blocking third-party request). Two files must live here:

| File | Weight | Style |
|------|--------|-------|
| `pt-serif-regular.woff2` | 400 | normal |
| `pt-serif-700.woff2`     | 700 | normal |

## How to get them

1. Go to **https://gwfh.mranftl.com/fonts/pt-serif?subsets=latin**
   (google-webfonts-helper).
2. Under **Select styles**, tick `regular` (400) and `700`.
3. Under **Copy CSS**, choose **Modern Browsers** (woff2 only).
4. Click **Download files** — you'll get a `.zip`.
5. From the zip, copy the two `.woff2` files into **this `fonts/` folder** and
   rename them exactly to:
   - `pt-serif-regular.woff2`
   - `pt-serif-700.woff2`

The `@font-face` rules in `css/styles.css` and the `<link rel="preload">` in each
HTML `<head>` already point at these filenames — no code changes needed once the
files are in place.

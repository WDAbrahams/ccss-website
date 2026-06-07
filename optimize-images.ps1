<#
.SYNOPSIS
  Resize + recompress every image in ./images using sharp.

.DESCRIPTION
  Reads from ./images and writes optimized WebP variants to ./images-optimized,
  mirroring the folder structure. ORIGINALS ARE NEVER TOUCHED — review the output,
  then copy the files you want back into ./images.

  Heroes and content images get two widths (mobile + desktop) with a "-<width>w"
  suffix, e.g.  home-hero-...-800w.webp  and  home-hero-...-1600w.webp.
  The home hero <img srcset> in index.html expects exactly the -800w / -1600w
  variants, so run this before deploying the hero change.

  The actual work is done by optimize-images.mjs (sharp). This wrapper just makes
  sure sharp is installed, then runs it.

  (We use sharp instead of @squoosh/cli: the Squoosh CLI was archived in 2023 and
  crashes on Node 18+ with "TypeError: fetch failed / unknown scheme" because its
  WASM loader fetch()es a file:// URL that modern Node rejects.)

.REQUIREMENTS
  Node.js installed (https://nodejs.org).

.USAGE
  powershell -ExecutionPolicy Bypass -File .\optimize-images.ps1
#>

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# Ensure sharp is available locally (installs into ./node_modules, which is gitignored).
if (-not (Test-Path (Join-Path $PSScriptRoot 'node_modules\sharp'))) {
    Write-Host 'Installing sharp (one-time)...' -ForegroundColor Yellow
    npm install sharp --no-save --no-fund --no-audit
    if ($LASTEXITCODE -ne 0) { throw 'npm install sharp failed.' }
}

node .\optimize-images.mjs
if ($LASTEXITCODE -ne 0) { throw 'optimize-images.mjs exited with an error.' }

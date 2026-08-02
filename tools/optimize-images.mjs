/**
 * Image pipeline.
 *
 * Reads the full-resolution originals from source/ — which is never deployed —
 * and writes responsive, compressed derivatives into assets/img.
 *
 * Run: node tools/optimize-images.mjs      (from the repo root)
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('source/img');
const SRC_ICON = path.resolve('source/favicon_io');
const OUT = path.resolve('assets/img');
const OUT_ICON = path.resolve('assets/favicon');

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(OUT_ICON, { recursive: true });

const kb = (f) => (fs.statSync(f).size / 1024).toFixed(0) + ' KB';
const report = [];

/** Photographic source -> webp set + one jpeg fallback. */
async function photo(src, base, widths, { quality = 62, fallbackWidth } = {}) {
  const input = path.join(SRC, src);
  for (const w of widths) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    report.push([path.basename(out), kb(out)]);
  }
  const fw = fallbackWidth ?? widths[widths.length - 1];
  const jpg = path.join(OUT, `${base}-${fw}.jpg`);
  await sharp(input)
    .resize({ width: fw, withoutEnlargement: true })
    .flatten({ background: '#0c0c0e' })
    .jpeg({ quality: 72, mozjpeg: true, progressive: true })
    .toFile(jpg);
  report.push([path.basename(jpg), kb(jpg)]);
}

/** Cut-out source with transparency -> webp set + png fallback. */
async function cutout(src, base, widths, { quality = 72 } = {}) {
  const input = path.join(SRC, src);
  for (const w of widths) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 6, alphaQuality: 90 })
      .toFile(out);
    report.push([path.basename(out), kb(out)]);
  }
  const fw = widths[widths.length - 1];
  const png = path.join(OUT, `${base}-${fw}.png`);
  await sharp(input)
    .resize({ width: fw, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile(png);
  report.push([path.basename(png), kb(png)]);
}

/** Tiny blurred placeholder inlined into the CSS/HTML as a data URI. */
async function lqip(src, width = 24) {
  const buf = await sharp(path.join(SRC, src))
    .resize({ width })
    .flatten({ background: '#0c0c0e' })
    .jpeg({ quality: 40 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

// ---------------------------------------------------------------- hero images
await photo('landscape.png', 'hero-light', [960, 1600, 2400], { quality: 58, fallbackWidth: 1600 });
await photo('landscape2.png', 'hero-dark', [960, 1600, 2400], { quality: 58, fallbackWidth: 1600 });

// ------------------------------------------------------------------- portrait
await cutout('prefill.png', 'portrait', [520, 900], { quality: 70 });

// ---------------------------------------------------------------- about photo
await photo('about.png', 'about', [640, 1000, 1400], { quality: 66, fallbackWidth: 1000 });

// ------------------------------------------------------- testimonial avatars
for (const [src, base] of [['default-man.png', 'avatar-a'], ['default-woman.png', 'avatar-b']]) {
  await cutout(src, base, [160], { quality: 78 });
}

// ---------------------------------------------------------------- app icons
const icons = [
  ['android-chrome-512x512.png', 'icon-512.png', 512],
  ['android-chrome-192x192.png', 'icon-192.png', 192],
  ['apple-touch-icon.png', 'apple-touch-icon.png', 180],
  ['favicon-32x32.png', 'favicon-32x32.png', 32],
  ['favicon-16x16.png', 'favicon-16x16.png', 16],
];
for (const [src, out, size] of icons) {
  const dest = path.join(OUT_ICON, out);
  await sharp(path.join(SRC_ICON, src))
    .resize({ width: size, height: size, fit: 'cover' })
    .png({ compressionLevel: 9, palette: true, quality: 82, effort: 10 })
    .toFile(dest);
  report.push([out, kb(dest)]);
}
fs.copyFileSync(path.join(SRC_ICON, 'favicon.ico'), path.join(OUT_ICON, 'favicon.ico'));

// ------------------------------------------------------------------ manifest
fs.writeFileSync(
  path.join(OUT_ICON, 'site.webmanifest'),
  JSON.stringify(
    {
      name: "Simo Hakim's Portal",
      short_name: 'Simo Hakim',
      icons: [
        { src: '/assets/favicon/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/favicon/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#0c0c0e',
      background_color: '#f6f3ee',
      display: 'standalone',
    },
    null,
    2
  )
);

// --------------------------------------------------------------- LQIP export
const placeholders = {
  heroLight: await lqip('landscape.png'),
  heroDark: await lqip('landscape2.png'),
  about: await lqip('about.png'),
};
fs.writeFileSync(path.join(OUT, 'placeholders.json'), JSON.stringify(placeholders, null, 2));

// ----------------------------------------------------------------- reporting
const before = fs
  .readdirSync(SRC)
  .reduce((n, f) => n + fs.statSync(path.join(SRC, f)).size, 0) +
  fs.readdirSync(SRC_ICON).reduce((n, f) => n + fs.statSync(path.join(SRC_ICON, f)).size, 0);
const after = fs
  .readdirSync(OUT)
  .reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, 0) +
  fs.readdirSync(OUT_ICON).reduce((n, f) => n + fs.statSync(path.join(OUT_ICON, f)).size, 0);

for (const [name, size] of report) console.log(name.padEnd(28), size);
console.log('-'.repeat(40));
console.log('originals'.padEnd(28), (before / 1048576).toFixed(2) + ' MB');
console.log('optimized'.padEnd(28), (after / 1048576).toFixed(2) + ' MB');
console.log('saved'.padEnd(28), (100 - (after / before) * 100).toFixed(1) + '%');

// build-images.mjs
// Generates multiple widths and formats (AVIF, WebP, JPEG) for every image in ./images/originals.
// If that folder is empty, it first creates sample originals so the demo works out of the box.
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const widths = [400, 800, 1200, 1600];
const src = './images/originals';
const out = './images/dist';

await mkdir(src, { recursive: true });
await mkdir(out, { recursive: true });

// --- Sample originals (replace these with your own photos) -------------------
const sample = (w, h, c1, c2, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.72}" cy="${h * 0.32}" r="${Math.min(w, h) * 0.14}" fill="#ffd166" opacity="0.9"/>
  <path d="M0 ${h} L${w * 0.3} ${h * 0.55} L${w * 0.5} ${h * 0.8} L${w * 0.75} ${h * 0.45} L${w} ${h * 0.85} L${w} ${h} Z" fill="#1b2a41" opacity="0.85"/>
  <text x="${w * 0.05}" y="${h * 0.12}" font-family="sans-serif" font-size="${Math.min(w, h) * 0.06}" fill="#fff">${label}</text>
</svg>`;

if ((await readdir(src)).length === 0) {
  await writeFile(`${src}/hero.svg`, sample(3200, 1800, '#264653', '#2a9d8f', 'Landscape hero'));
  await writeFile(`${src}/hero-portrait.svg`, sample(1600, 2000, '#6d597a', '#e56b6f', 'Portrait hero'));
  await writeFile(`${src}/card.svg`, sample(1600, 1200, '#355070', '#b56576', 'Card image'));
  console.log('Created sample originals in', src);
}

// --- Generate sizes and formats ---------------------------------------------
for (const file of await readdir(src)) {
  const { name } = path.parse(file);
  for (const width of widths) {
    const img = sharp(path.join(src, file)).resize({ width, withoutEnlargement: true });

    await img.clone().avif({ quality: 50 }).toFile(`${out}/${name}-${width}.avif`);
    await img.clone().webp({ quality: 75 }).toFile(`${out}/${name}-${width}.webp`);
    await img.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${out}/${name}-${width}.jpg`);
  }
  console.log('Processed', file);
}

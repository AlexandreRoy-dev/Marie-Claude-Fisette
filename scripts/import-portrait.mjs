// One-off: bring a new portrait into public/img at a sensible size.
// Usage: node scripts/import-portrait.mjs <source> <dest-webp>
import sharp from "sharp";

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error("usage: node scripts/import-portrait.mjs <source> <dest-webp>");
  process.exit(1);
}

const meta = await sharp(src).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

// Rendered at ~380px wide, so 1000px covers 2x displays with room to spare.
const info = await sharp(src)
  .resize({ width: 1000, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(dest);

console.log(`wrote ${dest}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);

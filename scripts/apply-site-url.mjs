import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(path.join(root, "site.config.json"), "utf8"));
const siteUrl = String(config.siteUrl || "").trim().replace(/\/+$/, "");

if (!/^https:\/\/[A-Za-z0-9.-]+(?::\d+)?(?:\/[A-Za-z0-9._~-]+)*$/.test(siteUrl)) {
  console.error("site.config.json: siteUrl must be an absolute https URL, with no trailing slash and no query.");
  process.exit(1);
}

function applyFile(filePath, detectBase) {
  const original = readFileSync(filePath, "utf8");
  let text = original.replaceAll("__SITE_URL__", siteUrl);
  const current = detectBase(text);
  if (current && current !== siteUrl) {
    if (!/^https:\/\/[^\s"'<]+$/.test(current)) {
      console.error(`${path.basename(filePath)}: refusing to replace this base: ${current}`);
      process.exit(1);
    }
    text = text.split(current).join(siteUrl);
  }
  if (text !== original) writeFileSync(filePath, text);
  return text;
}

const html = applyFile(path.join(root, "index.html"), (text) => {
  const match = text.match(/<link rel="canonical" href="([^"]+)"/);
  if (!match) {
    console.error("index.html: canonical link not found.");
    process.exit(1);
  }
  return match[1].replace(/\/+$/, "");
});

applyFile(path.join(root, "robots.txt"), (text) => {
  const match = text.match(/^Sitemap:\s*(\S+)/m);
  if (!match) {
    console.error("robots.txt: Sitemap line not found.");
    process.exit(1);
  }
  return match[1].replace(/\/sitemap\.xml$/, "").replace(/\/+$/, "");
});

applyFile(path.join(root, "sitemap.xml"), (text) => {
  const match = text.match(/<loc>([^<]+)<\/loc>/);
  if (!match) {
    console.error("sitemap.xml: loc not found.");
    process.exit(1);
  }
  return match[1].replace(/\/+$/, "");
});

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
if (!canonical || canonical[1] !== `${siteUrl}/`) {
  console.error("Canonical was not updated to", `${siteUrl}/`);
  process.exit(1);
}

console.log(`Site URL applied: ${siteUrl}/`);

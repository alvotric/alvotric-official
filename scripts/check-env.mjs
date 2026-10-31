// Runs before `next build`. Prevents shipping localhost URLs in canonical links,
// Open Graph tags and the sitemap (a flaw observed on the reference site).
const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const isCi = process.env.CF_PAGES === "1" || process.env.CI === "true" || process.env.NETLIFY === "true";

if (!url) {
  const msg =
    "NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, Open Graph and sitemap will use a placeholder and robots.txt will block indexing.";
  if (isCi) {
    console.error(`\n[alvotric] ERROR: ${msg}\nSet it in your hosting dashboard (production environment).\n`);
    process.exit(1);
  }
  console.warn(`\n[alvotric] WARNING: ${msg}\n`);
} else if (!/^https:\/\/[^/\s]+$/.test(url)) {
  console.error(`\n[alvotric] ERROR: NEXT_PUBLIC_SITE_URL must look like https://example.com (no path, no trailing slash). Got: ${url}\n`);
  process.exit(1);
}

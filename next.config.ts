import type { NextConfig } from "next";

/**
 * Static export: the build produces plain files in `out/`.
 * No server, no API routes, no on-demand image optimization.
 * This keeps hosting free and portable (Cloudflare Pages, Netlify, GitHub Pages, any static host).
 *
 * Security headers cannot be set here when exporting. They live in `public/_headers`
 * (read by Cloudflare Pages and Netlify). See README for other hosts.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

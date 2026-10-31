import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/content/site.config";

export const dynamic = "force-static";

/** Until a production URL is configured, block indexing so a preview can never be indexed by mistake. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.siteUrlConfigured) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

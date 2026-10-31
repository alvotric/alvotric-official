import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/content/site.config";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

/** Per-page metadata with canonical URL and social tags. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

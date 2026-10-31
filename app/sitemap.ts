import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site.config";

export const dynamic = "force-static";

const routes = ["/", "/products", "/products/alvo", "/products/protodb", "/about", "/technology", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/products/alvo" ? 0.9 : 0.7,
  }));
}

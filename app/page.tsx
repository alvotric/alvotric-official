import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl, siteConfig } from "@/content/site.config";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          description: siteConfig.description,
          url: absoluteUrl("/"),
        }}
      />
      <Hero />
    </>
  );
}

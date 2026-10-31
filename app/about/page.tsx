import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Principles } from "@/components/sections/Principles";
import { CtaBand } from "@/components/sections/CtaBand";
import { siteConfig } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Alvotric is an independent technology company building intelligent software, AI-powered development tools, and automation infrastructure.",
  path: "/about",
});

const statement = "max-w-[36ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.3] text-muted";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Alvotric" lede={siteConfig.description} />
      <Section id="mission" layout="split" title="Mission">
        <p className={statement}>
          To build dependable software that takes routine work off people&rsquo;s plates, and to make building
          software itself more approachable.
        </p>
      </Section>
      <Section id="vision" layout="split" title="Vision" tone="elevated">
        <p className={statement}>
          A set of intelligent tools, made by one independent company, that people can understand and rely on.
          Alvo is the first of them.
        </p>
      </Section>
      <Section id="where-we-are" layout="split" title="Where we are today">
        <p className="max-w-[56ch] text-lg text-muted sm:text-xl">
          Alvotric is at an early stage. Alvo, our first product, is in development and testing. We publish no
          customer numbers, testimonials, partnerships, or certifications, because we do not have any to report
          yet. When that changes, this page will say so plainly.
        </p>
      </Section>
      <Principles tone="elevated" />
      <CtaBand title="Get in touch with Alvotric" />
    </>
  );
}

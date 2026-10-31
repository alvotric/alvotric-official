import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { siteConfig } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms for using the Alvotric website. Draft, not yet legally reviewed.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" lede="Terms for using this website. Last updated 24 October 2026." />
      <Container className="py-16 sm:py-24">
        <div className="max-w-[72ch]">
        <DraftNotice />
        <div className="space-y-10 text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
          <section>
            <h2>Scope</h2>
            <p>
              These terms cover your use of the {siteConfig.name} corporate website. The Alvo application is a
              separate service and has its own terms.
            </p>
          </section>
          <section>
            <h2>Information only</h2>
            <p>
              This website describes {siteConfig.name} and its products. Products and capabilities labeled
              &ldquo;In development&rdquo; or &ldquo;Planned&rdquo; may change, be delayed, or never be released.
              Nothing here is an offer, a guarantee, or a commitment to deliver a feature.
            </p>
          </section>
          <section>
            <h2>Acceptable use</h2>
            <p>
              Please do not attempt to disrupt the website, probe it for vulnerabilities without permission, or use
              it in a way that breaks the law.
            </p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>
              The name {siteConfig.name}, the logo, and the content of this website belong to {siteConfig.legalName}
              {" "}unless stated otherwise. Third-party names mentioned remain the property of their owners.
            </p>
          </section>
          <section>
            <h2>No warranty</h2>
            <p>
              The website is provided as it is. We make reasonable efforts to keep it accurate and available, but
              we do not guarantee that it will be free of errors or interruption.
            </p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>We may update these terms. The date at the top shows when they last changed.</p>
          </section>
        </div>
        </div>
      </Container>
    </>
  );
}

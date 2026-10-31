import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { siteConfig } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Alvotric website handles information. Draft, not yet legally reviewed.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" lede="What this website does and does not do with information. Last updated 24 October 2026." />
      <Container className="py-16 sm:py-24">
        <div className="max-w-[72ch]">
        <DraftNotice />
        <div className="space-y-10 text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
          <section>
            <h2>This website</h2>
            <p>
              This policy covers the {siteConfig.name} corporate website only. The Alvo application is a separate
              service and is covered by its own policies.
            </p>
          </section>
          <section>
            <h2>Information we collect</h2>
            <p>
              This website does not ask you for personal information. It has no accounts and no forms that send
              data to us, and it does not use cookies, analytics, or advertising tools.
            </p>
          </section>
          <section>
            <h2>Hosting logs</h2>
            <p>
              Like any website, requests to this site pass through a hosting provider, which may record technical
              information such as IP address, browser type, and the pages requested, for security and operation of
              the service. We do not use that information to identify visitors. The provider&rsquo;s own privacy
              terms apply to it.
            </p>
          </section>
          <section>
            <h2>Links to other sites</h2>
            <p>
              Some links lead to other sites, including Alvo. Those sites have their own practices, and we are not
              responsible for them.
            </p>
          </section>
          <section>
            <h2>Contact options</h2>
            <p>
              When a contact form or email address is added, this policy will be updated to say what is collected,
              who processes it, how long it is kept, and how to ask for its deletion.
            </p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>We will update this page when the website&rsquo;s behavior changes and show the date above.</p>
          </section>
        </div>
        </div>
      </Container>
    </>
  );
}

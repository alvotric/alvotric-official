import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { alvoLink, siteConfig } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "How to contact Alvotric.",
  path: "/contact",
});

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  const link = alvoLink();

  return (
    <>
      <PageHeader
        title="Contact"
        lede={
          email
            ? "The best way to reach Alvotric is by email."
            : "Alvotric does not have public contact options yet."
        }
      />
      <Section id="contact-options" layout="split" title={email ? "Email" : "Not available yet"}>
        <div role="status" className="panel max-w-[60ch] p-8 sm:p-10">
          {email ? (
            <>
              <p className="text-lg text-muted">
                Write to{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  {email}
                </a>
                . An online contact form is not available yet.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold">Contact options are not available yet</h3>
              <p className="mt-4 text-lg text-muted">
                We have not set up a business email address or contact form. Rather than publish a channel we
                cannot monitor, we will add them here once they are ready.
              </p>
              <p className="mt-3 text-lg text-muted">
                In the meantime, you can see what we are building on the Alvo site.
              </p>
              <div className="mt-8">
                <LinkButton href={link.href} external={link.external} size="lg">
                  {link.label}
                </LinkButton>
              </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}

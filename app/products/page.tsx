import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { WorkflowPanel } from "@/components/visual/WorkflowPanel";
import { alvo } from "@/content/products";
import { alvoLink } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Products from Alvotric. Alvo, our flagship automation and AI-assisted development platform, is in development.",
  path: "/products",
});

export default function ProductsPage() {
  const link = alvoLink();
  return (
    <>
      <PageHeader
        title="Products"
        lede="Alvotric is the company. Alvo is the first product it is building. Each product is labeled with its real status."
      />

      <section aria-labelledby="alvo-card-heading" className="section-glow border-b border-line">
        <Container className="py-20 sm:py-24 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <StatusBadge status={alvo.status} />
              <h2 id="alvo-card-heading" className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-none">
                Alvo
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg text-muted sm:text-xl">{alvo.summary}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <LinkButton href="/products/alvo" size="lg">
                  Product details
                </LinkButton>
                {link.external ? (
                  <LinkButton href={link.href} external variant="secondary" size="lg">
                    {link.label}
                  </LinkButton>
                ) : null}
              </div>
            </div>
            <div className="lg:col-span-7">
              <TiltCard className="rounded-[var(--radius-card)] pt-10" max={3}>
                <WorkflowPanel idPrefix="products" stacked />
              </TiltCard>
              <p className="mt-4 text-[0.8125rem] text-subtle">Illustration of the intended interface.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section id="future-products">
        <div className="panel-ghost p-8 sm:p-12">
          <StatusBadge status="planned" />
          <h2 className="mt-6 text-3xl font-semibold text-muted sm:text-4xl">Future products</h2>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            Additional products may follow. This space is intentionally empty: nothing beyond Alvo has been
            announced.
          </p>
        </div>
      </Section>

      <Section id="status-guide" layout="split" title="How to read the status labels" tone="elevated">
        <dl className="grid gap-10 sm:grid-cols-3">
          <div className="border-t border-line-strong pt-6">
            <dt>
              <StatusBadge status="live" />
            </dt>
            <dd className="mt-4 text-muted">
              Verified as working and available to the public. No product or capability currently carries this
              label.
            </dd>
          </div>
          <div className="border-t border-line-strong pt-6">
            <dt>
              <StatusBadge status="in-development" />
            </dt>
            <dd className="mt-4 text-muted">
              Being built or tested. It may change, be incomplete, or not yet be open to everyone.
            </dd>
          </div>
          <div className="border-t border-line-strong pt-6">
            <dt>
              <StatusBadge status="planned" />
            </dt>
            <dd className="mt-4 text-muted">
              An intention, not a commitment. Work has not started in a form we can show.
            </dd>
          </div>
        </dl>
      </Section>
    </>
  );
}

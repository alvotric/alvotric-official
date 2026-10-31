import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/ui/Container";
import { TiltCard } from "@/components/ui/TiltCard";
import { WorkflowPanel } from "@/components/visual/WorkflowPanel";
import { alvo } from "@/content/products";
import { absoluteUrl, alvoLink, siteConfig } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Alvo",
  description:
    "Alvo is Alvotric's flagship platform for building automations and web projects with AI assistance. Currently in development.",
  path: "/products/alvo",
});

const steps = [
  {
    title: "Describe the task",
    body: "Write what should happen, in plain language.",
  },
  {
    title: "Review the workflow",
    body: "Alvo assembles triggers, logic, and actions. You read it, and change what is not right.",
  },
  {
    title: "Run it",
    body: "Turn the workflow on and watch what it does.",
  },
];

export default function AlvoPage() {
  const link = alvoLink();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: alvo.name,
          description: alvo.summary,
          applicationCategory: "BusinessApplication",
          url: absoluteUrl("/products/alvo"),
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />
      <PageHeader title="Alvo" lede={alvo.summary}>
        <StatusBadge status={alvo.status} />
        <LinkButton href={link.href} external={link.external} size="lg">
          {link.label}
        </LinkButton>
      </PageHeader>

      <section aria-labelledby="alvo-overview-heading" className="section-glow border-b border-line">
        <Container className="py-20 sm:py-24 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 id="alvo-overview-heading" className="max-w-[14ch] text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05]">
                Where Alvo stands
              </h2>
              <p className="mt-6 max-w-[46ch] text-lg text-muted">
                Alvo is under active development and testing. This page describes what we are building. A
                capability is not described as ready for production until it has been verified, and the public
                sign-up journey is still being checked.
              </p>
            </div>
            <div className="lg:col-span-7">
              <TiltCard className="rounded-[var(--radius-card)] pt-10" max={3}>
                <WorkflowPanel idPrefix="alvo-page" stacked />
              </TiltCard>
              <p className="mt-4 text-[0.8125rem] text-subtle">Illustration of the intended interface.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section id="how" layout="split" title="How Alvo is meant to work">
        <ol className="grid gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-line-strong pt-6">
              <p className="text-sm font-medium text-subtle">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="capabilities" layout="split" title="Capabilities" tone="elevated">
        <ul className="divide-y divide-line border-y border-line-strong">
          {alvo.capabilities.map((c) => (
            <li key={c.title} className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{c.title}</h3>
                <p className="mt-2 max-w-[48ch] text-muted">{c.description}</p>
              </div>
              <div className="shrink-0 sm:pt-1">
                <StatusBadge status={c.status} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="built-by" layout="split" title="Built by Alvotric">
        <p className="max-w-[40ch] text-[clamp(1.375rem,2.2vw,1.875rem)] leading-[1.35] text-muted">
          Alvo is developed by Alvotric, an independent technology company. Sign-in and account details belong
          to the Alvo application itself; this website describes the company and its products.
        </p>
      </Section>

      <CtaBand title="Questions about Alvo?" />
    </>
  );
}

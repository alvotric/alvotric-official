import { StatusBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TiltCard } from "@/components/ui/TiltCard";
import { WorkflowPanel } from "@/components/visual/WorkflowPanel";
import { alvo } from "@/content/products";
import { alvoLink } from "@/content/site.config";

export function AlvoFeature() {
  const link = alvoLink();
  return (
    <section aria-labelledby="alvo-feature-heading" className="section-glow border-b border-line">
      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-6 xl:pr-12">
            <StatusBadge status={alvo.status} />
            <h2
              id="alvo-feature-heading"
              className="mt-6 text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.02]"
            >
              Alvo, our flagship product
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-muted sm:text-xl">{alvo.summary}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href={link.href} external={link.external} size="lg">
                {link.label}
              </LinkButton>
              {link.external ? (
                <LinkButton href="/products/alvo" variant="secondary" size="lg">
                  Product details
                </LinkButton>
              ) : null}
            </div>
            <p className="mt-8 max-w-[48ch] text-[0.9375rem] text-subtle">
              Alvo is under active development and testing. The capabilities below describe what we are
              building, not a statement that each one is ready for production use.
            </p>
          </div>

          <div className="lg:col-span-6">
            <TiltCard className="rounded-[var(--radius-card)] pt-10" max={3}>
              <WorkflowPanel idPrefix="feature" stacked />
            </TiltCard>
            <p className="mt-4 text-[0.8125rem] text-subtle">Illustration of the intended interface.</p>
          </div>
        </div>

        <ul className="mt-20 grid gap-x-10 gap-y-10 border-t border-line-strong pt-10 sm:grid-cols-2 xl:grid-cols-4">
          {alvo.capabilities.map((c) => (
            <li key={c.title}>
              <StatusBadge status={c.status} />
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[0.9375rem] text-muted">{c.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { alvoLink, alvoChatLink } from "@/content/site.config";

export function CtaBand({ title = "See where Alvo stands today" }: { title?: string }) {
  const alvo = alvoLink();
  const alvoChat = alvoChatLink();
  return (
    <section aria-labelledby="cta-heading" className="cta-bg">
      <Container className="py-24 sm:py-28 lg:py-36">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <h2
            id="cta-heading"
            className="max-w-[16ch] text-[clamp(2.25rem,5.4vw,4.5rem)] font-semibold leading-[1.02] lg:col-span-7"
          >
            {title}
          </h2>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <LinkButton href={alvo.href} external={alvo.external} size="lg">
              {alvo.label}
            </LinkButton>
            <LinkButton href={alvoChat.href} external={alvoChat.external} size="lg" disabled={alvoChat.disabled}>
              {alvoChat.label}
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg">
              Contact Alvotric
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

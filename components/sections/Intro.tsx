import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visual/HeroVisual";
import { alvoLink, siteConfig } from "@/content/site.config";

/** Who Alvotric is, with the layered 3D product composition. */
export function Intro() {
  const alvo = alvoLink();
  return (
    <section aria-labelledby="intro-heading" className="section-glow relative isolate overflow-hidden border-b border-line">
      <Container className="grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-6">
          <h2 id="intro-heading" className="max-w-[14ch] text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.02]">
            An independent technology company
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg text-muted sm:text-xl">{siteConfig.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href={alvo.href} external={alvo.external} size="lg">
              {alvo.label}
            </LinkButton>
            <LinkButton href="/about" variant="secondary" size="lg">
              About Alvotric
            </LinkButton>
          </div>
          <p className="mt-7 text-[0.9375rem] text-subtle">Alvo, our first product, is in development and testing.</p>
        </div>
        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

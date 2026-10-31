import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeroChat } from "@/components/visual/HeroChat";
import { HeroTitle } from "@/components/visual/HeroTitle";
import { alvoLink, alvoChatLink } from "@/content/site.config";

/** First screen: an animated line, a wide chat-style preview of Alvo, and the three main routes. */
export function Hero() {
  const alvo = alvoLink();
  const alvoChat = alvoChatLink();
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-bg grid-lines relative isolate overflow-hidden"
    >
      <Container className="flex min-h-[calc(100svh-var(--header-height))] flex-col items-center justify-center pb-20 pt-8 text-center sm:pb-32">
        <HeroTitle />

        <div className="hero-rise hero-rise-2 mt-8 w-full max-w-[1060px] sm:mt-10">
          <HeroChat />
        </div>

        <div className="hero-rise hero-rise-3 mt-9 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href={alvo.href} external={alvo.external} animated className="min-w-[11.5rem] [--btn-delay:0s]">
            {alvo.label}
          </LinkButton>
          <LinkButton href={alvoChat.href} external={alvoChat.external} animated disabled={alvoChat.disabled} className="min-w-[11.5rem] [--btn-delay:0.8s]">
            {alvoChat.label}
          </LinkButton>
          <LinkButton href="/products" animated className="min-w-[11.5rem] [--btn-delay:1.6s]">
            Explore products
          </LinkButton>
          <LinkButton href="/about" animated className="min-w-[11.5rem] [--btn-delay:2.4s]">
            About Alvotric
          </LinkButton>
        </div>

        <p className="mt-6 max-w-[52ch] text-[0.8125rem] text-subtle">
          Illustration of the intended Alvo experience. Alvo is in development.
        </p>
      </Container>
    </section>
  );
}

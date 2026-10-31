import type { ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  title: string;
  lede: string;
  children?: ReactNode;
};

/** Opening of every inner page: a large h1 on the left, supporting text and actions on the right. */
export function PageHeader({ title, lede, children }: Props) {
  return (
    <header className="hero-bg grid-lines relative isolate overflow-hidden border-b border-line">
      <Container className="grid gap-8 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-32">
        <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.98] lg:col-span-7">{title}</h1>
        <div className="lg:col-span-5 lg:pb-3">
          <p className="max-w-[52ch] text-lg text-muted sm:text-xl">{lede}</p>
          {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}

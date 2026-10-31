"use client";

import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <h1 className="max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05]">
        This page does not exist
      </h1>
      <p className="mt-6 max-w-[54ch] text-lg text-muted">
        The address may be mistyped, or the page may have moved. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href="/">Go to the homepage</LinkButton>
        <LinkButton href="/products" variant="secondary">
          See products
        </LinkButton>
      </div>
    </Container>
  );
}

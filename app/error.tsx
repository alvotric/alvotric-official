"use client";

import { Container } from "@/components/ui/Container";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-28 sm:py-36">
      <h1 className="max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05]">
        Something went wrong
      </h1>
      <p className="mt-6 max-w-[54ch] text-lg text-muted">
        This page failed to load. Try again, and if the problem continues, come back a little later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-accent px-5 text-[0.9375rem] font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
      >
        Try again
      </button>
    </Container>
  );
}

import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  tone?: "base" | "elevated" | "glow";
  /** "split": title on the left, content on the right (wide screens). "stack": title above content. */
  layout?: "stack" | "split";
  className?: string;
};

const tones = {
  base: "bg-bg",
  elevated: "bg-elevated",
  glow: "section-glow",
};

export function Section({ id, title, intro, children, tone = "base", layout = "stack", className }: Props) {
  const headingId = id ? `${id}-heading` : undefined;
  const heading = title ? (
    <div className={cn(layout === "split" ? "lg:col-span-4 lg:sticky lg:top-28 lg:self-start" : "mb-12 sm:mb-14")}>
      <h2 id={headingId} className="max-w-[16ch] text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05]">
        {title}
      </h2>
      {intro ? <p className="mt-5 max-w-[46ch] text-lg text-muted">{intro}</p> : null}
    </div>
  ) : null;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn(tones[tone], "border-b border-line", className)}
    >
      <Container className="py-20 sm:py-24 lg:py-32">
        {layout === "split" ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {heading}
            <div className={cn(title ? "lg:col-span-8" : "lg:col-span-12")}>{children}</div>
          </div>
        ) : (
          <>
            {heading}
            {children}
          </>
        )}
      </Container>
    </section>
  );
}

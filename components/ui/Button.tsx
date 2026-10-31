import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Adds a small arrow chip. Not used by default. */
  icon?: boolean;
  /** Slowly flowing gradient and a periodic light sweep. For primary buttons only. */
  animated?: boolean;
  external?: boolean;
  /** Disables the button (visual + pointer events). */
  disabled?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap select-none transition-[transform,box-shadow,border-color,background-color,color] duration-200 motion-safe:hover:-translate-y-0.5";

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.875rem]",
  md: "h-12 px-7 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-primary text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_10px_28px_-10px_rgb(37_99_235/0.8)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_16px_38px_-10px_rgb(37_99_235/0.9)]",
  secondary:
    "border border-line-strong bg-white/75 text-ink backdrop-blur-sm shadow-[0_8px_22px_-14px_rgb(37_99_235/0.45)] hover:border-accent hover:bg-white hover:text-accent hover:shadow-[0_14px_30px_-12px_rgb(37_99_235/0.5)]",
  ghost: "text-muted hover:text-accent",
};

function Arrow({ variant }: { variant: Variant }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5",
        variant === "primary" ? "bg-white/25" : "bg-accent-soft text-accent",
      )}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Renders an anchor for external destinations and a Next.js Link for internal ones. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  animated,
  external,
  disabled,
  className,
}: Props) {
  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    animated && variant === "primary" && "btn-animated",
    disabled && "pointer-events-none opacity-50",
    className
  );
  const content = (
    <>
      <span>{children}</span>
      {icon ? <Arrow variant={variant} /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

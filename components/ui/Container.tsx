import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * The one content grid for the whole site: 1320px max, with responsive gutters.
 * Section backgrounds stay edge to edge; text blocks set their own reading width.
 */
export function Container({ children, className }: Props) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

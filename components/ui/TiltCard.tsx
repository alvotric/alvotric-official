"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Kept small on purpose. */
  max?: number;
};

/**
 * Tilts slightly toward a mouse pointer, lifts, and shows a violet rim (see .tilt-card in globals.css).
 * Touch and pen input, and users who prefer reduced motion, get no tilt.
 */
export function TiltCard({ children, className, max = 4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${((0.5 - py) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((px - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--glow-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--glow-y", `${(py * 100).toFixed(1)}%`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
  }

  return (
    <div ref={ref} className={cn("tilt-card", className)} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}

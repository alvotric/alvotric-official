"use client";

import { useRef, type PointerEvent } from "react";
import { StatusBadge } from "@/components/ui/Badge";
import { WorkflowPanel } from "./WorkflowPanel";

const CAPTION = "Illustration of the intended Alvo interface. Alvo is in development.";

/**
 * Layered, floating software panels in CSS 3D. No WebGL, no libraries.
 * The stage leans slightly toward a mouse pointer; floating is slow and disabled for reduced motion.
 */
export function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = stageRef.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--hv-x", `${(-py * 5).toFixed(2)}deg`);
    el.style.setProperty("--hv-y", `${(px * 6).toFixed(2)}deg`);
  }

  function reset() {
    stageRef.current?.style.removeProperty("--hv-x");
    stageRef.current?.style.removeProperty("--hv-y");
  }

  return (
    <figure className="relative xl:-mr-12" onPointerMove={onMove} onPointerLeave={reset}>
      {/* Atmosphere behind the panels */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(50%_50%_at_55%_45%,rgb(37_99_235/0.2),transparent_70%)]"
      />

      <div
        role="img"
        aria-label="Illustration of Alvo's intended interface: a plain-language request becomes a three-step workflow, shown as layered software panels. Alvo is in development."
        className="relative mx-auto aspect-[1/0.74] w-full max-w-[720px] sm:aspect-[1/0.9]"
      >
        <div ref={stageRef} aria-hidden="true" className="hv-stage absolute inset-0">
          {/* Back layer: planned future products, intentionally empty */}
          <div className="hv-layer absolute left-[2%] top-[0%] w-[62%] sm:w-[46%]" style={{ transform: "translateZ(-70px)" }}>
            <div className="float-c">
              <div className="panel-ghost p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="whitespace-nowrap text-[0.8125rem] text-muted">Future products</p>
                  <StatusBadge status="planned" />
                </div>
                <div className="mt-3 h-1.5 w-3/5 rounded-full bg-line-strong/70" />
                <div className="mt-2 h-1.5 w-2/5 rounded-full bg-line-strong/50" />
              </div>
            </div>
          </div>

          {/* Main layer: the Alvo workflow panel */}
          <div className="hv-layer absolute left-[3%] top-[22%] w-[94%] sm:left-[4%] sm:top-[13%] sm:w-[92%]" style={{ transform: "translateZ(0)" }}>
            <div className="float-a">
              <WorkflowPanel idPrefix="hero" />
            </div>
          </div>

          {/* Mid layer: node types */}
          <div className="hv-layer absolute bottom-[2%] right-[0%] hidden w-[46%] sm:block" style={{ transform: "translateZ(80px)" }}>
            <div className="float-b">
              <div className="panel p-3.5 sm:p-4">
                <p className="text-[0.75rem] text-subtle">Workflow nodes</p>
                <ul className="mt-2.5 space-y-2 text-[0.8125rem]">
                  {["Trigger", "Condition", "Action"].map((name) => (
                    <li key={name} className="flex items-center gap-2.5 text-ink">
                      <span className="size-2 rotate-45 rounded-[2px] border border-accent" />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Front layer: review step */}
          <div className="hv-layer absolute bottom-[1%] left-[0%] hidden w-[44%] sm:block" style={{ transform: "translateZ(130px)" }}>
            <div className="float-c">
              <div className="panel p-3.5 sm:p-4">
                <p className="text-[0.8125rem] font-medium text-ink">Review before it runs</p>
                <div className="mt-2.5 h-1.5 w-4/5 rounded-full bg-line-strong" />
                <div className="mt-2 h-1.5 w-3/5 rounded-full bg-line-strong/70" />
                <div className="mt-3.5 inline-flex h-7 items-center rounded-full bg-[linear-gradient(135deg,#1d63f0,#5b47e8)] px-3.5 text-[0.75rem] font-medium text-accent-contrast">
                  Approve
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 text-center text-[0.8125rem] text-subtle lg:text-left">{CAPTION}</figcaption>
    </figure>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Prompt = { text: string; trigger: string; step: string; action: string };

/** Example requests shown in the illustration. They are not a list of verified Alvo features. */
const PROMPTS: Prompt[] = [
  { text: "When a new message arrives, summarize it and notify me.", trigger: "New message", step: "Summarize", action: "Notify me" },
  { text: "Every Monday, gather last week's updates into one email.", trigger: "Every Monday", step: "Collect updates", action: "Send email" },
  { text: "Turn each new form reply into a row in my sheet.", trigger: "New form reply", step: "Format", action: "Add row" },
  { text: "Draft a reply to new requests and ask me before sending.", trigger: "New request", step: "Draft reply", action: "Ask me first" },
];

type Phase = "idle" | "typing" | "hold" | "sent" | "dissolve";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

function Node({ kind, label, on, delay }: { kind: string; label: string; on: boolean; delay: number }) {
  return (
    <div
      data-on={on}
      style={{ transitionDelay: on ? `${delay}ms` : "0ms" }}
      className="chat-node min-w-0 rounded-[12px] border border-line-strong bg-bg px-3 py-2 text-left"
    >
      <p className="truncate text-[0.6875rem] text-subtle">{kind}</p>
      <p className="truncate text-[0.8125rem] font-medium text-ink">{label}</p>
    </div>
  );
}

function Connector({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden="true"
      data-on={on}
      style={{ transitionDelay: on ? "120ms" : "0ms" }}
      className="chat-node flex w-5 items-center sm:w-9"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-accent" />
      <span className="size-1.5 rounded-full bg-accent" />
    </div>
  );
}

function PillIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

/**
 * Decorative preview of how a request to Alvo might look: a prompt types itself in, is "sent",
 * becomes a three-step workflow, then dissolves so the next example can type. Nothing here is
 * interactive and nothing is sent anywhere.
 */
export function HeroChat() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });
    // Do not run the animation while the tab is in the background.
    const awake = async () => {
      while (document.hidden && !cancelled) await wait(400);
    };

    async function run() {
      let i = 0;
      await wait(1000);
      while (!cancelled) {
        const text = PROMPTS[i].text;
        setIndex(i);
        setPhase("typing");
        for (let n = 1; n <= text.length; n++) {
          await awake();
          if (cancelled) return;
          setCount(n);
          const ch = text[n - 1];
          // Human-like rhythm: quick on letters, small pauses on spaces and punctuation.
          const base = 34 + Math.random() * 38;
          await wait(ch === "," || ch === "." ? 240 : ch === " " ? base + 30 : base);
        }
        setPhase("hold");
        await wait(650);
        setPhase("sent");
        await wait(2300);
        await awake();
        setPhase("dissolve");
        await wait(1200);
        setCount(0);
        setPhase("idle");
        await wait(800);
        i = (i + 1) % PROMPTS.length;
      }
    }
    run();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [reduced]);

  const prompt = PROMPTS[index];
  const showAll = reduced;
  const visibleCount = showAll ? prompt.text.length : count;
  const chars = prompt.text.slice(0, visibleCount).split("");
  const leaving = phase === "dissolve";
  const nodesOn = showAll || phase === "sent";
  const active = phase === "typing" || phase === "hold" || phase === "sent";
  const empty = visibleCount === 0;

  return (
    <div
      role="img"
      aria-label="Illustration: a plain-language request is typed into a chat box and becomes a three-step workflow. Alvo is in development."
      className="w-full"
    >
      <div aria-hidden="true" className="chat-frame" data-active={active}>
        <div className="rounded-[28.5px] bg-white p-5 text-left sm:p-7">
          <div className="min-h-[4.25rem] text-[1.125rem] leading-[1.55] text-ink sm:min-h-[4.5rem] sm:text-[1.3125rem]">
            {empty ? (
              <span className="text-subtle">
                <span className="chat-caret mr-1 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-accent" />
                Describe what you want to automate
              </span>
            ) : (
              <>
                {chars.map((ch, i) => (
                  <span
                    key={i}
                    className="chat-char"
                    data-leaving={leaving}
                    style={{ transitionDelay: leaving ? `${i * 16}ms` : "0ms" }}
                  >
                    {ch}
                  </span>
                ))}
                {!showAll && phase !== "dissolve" && phase !== "sent" ? (
                  <span className="chat-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-accent" />
                ) : null}
              </>
            )}
          </div>

          <div className="mt-4 grid min-h-[3.75rem] grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
            <Node kind="Trigger" label={prompt.trigger} on={nodesOn && !leaving} delay={0} />
            <Connector on={nodesOn && !leaving} />
            <Node kind="AI step" label={prompt.step} on={nodesOn && !leaving} delay={220} />
            <Connector on={nodesOn && !leaving} />
            <Node kind="Action" label={prompt.action} on={nodesOn && !leaving} delay={440} />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex h-9 items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 text-[0.8125rem] font-medium text-accent">
                <PillIcon>
                  <circle cx="3" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="11" cy="3.5" r="1.8" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="11" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M4.7 6.4 9.3 4.1M4.7 7.6l4.6 2.3" stroke="currentColor" strokeWidth="1.4" />
                </PillIcon>
                Workflow
              </span>
              <span className="hidden h-9 items-center gap-2 rounded-full border border-line-strong px-3.5 text-[0.8125rem] font-medium text-muted sm:inline-flex">
                <PillIcon>
                  <path d="M5 9 9 5M6.2 3.6l.9-.9a2.4 2.4 0 0 1 3.4 3.4l-.9.9M7.8 10.4l-.9.9a2.4 2.4 0 0 1-3.4-3.4l.9-.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </PillIcon>
                Integrations
              </span>
            </div>
            <span
              data-press={phase === "sent" || phase === "hold"}
              data-ping={phase === "sent"}
              className={cn(
                "chat-send relative grid size-11 shrink-0 place-items-center rounded-full text-white transition-transform duration-200",
                "bg-[linear-gradient(135deg,#1d63f0,#5b47e8)] shadow-[0_10px_24px_-8px_rgb(37_99_235/0.8)]",
              )}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 14.5v-11M4.5 8 9 3.5 13.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

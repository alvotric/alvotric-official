"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo, LogoMark } from "./Logo";
import { LinkButton } from "@/components/ui/Button";
import { alvoLink, siteConfig } from "@/content/site.config";
import { cn } from "@/lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled])';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const alvo = alvoLink();

  const close = useCallback(() => setOpen(false), []);

  // Menu behavior: lock scroll, move focus in, trap Tab, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const button = buttonRef.current;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel || !button) return;
      const items = [button, ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))];
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    // Close the menu if the viewport grows to the desktop layout.
    const mq = window.matchMedia("(min-width: 768px)");
    function onChange() {
      if (mq.matches) setOpen(false);
    }
    mq.addEventListener("change", onChange);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
      button?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo id="hdr" />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-150",
                isActive(item.href) ? "bg-accent-soft text-accent" : "text-muted hover:bg-accent-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <LinkButton href={alvo.href} external={alvo.external} size="sm" className="ml-3">
            {alvo.label}
          </LinkButton>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-bg px-5 pb-8 pt-4 sm:px-8 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center text-xl font-medium",
                      isActive(item.href) ? "text-ink" : "text-muted",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
              href={alvo.href}
              onClick={close}
              target={alvo.external ? "_blank" : undefined}
              rel={alvo.external ? "noopener noreferrer" : undefined}
              className={cn(
                "group inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap select-none transition-[transform,box-shadow,border-color,background-color,color] duration-200 motion-safe:hover:-translate-y-0.5",
                "h-14 px-8 text-base",
                "btn-primary text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_10px_28px_-10px_rgb(37_99_235/0.8)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_16px_38px_-10px_rgb(37_99_235/0.9)]",
                "mt-8 w-full"
              )}
            >
              {alvo.label}
            </a>
        </div>
      ) : null}
    </header>
  );
}

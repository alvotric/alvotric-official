"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { SQL, highlight } from "./sql";
import "./protodb.css";

/**
 * Scopes the ProtoDB look (everything is under `.pdb`) and adds the page's motion:
 * scroll pop-in, tilting schema map and screenshots, and the typing query editor.
 * Content is fully visible without JavaScript; every effect only adds motion.
 */
export function ProtoDbRoot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 621px)").matches;
    const cleanups: Array<() => void> = [];

    /* Scroll pop-in */
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      root.querySelectorAll("[data-r]").forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* Hero schema stage: tilt toward the pointer, plus dots travelling along the relationship lines */
    const stage = root.querySelector<HTMLElement>(".stage");
    const s3d = root.querySelector<HTMLElement>(".s3d");
    if (stage && s3d && !reduce) {
      const onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width - 0.5));
        const y = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height - 0.5));
        s3d.style.transform = `rotateX(${10 - y * 14}deg) rotateY(${-14 + x * 22}deg)`;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

      const NS = "http://www.w3.org/2000/svg";
      const svg = stage.querySelector(".lines");
      if (svg) {
        const dots: Element[] = [];
        (
          [
            ["M45 14 C52 14 50 35 56 35", "2.6s"],
            ["M44 61 C52 61 50 81 56 81", "3.1s"],
          ] as const
        ).forEach(([path, dur]) => {
          const c = document.createElementNS(NS, "circle");
          c.setAttribute("r", "1.2");
          const a = document.createElementNS(NS, "animateMotion");
          a.setAttribute("path", path);
          a.setAttribute("dur", dur);
          a.setAttribute("repeatCount", "indefinite");
          a.setAttribute("begin", "2s");
          c.appendChild(a);
          svg.appendChild(c);
          dots.push(c);
        });
        cleanups.push(() => dots.forEach((d) => d.remove()));
      }
    }

    /* Screenshot tilt */
    if (!reduce && wide) {
      root.querySelectorAll<HTMLElement>(".persp").forEach((wrap) => {
        const shot = wrap.querySelector<HTMLElement>(".shot");
        if (!shot) return;
        const rest = "rotateX(4deg) rotateY(-4deg)";
        shot.style.transform = rest;
        const onMove = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          shot.style.transform = `rotateX(${4 - y * 8}deg) rotateY(${x * 10}deg)`;
        };
        const onLeave = () => {
          shot.style.transform = rest;
        };
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          wrap.removeEventListener("pointermove", onMove);
          wrap.removeEventListener("pointerleave", onLeave);
          shot.style.transform = "";
        });
      });
    }

    /* Typing query editor: shows the finished state first, replays while on screen */
    const ed = root.querySelector<HTMLElement>(".ed");
    const code = root.querySelector<HTMLElement>(".ed pre");
    const runBtn = root.querySelector<HTMLElement>(".ed .run");
    if (ed && code && runBtn && !reduce && "IntersectionObserver" in window) {
      const rows = Array.from(ed.querySelectorAll<HTMLElement>("tr.r"));
      const metas = Array.from(ed.querySelectorAll<HTMLElement>(".meta .m"));
      let visible = false;
      let running = false;
      let disposed = false;

      const show = (t: string, caret: boolean) => {
        code.innerHTML = highlight(t) + (caret ? '<span class="caret"></span>' : "");
      };
      const setRes = (on: boolean) => {
        rows.forEach((r) => r.classList.toggle("off", !on));
        metas.forEach((m) => m.classList.toggle("off", !on));
      };
      const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

      const play = async () => {
        if (running) return;
        running = true;
        while (visible && !disposed) {
          setRes(false);
          show("", true);
          await wait(500);
          for (let i = 1; i <= SQL.length && visible && !disposed; i++) {
            show(SQL.slice(0, i), true);
            await wait(SQL.charAt(i - 1) === "\n" ? 260 : 32);
          }
          if (disposed) break;
          show(SQL, false);
          await wait(450);
          runBtn.classList.add("hit");
          await wait(280);
          runBtn.classList.remove("hit");
          metas.forEach((m) => m.classList.remove("off"));
          for (let j = 0; j < rows.length && !disposed; j++) {
            rows[j].classList.remove("off");
            await wait(300);
          }
          await wait(5200);
        }
        running = false;
      };

      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) void play();
          else if (!running) {
            show(SQL, false);
            setRes(true);
          }
        },
        { threshold: 0.4 },
      );
      io.observe(ed);
      cleanups.push(() => {
        disposed = true;
        visible = false;
        io.disconnect();
        runBtn.classList.remove("hit");
        show(SQL, false);
        setRes(true);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div ref={ref} className={`pdb ${GeistMono.variable}`}>
      {children}
    </div>
  );
}

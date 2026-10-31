"use client";

import { useEffect, useRef, useState } from "react";

type RunState = "failed" | "retrying" | "ok";

const rows = [
  { name: "Invoice sync to accounting", trigger: "Webhook", last: "2 min ago", dur: "3.2 s", pill: "ok", label: "Success" },
  { name: "Lead routing to sales", trigger: "Form submit", last: "now", dur: "1.1 s", pill: "run", label: "Running" },
] as const;
const rowsAfter = [
  { name: "Nightly database backup", trigger: "Daily 02:00", last: "9 h ago", dur: "48 s", pill: "ok", label: "Success" },
  { name: "Weekly report to Slack", trigger: "Mon 09:00", last: "paused", dur: "-", pill: "pause", label: "Paused" },
] as const;

function Row({ r }: { r: (typeof rows)[number] | (typeof rowsAfter)[number] }) {
  return (
    <tr>
      <td className="name">{r.name}</td>
      <td className="mono">{r.trigger}</td>
      <td className="mono">{r.last}</td>
      <td className="mono">{r.dur}</td>
      <td><span className={`pill ${r.pill}`}>{r.label}</span></td>
      <td />
    </tr>
  );
}

/** Illustrative console. All figures are sample data; Retry only plays a local demo. */
export function AlvoConsole() {
  const [state, setState] = useState<RunState>("failed");
  const perspRef = useRef<HTMLDivElement>(null);
  const conRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const persp = perspRef.current;
    const con = conRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 621px)").matches;
    if (!persp || !con || reduce || !wide) return;
    const onMove = (e: PointerEvent) => {
      const r = persp.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      con.style.transform = `rotateX(${6 - y * 12}deg) rotateY(${x * 14}deg)`;
    };
    const onLeave = () => {
      con.style.transform = "";
    };
    persp.addEventListener("pointermove", onMove);
    persp.addEventListener("pointerleave", onLeave);
    return () => {
      persp.removeEventListener("pointermove", onMove);
      persp.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const retry = () => {
    if (state !== "failed") return;
    setState("retrying");
    timer.current = setTimeout(() => setState("ok"), 1600);
  };

  const healthy = state === "ok";

  return (
    <div className="persp" ref={perspRef}>
      <div className="console" ref={conRef}>
        <div className="bar">
          <i /><i /><i />
          <span>alvo / workflows</span>
        </div>
        <div className="kpis">
          <div className="kpi"><small>Active workflows</small><strong>24</strong></div>
          <div className="kpi"><small>Runs today</small><strong>1,284</strong></div>
          <div className="kpi"><small>Success rate</small><strong>{healthy ? "98.9%" : "98.6%"}</strong></div>
          <div className="kpi"><small>Needs attention</small><strong>{healthy ? "0" : "1"}</strong></div>
        </div>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>Workflow</th><th>Trigger</th><th>Last run</th><th>Duration</th><th>Status</th><th /></tr>
            </thead>
            <tbody>
              {rows.map((r) => <Row key={r.name} r={r} />)}
              <tr>
                <td className="name">Order status to WhatsApp</td>
                <td className="mono">Every 15 min</td>
                <td className="mono">{state === "failed" ? "11 min ago" : "now"}</td>
                <td className="mono">{state === "failed" ? "timeout" : state === "retrying" ? "..." : "2.4 s"}</td>
                <td>
                  <span className={`pill ${state === "failed" ? "bad" : state === "retrying" ? "run" : "ok"}`}>
                    {state === "failed" ? "Failed" : state === "retrying" ? "Running" : "Success"}
                  </span>
                </td>
                <td>
                  {state === "ok" ? null : (
                    <button className="retry" type="button" onClick={retry} disabled={state === "retrying"}>
                      {state === "retrying" ? "Retrying" : "Retry"}
                    </button>
                  )}
                </td>
              </tr>
              {rowsAfter.map((r) => <Row key={r.name} r={r} />)}
            </tbody>
          </table>
        </div>
        <div className="float f1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span aria-live="polite">{healthy ? "All workflows healthy" : "1 workflow needs you"}</span>
        </div>
        <div className="float f2">retry #1 · backoff 30s</div>
      </div>
    </div>
  );
}

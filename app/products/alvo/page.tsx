import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import { StatusBadge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/ui/JsonLd";
import { AlvoStage } from "@/components/alvo/AlvoStage";
import { AlvoConsole } from "@/components/alvo/AlvoConsole";
import "@/components/alvo/alvo.css";
import { alvo } from "@/content/products";
import { absoluteUrl, alvoLink, siteConfig } from "@/content/site.config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Alvo",
  description:
    "Alvo is Alvotric's flagship platform for building automations and web projects with AI assistance. Currently in development.",
  path: "/products/alvo",
});

const features = [
  {
    title: "Workflow orchestration",
    body: "Chain automations together, set dependencies and decide what runs when. One failure does not take the rest down.",
    icon: (
      <>
        <circle cx="5" cy="6" r="2.5" />
        <circle cx="19" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M7 7.5 11 16M17 7.5 13 16M7.5 6h9" />
      </>
    ),
  },
  {
    title: "Live monitoring",
    body: "Watch every run as it happens. Status, duration and output are one click away, with full logs kept for review.",
    icon: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  },
  {
    title: "Schedules and triggers",
    body: "Start workflows on a timer, a webhook, a form or an event from another app. Pause and resume without losing settings.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Retries and recovery",
    body: "Failed runs retry with backoff, then raise an alert. Re-run any step from the point where it stopped.",
    icon: (
      <>
        <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
        <path d="M3 21v-5h5" />
      </>
    ),
  },
  {
    title: "Roles and audit trail",
    body: "Decide who can view, edit or run each workflow. Every change is recorded with a name and a time.",
    icon: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
  },
  {
    title: "Smart alerts",
    body: "Send the right alert to the right person on email, Slack or WhatsApp. Quiet when things work, loud when they do not.",
    icon: (
      <>
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
  },
];

const steps = [
  { title: "Connect", body: "Link the platforms and tools your automations already use. Existing workflows show up as they are." },
  { title: "Organise", body: "Group workflows by team or project, set owners, schedules and alert rules once." },
  { title: "Monitor and control", body: "Track every run, fix failures fast and keep a record of everything that changed." },
];

const tools = ["Webhooks", "Slack", "Gmail", "Google Sheets", "WhatsApp", "Notion", "Stripe", "REST APIs"];

export default function AlvoPage() {
  const link = alvoLink();
  const primary = link.external ? (
    <a className="btn primary" href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  ) : (
    <Link className="btn primary" href={link.href}>
      {link.label}
    </Link>
  );

  return (
    <div className={`alvx ${GeistMono.variable}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: alvo.name,
          description: alvo.summary,
          applicationCategory: "BusinessApplication",
          url: absoluteUrl("/products/alvo"),
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />

      {/* Hero */}
      <div className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="tagrow">
              <span className="eyebrow">Automation management platform</span>
              <StatusBadge status={alvo.status} />
            </div>
            <h1>
              Every automation. <em>One calm</em> control room.
            </h1>
            <p className="lead">
              Alvo sits above your workflows, bots and scheduled jobs. See what is running, fix what failed and
              control who can change what, all from one place.
            </p>
            <div className="cta-row">
              {primary}
              <a className="btn ghost" href="#console">
                See the console
              </a>
            </div>
            <div className="proof">
              <span><i />Runs, retries and logs</span>
              <span><i />Schedules and triggers</span>
              <span><i />Roles and audit trail</span>
            </div>
          </div>
          <AlvoStage />
        </div>
      </div>

      {/* Console */}
      <section className="console-sec" id="console">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">The console</span>
            <h2>Your whole automation stack on a single screen.</h2>
            <p>Move your mouse over the console to tilt it. Hit Retry on the failed run to see how recovery looks.</p>
          </div>
          <AlvoConsole />
          <p className="note">Sample data shown for illustration. Alvo is in development.</p>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Features</span>
            <h2>Built for the people who keep automations alive.</h2>
            <p>Building a workflow is the easy part. Alvo covers everything that happens after it goes live.</p>
          </div>
          <div className="grid">
            {features.map((f) => (
              <article className="card" key={f.title}>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {f.icon}
                  </svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="steps-sec" id="flow">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">How it works</span>
            <h2>From scattered scripts to one managed system.</h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="n">STEP 0{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="tools" aria-label="Intended integrations">
            {tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start">
        <div className="wrap">
          <div className="cta">
            <div>
              <h2>Ready to run your automations with confidence?</h2>
              <p>Bring every workflow under one roof and know what is happening before your customers do.</p>
            </div>
            <div className="acts">
              {link.external ? (
                <a className="btn white" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link className="btn white" href={link.href}>
                  {link.label}
                </Link>
              )}
              <Link className="btn line" href="/contact">
                Contact Alvotric
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

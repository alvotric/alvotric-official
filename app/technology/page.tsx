import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/Badge";
import { CtaBand } from "@/components/sections/CtaBand";
import type { Status } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Technology",
  description:
    "How Alvotric approaches AI-assisted development, intelligent automation, workflow orchestration, and developer tooling.",
  path: "/technology",
});

const areas: { title: string; body: string; status: Status }[] = [
  {
    title: "AI-assisted development",
    body: "Using AI as a collaborator when designing and building software, with a person always able to read, change, and approve the result.",
    status: "in-development",
  },
  {
    title: "Intelligent automation",
    body: "Turning a described task into a workflow that runs on its own, and explaining what it does in terms people can follow.",
    status: "in-development",
  },
  {
    title: "Workflow orchestration",
    body: "Arranging triggers, conditions, and actions into workflows that can be inspected step by step.",
    status: "in-development",
  },
  {
    title: "Developer tooling and integrations",
    body: "Connecting workflows to the services people already use, and building supporting tools for developers.",
    status: "planned",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        title="Technology"
        lede="The areas Alvotric works in, and how we think about building them. Labels show where each stands today."
      />

      <Section id="areas" layout="split" title="Areas of work">
        <ul className="divide-y divide-line border-y border-line-strong">
          {areas.map((a) => (
            <li key={a.title} className="flex flex-col gap-4 py-9 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <h3 className="text-2xl font-semibold sm:text-3xl">{a.title}</h3>
                <p className="mt-3 max-w-[52ch] text-lg text-muted">{a.body}</p>
              </div>
              <div className="shrink-0 sm:pt-2">
                <StatusBadge status={a.status} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="responsible" layout="split" title="Security, privacy, and reliability" tone="elevated">
        <p className="max-w-[56ch] text-lg text-muted sm:text-xl">
          Our aim is software that is secure by default, careful with data, and clear when it fails. These are
          goals we hold ourselves to, not certifications. Alvotric holds no security certifications at this time,
          and we will not claim any before they are earned and verifiable.
        </p>
        <h3 className="mt-14 text-2xl font-semibold">What this website does today</h3>
        <ul className="mt-6 max-w-[56ch] list-disc space-y-3 pl-5 text-lg text-muted marker:text-subtle">
          <li>It is a static site. There are no accounts and no database behind it.</li>
          <li>It sets no cookies and runs no analytics or advertising scripts.</li>
          <li>It collects no personal information through forms. The contact form is not live yet.</li>
          <li>Its fonts are served from the same site, not from a third-party font service.</li>
        </ul>
      </Section>

      <CtaBand title="Follow Alvo’s progress" />
    </>
  );
}

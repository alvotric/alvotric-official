import { Section } from "@/components/ui/Section";

export const principles = [
  {
    title: "Useful before impressive",
    body: "We start from a task a person actually needs done, and judge our work by whether it removes effort.",
  },
  {
    title: "Reliable by design",
    body: "Software should fail clearly. When something goes wrong, people should be told what happened and what to do next.",
  },
  {
    title: "Accessible to more people",
    body: "Tools should work on modest devices and for people who are not specialists. That includes keyboards, screen readers, and small phones.",
  },
  {
    title: "Honest about where we are",
    body: "We label what works, what is being built, and what is only planned. We do not publish claims we cannot back up.",
  },
];

export function Principles({ tone = "base" }: { tone?: "base" | "elevated" }) {
  return (
    <Section id="principles" title="How we work" tone={tone}>
      <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {principles.map((p) => (
          <div key={p.title} className="border-t border-line-strong pt-6">
            <dt className="text-xl font-semibold">{p.title}</dt>
            <dd className="mt-3 max-w-[32ch] text-muted">{p.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

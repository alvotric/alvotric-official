import { StatusBadge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { focusAreas } from "@/content/products";

export function FocusAreas() {
  return (
    <Section
      id="focus"
      layout="split"
      title="What we build"
      intro="Three areas of work, each labeled with where it honestly stands today."
      tone="elevated"
    >
      <ul className="divide-y divide-line border-y border-line-strong">
        {focusAreas.map((area) => (
          <li key={area.title} className="flex flex-col gap-4 py-9 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div>
              <h3 className="text-2xl font-semibold sm:text-3xl">{area.title}</h3>
              <p className="mt-3 max-w-[52ch] text-lg text-muted">{area.description}</p>
            </div>
            <div className="shrink-0 sm:pt-2">
              <StatusBadge status={area.status} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

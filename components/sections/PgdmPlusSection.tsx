import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PGDM_PLUS_OVERVIEW, certifications, sapModules } from "@/data/programs";

export function PgdmPlusSection() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="PGDM PLUS"
        title="The PGDM, plus a year of SAP with SAP University Alliances"
        description={PGDM_PLUS_OVERVIEW}
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sapModules.map((module) => (
          <li
            key={module.code}
            className="rounded-brand-lg border border-line bg-white p-6"
          >
            <span className="inline-flex rounded-full bg-brand-tint px-2.5 py-1 text-xs font-semibold text-brand">
              {module.code}
            </span>
            <h3 className="mt-3.5 text-base font-semibold">{module.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {module.description}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-brand-lg border border-line bg-white p-6 sm:p-8">
        <h3 className="text-base font-semibold">
          Certifications students earn alongside the diploma
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {certifications.map((certification) => (
            <li
              key={certification}
              className="rounded-full border border-line px-3 py-1.5 text-sm text-muted"
            >
              {certification}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

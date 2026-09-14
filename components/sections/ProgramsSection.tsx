import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  PGDM_OVERVIEW,
  programsOffered,
  specialisations,
} from "@/data/programs";
import { ANCHORS } from "@/lib/site";

export function ProgramsSection() {
  return (
    <Section id={ANCHORS.programs}>
      <SectionHeading
        eyebrow="Programs"
        title="Three ways into a management career at IIEBM"
        description="Admissions are open across all three for the 2026-28 intake."
      />

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {programsOffered.map((program) => (
          <li
            key={program.name}
            className="flex flex-col rounded-brand-lg border border-line bg-white p-6 sm:p-7"
          >
            <h3 className="text-2xl font-semibold text-brand">
              {program.name}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {program.meta}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {program.summary}
            </p>

            <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
              {program.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm text-ink"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10.5l4 4 8-9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>

            <CtaButton
              href={`#${ANCHORS.form}`}
              variant="outline"
              className="mt-6 w-full"
            >
              Enquire about {program.name}
            </CtaButton>
          </li>
        ))}
      </ul>

      <div className="mt-20">
        <SectionHeading
          eyebrow="Our 5 shades programs"
          title="Five specialisations within the PGDM"
          description={PGDM_OVERVIEW}
        />
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {specialisations.map((program) => (
          <li
            key={program.slug}
            className="flex flex-col overflow-hidden rounded-brand-lg border border-line bg-white"
          >
            <div className="relative aspect-[4/3] w-full bg-canvas-alt">
              <Image
                src={program.image}
                alt={`${program.name} at IIEBM, Pune`}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold leading-snug">
                {program.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {program.overview}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Electives include
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {program.electives.slice(0, 4).map((elective) => (
                  <li
                    key={elective}
                    className="rounded-full bg-brand-tint px-2.5 py-1 text-xs text-brand"
                  >
                    {elective}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        <li className="flex flex-col justify-center gap-4 rounded-brand-lg bg-brand p-8 text-white">
          <h3 className="text-xl font-semibold leading-snug">
            Not sure which specialisation fits you?
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            A counsellor will walk you through where each specialisation places,
            what it demands, and which one matches your graduation background.
          </p>
          <CtaButton href={`#${ANCHORS.form}`} variant="light" className="w-fit">
            Talk it through
          </CtaButton>
        </li>
      </ul>
    </Section>
  );
}

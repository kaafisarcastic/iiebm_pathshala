import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { pgdmCtc, pgdmPlusCtc, pgdmReach } from "@/data/placements";
import { ANCHORS } from "@/lib/site";

export function PlacementHighlightsSection() {
  return (
    <Section id={ANCHORS.placements} tone="alt">
      <SectionHeading
        eyebrow="Placement highlights"
        title="The numbers the batch actually walked away with"
        description="Published by IIEBM for the PGDM PLUS and PGDM cohorts."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-brand-lg border border-line bg-white p-5 sm:p-8">
          <h3 className="text-lg font-semibold">PGDM PLUS</h3>
          <p className="mt-1 text-sm text-muted">
            The PGDM paired with the SAP certification year.
          </p>

          {/* min-w-0: see the note in HeroSection — same overflow trap. */}
          <dl className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
            {pgdmPlusCtc.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col-reverse">
                <dt className="mt-1.5 text-xs leading-snug text-muted">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-semibold text-brand sm:text-3xl">
                  {stat.value}
                  <span className="ml-1 text-sm font-medium text-muted">
                    {stat.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="rounded-brand-lg border border-line bg-white p-5 sm:p-8">
          <h3 className="text-lg font-semibold">PGDM</h3>
          <p className="mt-1 text-sm text-muted">
            The two-year flagship management program.
          </p>

          <dl className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
            {pgdmCtc.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col-reverse">
                <dt className="mt-1.5 text-xs leading-snug text-muted">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-semibold text-brand sm:text-3xl">
                  {stat.value}
                  <span className="ml-1 text-sm font-medium text-muted">
                    LPA
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <dl className="mt-6 grid gap-6 rounded-brand-lg bg-navy p-6 text-white sm:grid-cols-3 sm:p-8">
        {pgdmReach.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="mt-1.5 text-sm leading-snug text-white/70">
              {stat.label}
            </dt>
            <dd className="text-4xl font-semibold">
              {stat.value}
              {stat.suffix ? (
                <span className="text-2xl">{stat.suffix}</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex justify-center">
        <CtaButton href={`#${ANCHORS.form}`}>
          Ask about placements for your specialisation
        </CtaButton>
      </div>
    </Section>
  );
}

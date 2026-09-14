import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  CUTOFF_NOTE,
  admissionCalendar,
  admissionSteps,
  eligibility,
} from "@/data/admissions";
import { ANCHORS, INTAKE } from "@/lib/site";

export function AdmissionsSection() {
  return (
    <Section id={ANCHORS.admissions}>
      <SectionHeading
        eyebrow="Admissions"
        title={`How admission to the ${INTAKE.batch} batch works`}
        description="Five steps, and a counsellor with you through all of them."
      />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {admissionSteps.map((step) => (
          <li
            key={step.step}
            className="rounded-brand-lg border border-line bg-white p-6"
          >
            <span className="text-sm font-semibold text-brand">{step.step}</span>
            <h3 className="mt-2.5 text-base font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <div className="rounded-brand-lg border border-line bg-white p-6 sm:p-8">
          <h3 className="text-base font-semibold">Who is eligible</h3>
          <dl className="mt-5 flex flex-col gap-5">
            {eligibility.map((item) => (
              <div key={item.title}>
                <dt className="text-sm font-semibold text-brand">
                  {item.title}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col rounded-brand-lg bg-navy p-6 text-white sm:p-8">
          <h3 className="text-base font-semibold">Admission calendar</h3>
          <dl className="mt-5 flex flex-col gap-4">
            {admissionCalendar.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-sm text-white/70">{row.label}</dt>
                <dd className="text-sm font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-xs leading-relaxed text-white/70">
            {CUTOFF_NOTE}
          </p>

          <CtaButton
            href={`#${ANCHORS.form}`}
            variant="light"
            className="mt-6 w-full"
          >
            Start my application
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}

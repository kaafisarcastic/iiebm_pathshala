import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { ACCEPTED_EXAMS, ANCHORS, OTHER_EXAMS, TOOLS } from "@/lib/site";

const tools = [
  {
    ...TOOLS.catPredictor,
    blurb:
      "See which business schools your CAT percentile puts in range before you shortlist.",
  },
  {
    ...TOOLS.catScoreCalculator,
    blurb:
      "Turn your raw CAT attempt into a scaled score and an expected percentile.",
  },
];

export function EntranceExamsSection() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Entrance Exams"
        title="Any One Score Is Enough To Apply"
        description="IIEBM accepts CAT, XAT, CMAT, MAT, GMAT, MH-CET and ATMA — any one of them. Admission is decided on your overall profile, with the GD/PI assessment carrying equal weight, so a single percentile never settles it."
      />

      <ul className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {ACCEPTED_EXAMS.map((exam) => (
          <li
            key={exam}
            className="rounded-brand border border-line bg-white px-5 py-3 text-base font-semibold text-brand sm:px-6"
          >
            {exam}
          </li>
        ))}
      </ul>

      {/*
        NMAT and SNAP are not on IIEBM's accepted list, so they are offered as
        a question to a counsellor rather than a claim about what qualifies.
      */}
      <p className="type-body mx-auto mt-6 max-w-2xl text-center text-muted">
        Sat {OTHER_EXAMS.join(" or ")} instead? Those are not on IIEBM&apos;s
        published list — speak to a counsellor about where you stand.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <div
            key={tool.label}
            className="flex flex-col rounded-brand-lg border border-line bg-white p-6"
          >
            <h3 className="type-h3">{tool.label}</h3>
            <p className="type-body mt-2 text-muted">{tool.blurb}</p>

            {tool.href ? (
              <CtaButton
                href={tool.href}
                variant="outline"
                className="mt-5 w-fit"
              >
                Open {tool.label}
              </CtaButton>
            ) : (
              <p className="type-small mt-5 inline-flex w-fit rounded-brand bg-canvas-alt px-3 py-2 font-medium text-muted">
                Coming Soon
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <CtaButton href={`#${ANCHORS.form}`}>Check My Eligibility</CtaButton>
      </div>
    </Section>
  );
}

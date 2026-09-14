import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/admissions";
import { ANCHORS } from "@/lib/site";

export function FaqSection() {
  return (
    <Section id={ANCHORS.faq} tone="alt">
      <SectionHeading
        eyebrow="Admission FAQ"
        title="The questions we get asked before every intake"
      />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-line overflow-hidden rounded-brand-lg border border-line bg-white">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            name="faq"
            open={index === 0}
            className="group px-6 py-5"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-medium text-ink marker:hidden">
              {faq.question}
              <svg
                viewBox="0 0 20 20"
                className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

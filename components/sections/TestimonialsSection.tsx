import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

/** "Ms. Pasham Deepa" → "PD". The honorific is dropped. */
function initials(name: string): string {
  return name
    .replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialsSection() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Real experiences. Real impact."
        title="What students say once they are on the other side"
      />

      {/* Masonry columns keep short and long quotes from leaving ragged gaps. */}
      <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name + testimonial.placedAt}
            className="mb-5 break-inside-avoid rounded-brand-lg border border-line bg-white p-6"
          >
            <figure>
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-brand/30"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M9.4 5.6C6.2 7 4.4 9.6 4.4 13v5.4h6.2V13H7.9c0-2.2 1-3.7 2.9-4.6l-1.4-2.8Zm9.2 0C15.4 7 13.6 9.6 13.6 13v5.4h6.2V13h-2.7c0-2.2 1-3.7 2.9-4.6l-1.4-2.8Z"
                />
              </svg>

              <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm font-semibold text-brand"
                >
                  {initials(testimonial.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {testimonial.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    Placed at {testimonial.placedAt}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

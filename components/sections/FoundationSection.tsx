import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_PARAGRAPHS, ABOUT_PILLARS, foundation } from "@/data/campus";

export function FoundationSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Foundation of excellence"
            title="Built on Armed Forces ethos, since 2000"
          />

          <div className="mt-5 flex flex-col gap-4">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {ABOUT_PILLARS.map((pillar) => (
              <li
                key={pillar}
                className="rounded-full bg-brand-tint px-3 py-1.5 text-sm font-medium text-brand"
              >
                {pillar}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-brand bg-canvas-alt">
              <Image
                src="/life/campus-entrance.webp"
                alt="The entrance to IIEBM, Indus Business School in Wakad, Pune"
                fill
                sizes="(min-width: 1024px) 15rem, 55vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-brand bg-canvas-alt">
              <Image
                src="/life/group-project.webp"
                alt="IIEBM students working together in the campus boardroom"
                fill
                sizes="(min-width: 1024px) 10rem, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {foundation.map((group) => (
            <section
              key={group.title}
              className="rounded-brand-lg border border-line bg-white p-6"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {group.title}
              </h3>
              <dl className="mt-5 flex flex-col gap-4">
                {group.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-row-reverse items-baseline justify-end gap-3"
                  >
                    <dt className="text-sm leading-snug text-muted">
                      {stat.label}
                    </dt>
                    <dd className="min-w-[4.25rem] text-xl font-semibold text-ink">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}

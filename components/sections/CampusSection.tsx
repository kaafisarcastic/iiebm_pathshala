import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INFRASTRUCTURE_INTRO, campusEvents, facilities } from "@/data/campus";
import { ANCHORS } from "@/lib/site";

export function CampusSection() {
  return (
    <Section id={ANCHORS.campus} tone="alt">
      <SectionHeading
        eyebrow="Infrastructure"
        title="A campus built for two years of living, not just studying"
        description={INFRASTRUCTURE_INTRO}
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <li
            key={facility.title}
            className="overflow-hidden rounded-brand-lg border border-line bg-white"
          >
            <div className="relative aspect-[16/10] w-full bg-canvas-alt">
              <Image
                src={facility.image}
                alt={`${facility.title} at the IIEBM campus, Pune`}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-base font-semibold">{facility.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {facility.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Academic events
      </h3>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {campusEvents.map((event) => (
          <li
            key={event.title}
            className="group relative overflow-hidden rounded-brand-lg"
          >
            <div className="relative aspect-[4/5] w-full bg-canvas-alt">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
                aria-hidden="true"
              />
            </div>
            <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium leading-snug text-white">
              {event.title}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

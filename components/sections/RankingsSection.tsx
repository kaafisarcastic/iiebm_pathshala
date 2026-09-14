import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { rankings } from "@/data/rankings";

export function RankingsSection() {
  return (
    <Section tone="alt">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
        <div className="flex flex-col">
          <SectionHeading
            align="left"
            eyebrow="Ranking & recognitions"
            title="Ranked by the people who rank business schools"
            description="Independent rankings from Times B School, IIRF and Outlook."
          />

          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-brand-lg bg-canvas">
            <Image
              src="/campus/convocation.webp"
              alt="The IIEBM Convocation Ceremony 2025 with the graduating batch on stage"
              fill
              sizes="(min-width: 1024px) 22rem, 90vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
              aria-hidden="true"
            />
            <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-white">
              Convocation Ceremony 2025
            </p>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {rankings.map((ranking) => (
            <li
              key={`${ranking.publisher}-${ranking.rank}-${ranking.claim}`}
              className="flex items-start gap-5 rounded-brand-lg border border-line bg-white px-6 py-6"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-tint text-lg font-semibold text-gold">
                {ranking.rank}
              </span>
              <div>
                <p className="text-pretty text-base font-medium leading-snug text-ink">
                  {ranking.claim}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {ranking.publisher}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

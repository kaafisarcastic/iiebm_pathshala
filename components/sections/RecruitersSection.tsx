import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import {
  RECRUITING_PARTNER_COUNT,
  recruiters,
  recruitingSectors,
} from "@/data/placements";

export function RecruitersSection() {
  const half = Math.ceil(recruiters.length / 2);

  return (
    <Section>
      <SectionHeading
        eyebrow="Get dream jobs with IIEBM"
        title={`Associated with ${RECRUITING_PARTNER_COUNT} companies across sectors`}
        description="Students choose a profile from a variety of organisations, so the specialisation you pick is not the only thing that decides where you land."
      />

      <div className="mt-12 flex flex-col gap-4">
        <LogoMarquee
          logos={recruiters.slice(0, half)}
          dir="recruiters"
          ext="webp"
          durationSeconds={50}
        />
        <LogoMarquee
          logos={recruiters.slice(half)}
          dir="recruiters"
          ext="webp"
          durationSeconds={62}
        />
      </div>

      <ul className="mt-12 flex flex-wrap justify-center gap-2.5">
        {recruitingSectors.map((sector) => (
          <li
            key={sector}
            className="rounded-full border border-line bg-canvas-alt px-3.5 py-1.5 text-sm text-muted"
          >
            {sector}
          </li>
        ))}
      </ul>
    </Section>
  );
}

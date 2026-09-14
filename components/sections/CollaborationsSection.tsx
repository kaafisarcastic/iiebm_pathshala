import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { collaborations } from "@/data/rankings";

export function CollaborationsSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Academic collaborations"
        title="Certification partners behind the curriculum"
      />

      <div className="mt-10">
        <LogoMarquee
          logos={collaborations}
          dir="collaborations"
          ext="png"
          durationSeconds={38}
        />
      </div>
    </Section>
  );
}

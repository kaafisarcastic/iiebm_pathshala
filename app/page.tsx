import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PlacementHighlightsSection } from "@/components/sections/PlacementHighlightsSection";
import { RecruitersSection } from "@/components/sections/RecruitersSection";
import { RankingsSection } from "@/components/sections/RankingsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { PgdmPlusSection } from "@/components/sections/PgdmPlusSection";
import { FoundationSection } from "@/components/sections/FoundationSection";
import { CampusSection } from "@/components/sections/CampusSection";
import { StudentLifeSection } from "@/components/sections/StudentLifeSection";
import { CollaborationsSection } from "@/components/sections/CollaborationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AdmissionsSection } from "@/components/sections/AdmissionsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/sections/Footer";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LeadModal } from "@/components/form/LeadModal";
import { buildStructuredData } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink selection:bg-brand selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData()),
        }}
      />

      {/* Sticky header: logo, partner disclosure, phone and apply CTA */}
      <Navbar />

      <main className="flex-1">
        {/* Above the fold: headline, CTC proof and the primary lead form */}
        <HeroSection />

        {/* Placement figures published for the PGDM PLUS and PGDM cohorts */}
        <PlacementHighlightsSection />

        {/* Recruiter logos and the sectors they hire into */}
        <RecruitersSection />

        {/* Third-party rankings — Times B School, IIRF, Outlook */}
        <RankingsSection />

        {/* The five PGDM specialisations */}
        <ProgramsSection />

        {/* PGDM PLUS: the SAP year and the certification stack */}
        <PgdmPlusSection />

        {/* Institute background and the Foundation of Excellence figures */}
        <FoundationSection />

        {/* Campus facilities and academic events */}
        <CampusSection />

        {/* Photo mosaic: library, labs, hostel, gym, ground */}
        <StudentLifeSection />

        {/* Academic collaboration logos */}
        <CollaborationsSection />

        {/* Student feedback */}
        <TestimonialsSection />

        {/* Eligibility, the five-step process and the admission calendar */}
        <AdmissionsSection />

        {/* Admission FAQ, also emitted as FAQPage structured data */}
        <FaqSection />

        {/* Closing CTA with the second lead form */}
        <FinalCtaSection />
      </main>

      <Footer />

      {/* Spacer so the fixed mobile bar never covers the footer disclosure */}
      <div className="h-20 lg:hidden" aria-hidden="true" />

      <WhatsAppButton />
      <MobileCtaBar />
      <LeadModal />
    </div>
  );
}

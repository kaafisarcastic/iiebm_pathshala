import { faqs } from "@/data/admissions";
import { programsOffered, specialisations } from "@/data/programs";
import { INSTITUTE, SITE_URL } from "@/lib/site";

/**
 * Schema.org graph for the landing page. Google reads the FAQPage node for
 * rich results and the CollegeOrUniversity node for the knowledge panel.
 */
export function buildStructuredData() {
  const institute = {
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/#institute`,
    name: INSTITUTE.name,
    alternateName: INSTITUTE.shortName,
    url: INSTITUTE.website,
    logo: `${SITE_URL}/brand/iiebm-logo.png`,
    foundingDate: INSTITUTE.foundedYear,
    parentOrganization: { "@type": "Organization", name: INSTITUTE.legalName },
    telephone: INSTITUTE.phone,
    email: INSTITUTE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: INSTITUTE.address,
      addressLocality: INSTITUTE.locality,
      addressRegion: INSTITUTE.region,
      postalCode: INSTITUTE.postalCode,
      addressCountry: INSTITUTE.country,
    },
  };

  const course = (
    name: string,
    description: string,
    credential: string,
  ) => ({
    "@type": "Course",
    name,
    description,
    provider: { "@id": `${SITE_URL}/#institute` },
    educationalCredentialAwarded: credential,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: "P2Y",
      location: {
        "@type": "Place",
        name: `${INSTITUTE.shortName}, ${INSTITUTE.locality}`,
        address: institute.address,
      },
    },
  });

  const courses = [
    ...programsOffered.map((program) =>
      course(
        program.name,
        program.summary,
        program.name === "MBA"
          ? "Master of Business Administration"
          : "Post Graduate Diploma in Management",
      ),
    ),
    ...specialisations.map((program) =>
      course(
        program.name,
        program.overview,
        "Post Graduate Diploma in Management",
      ),
    ),
  ];

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [institute, faqPage, ...courses],
  };
}

/**
 * Source: https://iiebm.com/about-us/testimonials/ — the Student Feedback
 * quotes, verbatim.
 *
 * Heads-up for whoever edits this next: IIEBM has these containers hidden on
 * their own site (`elementor-hidden-desktop/tablet/mobile`, so `display:none`),
 * and shows a video carousel in their place. The words are theirs and the
 * decision to surface them here is deliberate — but you cannot point a visitor
 * at them on iiebm.com, so check with the institute before quoting them
 * anywhere else.
 */

export type Testimonial = {
  quote: string;
  name: string;
  placedAt: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The PGDM + PGPERP (SAP) dual certification gave me both strategic business knowledge and hands-on SAP skills that made me stand out during placements. It opened doors to international roles and higher salary packages. I got placement at Apple with a package of 34 LPA.",
    name: "Ms. Pasham Deepa",
    placedAt: "Apple",
  },
  {
    quote:
      "I learned that leadership isn't just about strategy — it's about character, competence, and compassion. Those values continue to shape the way I lead.",
    name: "Ms. Smriti Singh",
    placedAt: "Deloitte",
  },
  {
    quote:
      "Because of IIEBM's strong industry ties, I got placed in a Fortune 500 company. The exposure through live projects, guest lectures, and networking events made me confident walking into any corporate setup.",
    name: "Ms. Rachita Jain",
    placedAt: "Veedol",
  },
  {
    quote:
      "The discipline, integrity, and resilience inspired by the Indian Armed Forces ethos prepared me to take on challenges with confidence. Even our daily 'JAI HIND' greeting built a sense of pride and purpose that still guides me today.",
    name: "Mr. Pranjal Upadhyay",
    placedAt: "Mahindra Finance",
  },
  {
    quote:
      "Studying at IIEBM helped me grow immensely. The curriculum blends theory with real-world application perfectly. I graduated feeling prepared for a tech-driven business world, not just knowledgeable on paper.",
    name: "Mr. Pranjal Mishra",
    placedAt: "Trinamix",
  },
  {
    quote:
      "My placement in the FMCG sector was made possible by the specialized certifications offered at IIEBM. That mix of academic depth and industry relevance gave me an edge during placements.",
    name: "Ms. Simran Wadhwani",
    placedAt: "Infoedge",
  },
  {
    quote:
      "The campus has a great learning vibe — smart classrooms, fully equipped computer labs and comfortable hostels with high-speed Wi-Fi. Everything you need is right here.",
    name: "Mr. Yuvraj Vashishtha",
    placedAt: "Birla Opus",
  },
  {
    quote:
      "The student-led clubs were one of my favourite parts of the experience. From the E&I Cell to the various domain clubs, these spaces helped me learn, lead and even think like an entrepreneur.",
    name: "Ms. Sanika Jadhav",
    placedAt: "Sciqus Infotech",
  },
];

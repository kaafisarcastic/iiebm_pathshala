/** Sources: the "Foundation of Excellence", "Infrastructure" and "Academic Event" sections of https://iiebm.com/ */

export type FoundationGroup = {
  title: string;
  stats: { value: string; label: string }[];
};

export const foundation: FoundationGroup[] = [
  {
    title: "Strong academic foundation",
    stats: [
      { value: "290+", label: "Years collective faculty experience" },
      { value: "120+", label: "Months average faculty experience" },
      {
        value: "50+",
        label: "Faculty student exchange collaborations with industry",
      },
      { value: "50+", label: "MDP / consultancy in the last 5 years" },
    ],
  },
  {
    title: "Practical exposure",
    stats: [
      { value: "1200+", label: "Hours of live projects and field studies" },
      { value: "1000+", label: "Hours of full-time summer internship" },
      {
        value: "1000+",
        label: "Hours of domain & sector specific training by industry experts",
      },
      { value: "250+", label: "Hours of NGO / ISR / CSR internships" },
    ],
  },
  {
    title: "Holistic development",
    stats: [
      { value: "5000+", label: "Hours of case study based training" },
      { value: "300+", label: "Hours of technical skill training" },
      { value: "400+", label: "Hours of soft skill training" },
      { value: "250+", label: "Hours of life skill training" },
    ],
  },
  {
    title: "Alumni footprints & industry connect",
    stats: [
      { value: "7500+", label: "Alumni spread across India and abroad" },
      { value: "350+", label: "Alumni working in Fortune 500 companies" },
      { value: "450+", label: "Recruiters regularly visiting campus" },
      {
        value: "600+",
        label: "CXOs and corporate leaders engaging with students annually",
      },
    ],
  },
];

export type Facility = {
  title: string;
  description: string;
  image: string;
};

export const facilities: Facility[] = [
  {
    title: "Campus",
    description: "ICT enabled campus.",
    image: "/campus/campus.webp",
  },
  {
    title: "Infra",
    description:
      "One of the largest infrastructures for a PGDM program in Maharashtra.",
    image: "/campus/lab-hall.webp",
  },
  {
    title: "Hostel",
    description:
      "On-campus 500+ hostel capacity with laundry service, vending machines, recreation areas and 24x7 internet.",
    image: "/campus/hostel.webp",
  },
  {
    title: "Auditorium",
    description:
      "A state-of-the-art auditorium with a seating capacity of over 500.",
    image: "/campus/auditorium.webp",
  },
  {
    title: "Library",
    description:
      "The Dr. B. S. Marwaha Library provides extensive books, e-journals, digital databases and audio-visual resources.",
    image: "/campus/library.webp",
  },
  {
    title: "Placement Cell",
    description:
      "Connects students with leading industries, ensuring they are career-ready.",
    image: "/campus/placement-cell.webp",
  },
];

export const INFRASTRUCTURE_INTRO =
  "The Institute offers well equipped infrastructure that fosters academic excellence and holistic development. Spacious smart classrooms, a well-stocked library, a modern boardroom and a fully equipped auditorium create a dynamic learning environment.";

export type CampusEvent = {
  title: string;
  image: string;
};

export const campusEvents: CampusEvent[] = [
  { title: "Bodhan: Corporate Series & Conclaves", image: "/events/bodhan.webp" },
  { title: "Samvad: Alumni Interaction", image: "/events/samvad.webp" },
  {
    title: "Induction – Preparing Minds & Shaping Future",
    image: "/events/induction.webp",
  },
  { title: "Clubs & Committees", image: "/events/clubs.webp" },
];

/** Verbatim from the "About IIEBM" section. */
export const ABOUT_PARAGRAPHS = [
  "IIEBM was established in the year 2000 by Col Vinod Marwaha & Shrimant Vijay Sinha Naik Nimbalkar (popularly known as Shivajiraje), a scion of the Royal Family of Phaltan, District Satara, along with Senior Officers of the Indian Armed Forces.",
  "With a legacy of 25 years in Management Education, IIEBM continues to groom future leaders using time-tested Armed Forces ethos, values and management techniques where the focus is on Discipline, Decorum, Integrity, Camaraderie and most importantly Nationalism.",
];

export const ABOUT_PILLARS = [
  "Cutting-Edge Curriculum",
  "Career-Specific Training",
  "Time-Tested Pedagogy",
  "Stellar Placement Record",
];

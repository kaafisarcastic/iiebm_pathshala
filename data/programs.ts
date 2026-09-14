/**
 * Sources:
 *   https://iiebm.com/programs/pgdm-program/
 *   https://iiebm.com/pgdm-in-marketing/ and its four sibling pages
 *   "Our 5 shades Programs" and the SAP module carousel on https://iiebm.com/
 */

export type ProgramOffering = {
  name: string;
  meta: string;
  summary: string;
  highlights: string[];
  /** Value used by the lead form's "Program of interest" field. */
  formValue: string;
};

/**
 * The three programs admissions is taking enquiries for.
 *
 * PGDM and PGDM PLUS are described on iiebm.com. The MBA entry is NOT on
 * iiebm.com — it comes from admissions copy supplied by the institute for the
 * 2026-28 intake, and their public Admission FAQ has not caught up yet.
 * Keep it in step with whatever IIEBM publishes.
 */
export const programsOffered: ProgramOffering[] = [
  {
    name: "PGDM",
    meta: "2 years · Full-time · AICTE approved",
    summary:
      "The flagship two-year management program, with dual specialisation in Entrepreneurship and one of five domains.",
    highlights: [
      "Five specialisations",
      "16-week summer internship",
      "Dual specialisation",
    ],
    formValue: "PGDM",
  },
  {
    name: "PGDM PLUS",
    meta: "PGDM + 1-year PGP-ERP (SAP)",
    summary:
      "The PGDM paired with a one-year Post Graduate Program in Enterprise Resource Planning, run with SAP University Alliances.",
    highlights: [
      "SAP Germany certification",
      "Six SAP modules",
      "Highest CTC 34 LPA",
    ],
    formValue: "PGDM PLUS (PGDM + SAP)",
  },
  {
    name: "MBA",
    meta: "Batch 2026-28 · Applications open",
    summary:
      "For aspiring management professionals, with an industry-oriented curriculum and the same placement and grooming machinery behind it.",
    highlights: [
      "Industry-oriented curriculum",
      "Corporate exposure & internships",
      "Placement assistance",
      "Holistic personality development",
    ],
    formValue: "MBA",
  },
];

export type Specialisation = {
  slug: string;
  name: string;
  /** Value used by the lead form's "Program of interest" field. */
  formValue: string;
  overview: string;
  image: string;
  electives: string[];
};

export const specialisations: Specialisation[] = [
  {
    slug: "marketing",
    name: "PGDM in Marketing",
    formValue: "PGDM in Marketing",
    overview:
      "A specialized program designed to nurture marketing professionals with a strong foundation in marketing principles, consumer behavior, brand management, and digital marketing.",
    image: "/programs/marketing.webp",
    electives: [
      "Marketing Analytics",
      "Integrated Marketing Communication",
      "E-commerce and Digital Marketing",
      "Sales & Negotiation Management",
      "Retail Management",
      "International Marketing",
    ],
  },
  {
    slug: "finance",
    name: "PGDM in Finance",
    formValue: "PGDM in Finance",
    overview:
      "Built around financial management, investment analysis, risk assessment and financial strategy, with a FinTech focus covering data analysis, blockchain and financial software tools.",
    image: "/programs/finance.webp",
    electives: [
      "Financial Analytics",
      "Financial Modeling",
      "Security Analysis & Portfolio Management",
      "Investment Banking",
      "Risk Assessment & Management",
      "Ethical and Regulatory Compliance",
    ],
  },
  {
    slug: "business-analytics",
    name: "PGDM in Business Analytics",
    formValue: "PGDM in Business Analytics",
    overview:
      "Trains professionals in data-driven decision-making, with capstone projects that address real business problems using data analysis and insights.",
    image: "/programs/business-analytics.webp",
    electives: [
      "Descriptive Statistics using R",
      "SQL for Business Analytics",
      "Data Management and Data Visualization",
      "Artificial Intelligence in Business Applications",
      "Advanced Statistical Methods using R",
      "Data Mining",
    ],
  },
  {
    slug: "human-resource",
    name: "PGDM in Human Resource",
    formValue: "PGDM in Human Resource",
    overview:
      "Develops HR professionals with a deep understanding of human capital management, organizational development and strategic HR practice, with an emphasis on diversity and inclusion.",
    image: "/programs/human-resource.webp",
    electives: [
      "HR Analytics",
      "Strategic HRM",
      "Performance Management System",
      "Management of Industrial Relations and Labour Laws",
      "Training and Development",
      "International HRM",
    ],
  },
  {
    slug: "supply-chain",
    name: "PGDM in Supply Chain Management",
    formValue: "PGDM in Supply Chain Management",
    overview:
      "Prepares students for careers in supply chain strategy, logistics, procurement and operations management, with on-job trainers building practical competency.",
    image: "/programs/supply-chain.webp",
    electives: [
      "SCM Analytics",
      "Supply Chain & Logistics Management",
      "Digital Supply Chain Management",
      "Material Management",
      "Warehouse Management",
      "International Logistics",
    ],
  },
];

export type SapModule = {
  code: string;
  name: string;
  description: string;
};

/** The six SAP modules IIEBM lists for the PGDM PLUS / PGP-ERP year. */
export const sapModules: SapModule[] = [
  {
    code: "SAP SD",
    name: "Order Fulfilment",
    description:
      "The sales and distribution of finished goods, covering sales order processing, delivery processing and billing.",
  },
  {
    code: "SAP FICO",
    name: "Financial Accounting",
    description:
      "Managing financial transactions and generating financial statements, across sub-modules like General Ledger and Asset Accounting.",
  },
  {
    code: "SAP MM",
    name: "Material Management",
    description:
      "Procurement and management of raw materials and finished goods — purchasing, inventory management and material valuation.",
  },
  {
    code: "SAP SF",
    name: "Success Factor",
    description:
      "An organization's human resources data: employee records, payroll, benefits and performance management.",
  },
  {
    code: "SAP BW",
    name: "Business Warehouse",
    description:
      "Integrates, transforms and consolidates data from SAP and external sources to support goal-oriented decision-making.",
  },
  {
    code: "SAP PP",
    name: "SCM Production Planning",
    description:
      "Optimizes production from raw materials to finished goods through planning, scheduling and resource management.",
  },
];

/** Verbatim from https://iiebm.com/admission-process/ */
export const PGDM_PLUS_OVERVIEW =
  "PGP-ERP (SAP) is a one-year Post Graduate Program in Enterprise Resource Planning by IIEBM in association with SAP University Alliances. The program contents are designed to cover all the comprehensive concepts of SAP's ERP systems which are used by its partner companies for their operations. It is tailor made for fresh graduates and working professionals looking to make a rewarding career in the SAP ecosystem.";

export const PGDM_OVERVIEW =
  "Approved by AICTE, the Ministry of HRD and Govt of India, the two-year full-time PGDM is the flagship programme of IIEBM. The program offers dual specialization in Entrepreneurship and Marketing/HRM/Finance/SCM/Business Analytics/SAP-ERP.";

/** Certification partners listed in the Admission FAQ (Q.8). */
export const certifications = [
  "Harvard Business School Online",
  "CISI – Chartered Institute of Security and Investment (UK)",
  "CRISIL – for Finance specialisation",
  "Safeducate – for Supply Chain Management",
  "SAP (Germany) Power User",
  "Massachusetts Institute of Technology, USA",
  "IBM – Big Data, Python, R Language",
  "Microsoft – Advanced Excel, MS Project, Power BI",
  "Google – Digital Marketing, SEO, Marketing Analytics",
  "Six Sigma – from IIT Kharagpur",
];

/**
 * Options offered by the lead form: the three programs first, then the PGDM
 * specialisations for anyone who already knows their domain.
 */
export const programOptions = [
  ...programsOffered.map((program) => program.formValue),
  ...specialisations.map((s) => s.formValue),
  "Not sure yet",
];

/** Source: https://iiebm.com/placement-highlights/ */

export type CtcStat = {
  value: string;
  unit: string;
  label: string;
};

/** The three headline CTC figures shown for the PGDM PLUS batch. */
export const pgdmPlusCtc: CtcStat[] = [
  { value: "34", unit: "LPA", label: "Highest CTC" },
  { value: "10.25", unit: "LPA", label: "Average CTC" },
  { value: "8.75", unit: "LPA", label: "Minimum CTC" },
];

export type PlacementStat = {
  value: string;
  suffix?: string;
  label: string;
};

/** Recruiter and offer figures published for the PGDM batch. */
export const pgdmReach: PlacementStat[] = [
  { value: "125", label: "Total number of recruiters" },
  { value: "40", label: "Maximum offers made by a single company" },
  { value: "90", suffix: "%", label: "Pre-placement offers" },
];

/** CTC distribution published for the PGDM batch. */
export const pgdmCtc: PlacementStat[] = [
  { value: "27.25", suffix: " LPA", label: "Highest CTC" },
  { value: "15.85", suffix: " LPA", label: "Top 25%ile CTC" },
  { value: "10.25", suffix: " LPA", label: "Top 50%ile CTC" },
];

/**
 * Sectors IIEBM lists under "Get Dream Jobs With IIEBM", alongside the
 * 750+ company figure from the same section.
 */
export const recruitingSectors = [
  "Financial Services",
  "FinTech",
  "Banking",
  "Consumer Durables",
  "FMCG",
  "Retail",
  "E-commerce",
  "Manufacturing",
  "IT & ITES",
  "Digital Marketing",
  "EduTech",
  "HealthTech",
];

export const RECRUITING_PARTNER_COUNT = "750+";

export type Recruiter = { name: string; file: string };

/** Logos from the "Get Dream Jobs With IIEBM" and Major Recruiters strips. */
export const recruiters: Recruiter[] = [
  { name: "Apple", file: "apple" },
  { name: "Deloitte", file: "deloitte" },
  { name: "Mercedes-Benz", file: "mercedes-benz" },
  { name: "Porsche", file: "porsche" },
  { name: "PepsiCo", file: "pepsico" },
  { name: "Coca-Cola", file: "coca-cola" },
  { name: "Nestlé", file: "nestle" },
  { name: "Britannia", file: "britannia" },
  { name: "WK Kellogg Co", file: "wk-kellogg" },
  { name: "Accenture", file: "accenture" },
  { name: "TCS", file: "tcs" },
  { name: "Infosys", file: "infosys" },
  { name: "Wipro", file: "wipro" },
  { name: "IBM", file: "ibm" },
  { name: "HCL", file: "hcl" },
  { name: "Capgemini", file: "capgemini" },
  { name: "Tata Technologies", file: "tata-technologies" },
  { name: "Seagate", file: "seagate" },
  { name: "Jio", file: "jio" },
  { name: "Lenskart", file: "lenskart" },
  { name: "Asian Paints", file: "asian-paints" },
  { name: "Birla Opus", file: "birla-opus" },
  { name: "Hindware", file: "hindware" },
  { name: "Haier", file: "haier" },
  { name: "CP Plus", file: "cp-plus" },
  { name: "Schindler", file: "schindler" },
  { name: "BNY Mellon", file: "bny-mellon" },
  { name: "Federal Bank", file: "federal-bank" },
  { name: "IDBI Bank", file: "idbi-bank" },
  { name: "Mahindra Finance", file: "mahindra-finance" },
  { name: "ABP", file: "abp" },
  { name: "Pattern", file: "pattern" },
  { name: "Trinamix", file: "trinamix" },
  { name: "Sciqus", file: "sciqus" },
];

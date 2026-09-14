/** Source: "Ranking & Recognitions" on https://iiebm.com/ */

export type Ranking = {
  rank: string;
  claim: string;
  publisher: string;
};

export const rankings: Ranking[] = [
  {
    rank: "13th",
    claim: "Among the private business schools in India",
    publisher: "Times B School",
  },
  {
    rank: "21st",
    claim: "National rank among the best business schools",
    publisher: "IIRF",
  },
  {
    rank: "10th",
    claim: "Best business school in Maharashtra",
    publisher: "IIRF",
  },
  {
    rank: "18th",
    claim: "Among the top west business schools in India",
    publisher: "Outlook",
  },
  {
    rank: "6th",
    claim: "Top 25 fastest growing business schools",
    publisher: "IIRF",
  },
  {
    rank: "6th",
    claim: "Among the top private best business schools in Pune",
    publisher: "Outlook",
  },
];

export type Collaboration = { name: string; file: string };

/** Logos from the "Academic Collaborations" strip. */
export const collaborations: Collaboration[] = [
  { name: "SAP University Alliances", file: "sap-university-alliances" },
  { name: "University of Cambridge", file: "cambridge" },
  { name: "London Business School", file: "london-business-school" },
  { name: "Google", file: "google" },
  { name: "Microsoft", file: "microsoft" },
  { name: "Meta", file: "meta" },
  { name: "IBM", file: "ibm" },
  { name: "KPMG", file: "kpmg" },
  { name: "CRISIL", file: "crisil" },
  { name: "NISM", file: "nism" },
];

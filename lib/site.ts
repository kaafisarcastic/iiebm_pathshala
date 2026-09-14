/**
 * Single place for everything that is specific to this landing page rather
 * than to the institute. Edit these values, not the components.
 */

/** Public origin of the deployed landing page. Used for canonical + OG URLs. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** The consultancy running the ads. Shown in the partner disclosure. */
export const PARTNER_NAME = "PathshalaHub";

/** The institute. Every figure on the page is sourced from iiebm.com. */
export const INSTITUTE = {
  name: "IIEBM, Indus Business School",
  shortName: "IIEBM",
  tagline: "Driven by Purpose, Defined by Excellence.",
  website: "https://iiebm.com/",
  phone: "+91 81490 93780",
  phoneHref: "+918149093780",
  email: "admissions@iiebm.com",
  address:
    "Survey No. 114/1/3, Wakad – Marunje Road, off Mumbai-Bangalore Highway, Wakad, Pune 411 057",
  locality: "Pune",
  region: "Maharashtra",
  postalCode: "411057",
  country: "IN",
  foundedYear: "2000",
  legalName:
    "Indus Institute of Entrepreneurial Business Management Trust",
} as const;

/** Intake the ads are pointed at, as published on iiebm.com. */
export const INTAKE = {
  batch: "2026-28",
  applicationsOpen: "14th September 2026",
  applicationFee: "Rs. 1200",
  commencement: "June 2027",
  deadlineNote:
    "Applications for the academic year 2026-28 will close on 15 May 2026.",
} as const;

/**
 * PathshalaHub's WhatsApp line for the floating chat button.
 *
 * Digits only, country code first, no "+" or spaces — "919876543210" — which
 * is the format wa.me expects. Fill `number` in and the button appears; leave
 * it empty and it stays hidden.
 *
 * Deliberately a literal rather than an env var: NEXT_PUBLIC_* values are
 * inlined into the client bundle at build time, so a number supplied only at
 * runtime renders on the server and then disappears on hydration.
 */
export const PARTNER_WHATSAPP: {
  number: string;
  display: string;
  greeting: string;
} = {
  number: "919792662662",
  display: "+91 97926 62662",
  greeting:
    "Hi! I'd like to know more about admissions at IIEBM, Pune for the 2026-28 batch.",
};

/** wa.me deep link with the greeting pre-filled. Empty when no number is set. */
export const WHATSAPP_LINK = PARTNER_WHATSAPP.number
  ? `https://wa.me/${PARTNER_WHATSAPP.number}?text=${encodeURIComponent(
      PARTNER_WHATSAPP.greeting,
    )}`
  : "";

/** How long a visitor browses before the lead modal offers itself, in ms. */
export const LEAD_MODAL_DELAY_MS = 15_000;

/**
 * Exit intent is ignored before this. Without a floor the modal fires the
 * first time the pointer heads for the address bar, often a second or two
 * into the visit.
 */
export const LEAD_MODAL_EXIT_INTENT_MIN_MS = 10_000;

export const ANCHORS = {
  form: "apply",
  placements: "placements",
  programs: "programs",
  campus: "campus",
  admissions: "admissions",
  faq: "faq",
} as const;

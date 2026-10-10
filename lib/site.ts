/**
 * Single place for everything that is specific to this landing page rather
 * than to the institute. Edit these values, not the components.
 */

/**
 * The path this app is served under on the shared domain.
 *
 * KEEP IN SYNC: basePath in next.config.ts must match this exactly.
 */
export const BASE_PATH = "/iiebm";

/**
 * A file in /public, prefixed for the base path.
 *
 * next/image does NOT apply basePath to `src` — documented Next.js behaviour —
 * so every image source has to come through here or it 404s under the hub.
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * An internal route, prefixed for the base path.
 *
 * Only for hand-written URLs: raw `fetch`, `window.location`, and plain
 * `<a href="/…">`. Do NOT use it with <Link>, router.push/replace, or
 * redirect() — Next.js already prefixes those, and wrapping yields /iiebm/iiebm/…
 */
export function route(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * Public origin of the shared domain, without the base path. The hub owns the
 * root; this app only ever lives beneath BASE_PATH.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://admissions.pathshalahub.com"
).replace(/\/$/, "");

/** Absolute public URL of this landing page — canonical, OG and JSON-LD. */
export const PAGE_URL = `${SITE_URL}${BASE_PATH}`;

/** The consultancy running the ads. Shown in the partner disclosure. */
export const PARTNER_NAME = "Pathshala Hub";

/**
 * Consent wording shown beside the form's required checkbox. Stored verbatim
 * alongside each lead, with the moment it was accepted, so the record shows
 * what the student actually agreed to rather than what the page says today.
 * Changing this changes future records only — never edit it to cover past ones.
 */
export const CONSENT_TEXT =
  "By submitting this form, you agree to be contacted by Pathshala Hub and the respective institution regarding admission-related information.";

/** Footer disclosure. */
export const FOOTER_DISCLOSURE = `This admission information page is managed by ${PARTNER_NAME}, an authorised admission partner of IIEBM, Indus Business School. Programme, eligibility, fee and admission information is provided by the respective institution.`;

/**
 * Exams IIEBM names in Admission FAQ Q.29. Do not add to this list without a
 * matching line on iiebm.com — it reads as a claim about what they accept.
 */
export const ACCEPTED_EXAMS = [
  "CAT",
  "XAT",
  "CMAT",
  "MAT",
  "GMAT",
  "MH-CET",
  "ATMA",
] as const;

/**
 * Exams aspirants often sit instead. IIEBM does not list these, so the page
 * points those candidates at a counsellor rather than implying acceptance.
 */
export const OTHER_EXAMS = ["NMAT", "SNAP"] as const;

/**
 * Origin the CAT tools will live on.
 *
 * They go on a SEPARATE SUBDOMAIN, so a relative "/cat-predictor" would
 * resolve against admissions.pathshalahub.com and 404. The subdomain is not
 * decided yet: while this is empty both links stay hidden rather than render
 * buttons that go nowhere. Setting this one constant turns both on.
 *
 * Example once decided: "https://tools.pathshalahub.com"
 */
export const CAT_TOOLS_ORIGIN = "";

export const TOOLS = {
  catPredictor: { label: "CAT Predictor", path: "/cat-predictor" },
  catScoreCalculator: {
    label: "CAT Score Calculator",
    path: "/cat-score-calculator",
  },
} as const;

/** Absolute URL for a CAT tool, or "" while the subdomain is undecided. */
export function toolUrl(path: string): string {
  return CAT_TOOLS_ORIGIN ? `${CAT_TOOLS_ORIGIN}${path}` : "";
}

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
  batch: "2027-28",
  applicationsOpen: "14th September 2026",
  applicationFee: "Rs. 1200",
  commencement: "June 2027",
  deadlineNote:
    "Applications for the academic year 2027-28 will close on 15 May 2027.",
} as const;

/**
 * Pathshala Hub's admissions line — the number that actually gets answered.
 *
 * Every "call us" link and the WhatsApp button come from here, so the two can
 * never drift apart. Edit the digits once, in `display`; `tel` and `whatsapp`
 * are derived from it.
 *
 * Note this is NOT INSTITUTE.phone. That one is IIEBM's own published line and
 * stays in the structured data, where it is a statement about the college.
 * Calls from this page route to the partner running the campaign.
 *
 * Deliberately a literal rather than an env var: NEXT_PUBLIC_* values are
 * inlined into the client bundle at build time, so a number supplied only at
 * runtime renders on the server and then disappears on hydration.
 */
const PARTNER_PHONE_DISPLAY = "+91 97926 62662";

/** "+91 97926 62662" -> "+919792662662" (tel:) and "919792662662" (wa.me). */
const PARTNER_PHONE_DIGITS = PARTNER_PHONE_DISPLAY.replace(/\D/g, "");

export const PARTNER_PHONE = {
  display: PARTNER_PHONE_DISPLAY,
  /** tel: href, E.164. */
  tel: `+${PARTNER_PHONE_DIGITS}`,
};

export const PARTNER_WHATSAPP: {
  number: string;
  display: string;
  greeting: string;
} = {
  /** wa.me wants digits only, no "+". */
  number: PARTNER_PHONE_DIGITS,
  display: PARTNER_PHONE_DISPLAY,
  greeting:
    "Hi! I'd like to know more about admissions at IIEBM, Pune for the 2027-28 batch.",
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

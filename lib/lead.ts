import { programOptions } from "@/data/programs";

export type Lead = {
  name: string;
  phone: string;
  email: string;
  city: string;
  program: string;
};

/** Extra context captured server-side, never filled in by the visitor. */
export type LeadRecord = Lead & {
  submittedAt: string;
  source: string;
  pageUrl: string;
  /** Google Ads click id, when the visitor arrived from a paid click. */
  gclid: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

export type LeadFieldErrors = Partial<Record<keyof Lead, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Digits only, so a pasted "+91 81490 93780" still validates. */
export function normalisePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

/**
 * "+91 98765 43210", "098765 43210" and "9876543210" all become
 * "+919876543210", so the sheet holds one dialable format.
 */
export function formatPhone(raw: string): string {
  const digits = normalisePhone(raw);
  return `+91${digits.slice(-10)}`;
}

/**
 * Validates a lead. Shared by the form and the route handler so the browser
 * and the server never disagree about what counts as a valid enquiry.
 */
export function validateLead(input: Partial<Lead>): LeadFieldErrors {
  const errors: LeadFieldErrors = {};

  const name = input.name?.trim() ?? "";
  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  const digits = normalisePhone(input.phone ?? "");
  // Indian mobile numbers are 10 digits, optionally prefixed with 91 or 091.
  if (!/^(0|91|091)?[6-9]\d{9}$/.test(digits)) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }

  const email = input.email?.trim() ?? "";
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const city = input.city?.trim() ?? "";
  if (city.length < 2) {
    errors.city = "Please enter your city.";
  }

  if (!programOptions.includes(input.program ?? "")) {
    errors.program = "Choose the program you are interested in.";
  }

  return errors;
}

export function hasErrors(errors: LeadFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const emptyLead: Lead = {
  name: "",
  phone: "",
  email: "",
  city: "",
  program: "",
};

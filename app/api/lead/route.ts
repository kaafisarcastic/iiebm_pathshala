import type { NextRequest } from "next/server";
import {
  formatPhone,
  hasErrors,
  validateLead,
  type Lead,
  type LeadRecord,
} from "@/lib/lead";
import { appendLeadToSheet } from "@/lib/integrations/sheets";
import { emailLead } from "@/lib/integrations/email";

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** IST timestamp, since the counselling team reads the sheet in local time. */
function istTimestamp(): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real visitor never sees this field, bots fill everything.
  if (str(payload.company) !== "") {
    return Response.json({ ok: true });
  }

  const lead: Lead = {
    name: str(payload.name),
    phone: str(payload.phone),
    email: str(payload.email),
    city: str(payload.city),
    program: str(payload.program),
  };

  const errors = validateLead(lead);
  if (hasErrors(errors)) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const record: LeadRecord = {
    ...lead,
    // Store one dialable format regardless of how the visitor typed it.
    phone: formatPhone(lead.phone),
    submittedAt: istTimestamp(),
    source: str(payload.source) || "unknown",
    pageUrl: str(payload.pageUrl),
    gclid: str(payload.gclid),
    utmSource: str(payload.utmSource),
    utmMedium: str(payload.utmMedium),
    utmCampaign: str(payload.utmCampaign),
    utmTerm: str(payload.utmTerm),
    utmContent: str(payload.utmContent),
  };

  // Both destinations are attempted regardless of whether the other fails —
  // a lead that reaches only the sheet is still a lead worth keeping.
  const [sheet, mail] = await Promise.allSettled([
    appendLeadToSheet(record),
    emailLead(record),
  ]);

  if (sheet.status === "rejected") {
    console.error("[lead] sheet append failed", sheet.reason);
  }
  if (mail.status === "rejected") {
    console.error("[lead] email notification failed", mail.reason);
  }

  if (sheet.status === "rejected" && mail.status === "rejected") {
    // Nothing was recorded anywhere. Say so, so the form can offer the phone number.
    return Response.json(
      {
        ok: false,
        message:
          "We could not record your enquiry just now. Please call us instead — we will pick up.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

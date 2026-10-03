import type { NextRequest } from "next/server";
import {
  formatPhone,
  hasErrors,
  validateLead,
  type Lead,
  type LeadRecord,
} from "@/lib/lead";
import { appendLeadToSheet } from "@/lib/integrations/sheets";
import { emailStudent, emailTeam } from "@/lib/integrations/email";
import { CONSENT_TEXT } from "@/lib/site";

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

/**
 * Caller IP for the consent record. Behind Vercel or any proxy the socket
 * address is the proxy, so the forwarded headers are what count — the first
 * entry in x-forwarded-for is the original client.
 */
function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() ?? "";
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json(
      { ok: false, message: "Malformed request." },
      { status: 400 },
    );
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
    consentGiven: payload.consentGiven === true,
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
    // The server owns the consent record. Taking the text or the time from the
    // request would let a crafted POST claim consent to wording we never showed.
    consentText: CONSENT_TEXT,
    consentTimestamp: new Date().toISOString(),
    ipAddress: clientIp(request),
    userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? "",
  };

  // All three are attempted regardless of whether the others fail — a lead
  // that reaches only the sheet is still a lead worth keeping.
  const [sheet, team, student] = await Promise.allSettled([
    appendLeadToSheet(record),
    emailTeam(record),
    emailStudent(record),
  ]);

  if (sheet.status === "rejected") {
    console.error("[lead] sheet append failed", sheet.reason);
  }
  if (team.status === "rejected") {
    console.error("[lead] team notification failed", team.reason);
  }
  if (student.status === "rejected") {
    // Not fatal: the enquiry is recorded, the student just lacks a receipt.
    console.error("[lead] student acknowledgement failed", student.reason);
  }

  if (sheet.status === "rejected" && team.status === "rejected") {
    // Nothing reached the team. Say so, so the form can offer the phone number.
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

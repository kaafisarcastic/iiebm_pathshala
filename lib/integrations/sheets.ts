import type { LeadRecord } from "@/lib/lead";

/**
 * Column order for the sheet. The headers go up with the first lead, which is
 * also when the script creates the tab — so this array and `toRow` below must
 * stay in lockstep, or every later row lands under the wrong heading.
 */
const HEADERS = [
  "Submitted at",
  "Name",
  "Phone",
  "Email",
  "City",
  "Programme",
  "Form",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "Page URL",
  "Consent Given",
  "Consent Text",
  "Consent Timestamp (UTC)",
  "IP Address",
  "User Agent",
] as const;

function toRow(lead: LeadRecord): string[] {
  return [
    lead.submittedAt,
    lead.name,
    lead.phone,
    lead.email,
    lead.city,
    lead.program,
    lead.source,
    lead.utmSource,
    lead.utmMedium,
    lead.utmCampaign,
    lead.utmTerm,
    lead.utmContent,
    lead.gclid,
    lead.pageUrl,
    lead.consentGiven ? "Yes" : "No",
    lead.consentText,
    lead.consentTimestamp,
    lead.ipAddress,
    lead.userAgent,
  ];
}

/**
 * Appends a lead to the Google Sheet.
 *
 * The sheet is fronted by an Apps Script web app (apps-script/lead-webhook.gs),
 * so this is a single POST — no Google client library, no service account.
 * The script creates the tab and writes the header row on the first lead.
 */
export async function appendLeadToSheet(lead: LeadRecord): Promise<void> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!url) {
    throw new Error("GOOGLE_SHEET_WEBHOOK_URL is not set");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEET_SECRET ?? "",
      tab: process.env.GOOGLE_SHEET_TAB?.trim() || "Leads",
      headers: HEADERS,
      row: toRow(lead),
    }),
    // Apps Script answers with a 302 to script.googleusercontent.com.
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Sheets webhook responded ${response.status}: ${(await response.text()).slice(0, 200)}`,
    );
  }

  // The script replies with bare text: "ok", "forbidden" or "bad request".
  const body = (await response.text()).trim();
  if (body !== "ok") {
    throw new Error(`Sheets webhook rejected the lead: ${body.slice(0, 200)}`);
  }
}

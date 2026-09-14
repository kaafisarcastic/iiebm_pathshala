import type { LeadRecord } from "@/lib/lead";

/**
 * Appends a lead to the Google Sheet.
 *
 * The sheet is fronted by an Apps Script Web App (see docs/google-sheet.md),
 * so this is a single POST with no Google client library or service account.
 */
export async function appendLeadToSheet(lead: LeadRecord): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;

  if (!url) {
    throw new Error("SHEETS_WEBHOOK_URL is not set");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.SHEETS_WEBHOOK_SECRET ?? "",
      lead,
    }),
    // Apps Script answers the POST with a 302 to script.googleusercontent.com.
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Sheets webhook responded ${response.status}: ${await response.text()}`,
    );
  }

  const body = await response.text();

  let parsed: { ok?: boolean; error?: string };
  try {
    parsed = JSON.parse(body) as { ok?: boolean; error?: string };
  } catch {
    // Apps Script returns an HTML error page when the deployment is stale.
    throw new Error(`Sheets webhook returned non-JSON: ${body.slice(0, 200)}`);
  }

  if (parsed.ok !== true) {
    throw new Error(
      `Sheets webhook rejected the lead: ${parsed.error ?? body.slice(0, 200)}`,
    );
  }
}

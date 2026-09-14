import { Resend } from "resend";
import type { LeadRecord } from "@/lib/lead";
import { INSTITUTE } from "@/lib/site";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#5a6472;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#101828;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildHtml(lead: LeadRecord): string {
  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#003fa3;font-weight:700;">New admission enquiry</p>
  <h1 style="margin:0 0 20px;font-size:22px;color:#101828;">${escapeHtml(lead.name)} &mdash; ${escapeHtml(lead.program)}</h1>
  <table style="border-collapse:collapse;width:100%;">
    ${row("Phone", lead.phone)}
    ${row("Email", lead.email)}
    ${row("City", lead.city)}
    ${row("Program", lead.program)}
    ${row("Submitted", lead.submittedAt)}
    ${row("Form", lead.source)}
    ${row("Page", lead.pageUrl)}
    ${row("GCLID", lead.gclid)}
    ${row("utm_source", lead.utmSource)}
    ${row("utm_medium", lead.utmMedium)}
    ${row("utm_campaign", lead.utmCampaign)}
    ${row("utm_term", lead.utmTerm)}
    ${row("utm_content", lead.utmContent)}
  </table>
  <p style="margin:24px 0 0;font-size:12px;color:#5a6472;">
    Call back within the hour &mdash; paid-search leads go cold fast.
  </p>
</div>`;
}

function buildText(lead: LeadRecord): string {
  return [
    `New admission enquiry — ${INSTITUTE.shortName}`,
    ``,
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email}`,
    `City:     ${lead.city}`,
    `Program:  ${lead.program}`,
    ``,
    `Submitted: ${lead.submittedAt}`,
    `Form:      ${lead.source}`,
    `Page:      ${lead.pageUrl}`,
    lead.gclid ? `GCLID:     ${lead.gclid}` : "",
    lead.utmCampaign ? `Campaign:  ${lead.utmCampaign}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Emails the counselling team a single lead. */
export async function emailLead(lead: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = (process.env.LEAD_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  if (!from) throw new Error("LEAD_FROM_EMAIL is not set");
  if (to.length === 0) throw new Error("LEAD_NOTIFY_EMAILS is not set");

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `New PGDM enquiry — ${lead.name}, ${lead.city} (${lead.program})`,
    html: buildHtml(lead),
    text: buildText(lead),
  });

  if (error) {
    throw new Error(`Resend rejected the email: ${error.message}`);
  }
}

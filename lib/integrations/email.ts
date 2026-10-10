import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { LeadRecord } from "@/lib/lead";
import {
  INSTITUTE,
  INTAKE,
  PARTNER_NAME,
  PARTNER_PHONE,
  SITE_URL,
  asset,
} from "@/lib/site";

/**
 * Mail clients need an absolute URL. The 440×152 file is shown at 220px wide
 * so it stays sharp on retina screens.
 */
const LOGO_URL = `${SITE_URL}${asset("/brand/iiebm-logo.png")}`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * One transport per process. Nodemailer pools the connection, so the mailbox
 * is not re-authenticated for every lead.
 */
let cached: Transporter | null = null;

function transport(): Transporter {
  if (cached) return cached;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) throw new Error("SMTP_HOST is not set");
  if (!user) throw new Error("SMTP_USER is not set");
  if (!pass) throw new Error("SMTP_PASS is not set");

  cached = nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 starts plain and upgrades via STARTTLS.
    secure: port === 465,
    auth: { user, pass },
    pool: true,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return cached;
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#5a6472;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#101828;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
  </tr>`;
}

/** The internal notification: everything the counsellor needs to call back. */
function teamHtml(lead: LeadRecord): string {
  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:600px;">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#003fa3;font-weight:700;">New Admission Enquiry</p>
  <h1 style="margin:0 0 20px;font-size:22px;color:#101828;">${escapeHtml(lead.name)} &mdash; ${escapeHtml(lead.program)}</h1>
  <table style="border-collapse:collapse;width:100%;">
    ${row("Phone", lead.phone)}
    ${row("Email", lead.email)}
    ${row("City", lead.city)}
    ${row("Programme", lead.program)}
    ${row("Submitted", lead.submittedAt)}
    ${row("Form", lead.source)}
    ${row("Page", lead.pageUrl)}
    ${row("GCLID", lead.gclid)}
    ${row("utm_source", lead.utmSource)}
    ${row("utm_medium", lead.utmMedium)}
    ${row("utm_campaign", lead.utmCampaign)}
    ${row("utm_term", lead.utmTerm)}
    ${row("utm_content", lead.utmContent)}
    ${row("Consent", lead.consentGiven ? "Yes" : "No")}
    ${row("Consent At (UTC)", lead.consentTimestamp)}
    ${row("IP Address", lead.ipAddress)}
    ${row("User Agent", lead.userAgent)}
  </table>
  <p style="margin:20px 0 0;padding:12px 14px;background:#f6f9fd;border-radius:8px;font-size:12px;line-height:1.6;color:#5a6472;">
    <strong style="color:#101828;">Consent recorded:</strong><br>${escapeHtml(lead.consentText)}
  </p>
  <p style="margin:18px 0 0;font-size:12px;color:#5a6472;">
    Call back within the hour &mdash; paid-search leads go cold fast.
  </p>
</div>`;
}

function teamText(lead: LeadRecord): string {
  return [
    `New admission enquiry — ${INSTITUTE.shortName}`,
    ``,
    `Name:      ${lead.name}`,
    `Phone:     ${lead.phone}`,
    `Email:     ${lead.email}`,
    `City:      ${lead.city}`,
    `Programme: ${lead.program}`,
    ``,
    `Submitted: ${lead.submittedAt}`,
    `Form:      ${lead.source}`,
    `Page:      ${lead.pageUrl}`,
    lead.gclid ? `GCLID:     ${lead.gclid}` : "",
    lead.utmCampaign ? `Campaign:  ${lead.utmCampaign}` : "",
    ``,
    `Consent:   ${lead.consentGiven ? "Yes" : "No"} at ${lead.consentTimestamp}`,
    `IP:        ${lead.ipAddress}`,
    `Agent:     ${lead.userAgent}`,
    ``,
    lead.consentText,
  ]
    .filter(Boolean)
    .join("\n");
}

/** The student's acknowledgement. */
function studentHtml(lead: LeadRecord): string {
  const firstName = lead.name.trim().split(/\s+/)[0];

  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:600px;color:#101828;">
  <div style="padding:0 0 20px;">
    <img src="${LOGO_URL}" width="220" height="76" alt="${escapeHtml(`${INSTITUTE.shortName} — ${INSTITUTE.name}`)}" style="display:block;border:0;outline:none;text-decoration:none;width:220px;max-width:100%;height:auto;">
  </div>
  <div style="background:#003fa3;border-radius:12px;padding:28px 24px;color:#ffffff;">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.75);font-weight:700;">Batch ${escapeHtml(INTAKE.batch)}</p>
    <h1 style="margin:0;font-size:24px;line-height:1.25;">Thank You, ${escapeHtml(firstName)}</h1>
    <p style="margin:12px 0 0;font-size:15px;line-height:1.65;color:rgba(255,255,255,.88);">
      We have your enquiry about <strong>${escapeHtml(lead.program)}</strong> at ${escapeHtml(INSTITUTE.name)}, Pune. An admissions counsellor will call you shortly.
    </p>
  </div>

  <h2 style="margin:28px 0 12px;font-size:16px;">What Happens Next</h2>
  <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.75;color:#5a6472;">
    <li>A counsellor calls you, usually the same day, from a Pune number.</li>
    <li>We check your eligibility against your graduation percentage and entrance score (CAT, XAT, CMAT, MAT, NMAT or SNAP).</li>
    <li>You receive the prospectus with fees, hostel details and the documents needed at admission.</li>
  </ol>

  <h2 style="margin:28px 0 12px;font-size:16px;">Your Details</h2>
  <table style="border-collapse:collapse;">
    ${row("Name", lead.name)}
    ${row("Phone", lead.phone)}
    ${row("Email", lead.email)}
    ${row("City", lead.city)}
    ${row("Programme", lead.program)}
  </table>
  <p style="margin:12px 0 0;font-size:13px;color:#5a6472;">
    Something wrong above? Just reply to this email and we will correct it.
  </p>

  <p style="margin:28px 0 0;font-size:14px;">
    Can't wait? Call <a href="tel:${PARTNER_PHONE.tel}" style="color:#003fa3;font-weight:600;text-decoration:none;">${escapeHtml(PARTNER_PHONE.display)}</a>.
  </p>

  <hr style="margin:28px 0 0;border:0;border-top:1px solid #e5eaf2;">
  <p style="margin:16px 0 0;font-size:11px;line-height:1.7;color:#8a93a0;">
    You are receiving this because you submitted an admission enquiry on our landing page and accepted the following:<br>
    &ldquo;${escapeHtml(lead.consentText)}&rdquo;<br>
    Recorded ${escapeHtml(lead.consentTimestamp)}.
  </p>
  <p style="margin:10px 0 0;font-size:11px;line-height:1.7;color:#8a93a0;">
    This page is managed by ${escapeHtml(PARTNER_NAME)}, an authorised admission partner of ${escapeHtml(INSTITUTE.name)}.
  </p>
</div>`;
}

function studentText(lead: LeadRecord): string {
  const firstName = lead.name.trim().split(/\s+/)[0];
  return [
    `Thank you, ${firstName}`,
    ``,
    `We have your enquiry about ${lead.program} at ${INSTITUTE.name}, Pune.`,
    `An admissions counsellor will call you shortly.`,
    ``,
    `What happens next`,
    `1. A counsellor calls you, usually the same day, from a Pune number.`,
    `2. We check your eligibility against your graduation percentage and entrance`,
    `   score (CAT, XAT, CMAT, MAT, NMAT or SNAP).`,
    `3. You receive the prospectus with fees, hostel details and documents needed.`,
    ``,
    `Your details`,
    `Name:      ${lead.name}`,
    `Phone:     ${lead.phone}`,
    `Email:     ${lead.email}`,
    `City:      ${lead.city}`,
    `Programme: ${lead.program}`,
    ``,
    `Something wrong? Reply to this email and we will correct it.`,
    `Can't wait? Call ${PARTNER_PHONE.display}.`,
    ``,
    `--`,
    `You accepted: ${lead.consentText}`,
    `Recorded ${lead.consentTimestamp}.`,
    `This page is managed by ${PARTNER_NAME}, an authorised admission partner of ${INSTITUTE.name}.`,
  ].join("\n");
}

function sender(): string {
  const user = process.env.SMTP_USER ?? "";
  // SiteGround rejects a From that is not the authenticated mailbox, so the
  // display name is decoration over SMTP_USER rather than a separate address.
  return `"${INSTITUTE.shortName} Admissions" <${user}>`;
}

/** Emails the counselling team. Throws so the caller can log and carry on. */
export async function emailTeam(lead: LeadRecord): Promise<void> {
  const to = (process.env.LEAD_EMAIL_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (to.length === 0) throw new Error("LEAD_EMAIL_TO is not set");

  await transport().sendMail({
    from: sender(),
    to,
    replyTo: lead.email,
    subject: `New ${lead.program} Enquiry — ${lead.name}, ${lead.city}`,
    html: teamHtml(lead),
    text: teamText(lead),
  });
}

/** Emails the student their acknowledgement. */
export async function emailStudent(lead: LeadRecord): Promise<void> {
  await transport().sendMail({
    from: sender(),
    to: lead.email,
    replyTo: process.env.LEAD_EMAIL_TO?.split(",")[0]?.trim() || undefined,
    subject: `We Have Your Enquiry — ${INSTITUTE.shortName} Admissions ${INTAKE.batch}`,
    html: studentHtml(lead),
    text: studentText(lead),
  });
}

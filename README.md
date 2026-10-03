# IIEBM PGDM admissions landing page

A single-page Google Ads landing page for the PGDM and PGDM PLUS programs at
IIEBM, Indus Business School, Pune, operated by PathshalaHub as an authorised
admissions partner.

Every figure, quote, ranking, logo and photograph on the page is taken from
[iiebm.com](https://iiebm.com/), with one exception noted below.

## Two things to verify before the ads run

1. **The MBA.** `programsOffered` in `data/programs.ts` lists an MBA for the
   2026-28 intake, from admissions copy the institute supplied. It is **not**
   on iiebm.com, and their public Admission FAQ (Q.1) still reads *"there is no
   MBA program"*. Get that FAQ updated — Google checks a landing page against
   the advertiser's own site.
2. **The testimonials.** All eight in `data/testimonials.ts` are verbatim from
   `iiebm.com/about-us/testimonials/`, but IIEBM has switched those containers
   off — each sits inside `elementor-hidden-desktop elementor-hidden-tablet
   elementor-hidden-mobile`, so no visitor on any device sees them. What is
   visible there instead is a carousel of 14 videos on IIEBM's YouTube channel.
   Kept on this page by decision; worth getting IIEBM to un-hide them so the
   quotes are verifiable on their own site.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin. Drives canonical, OG and sitemap URLs. |
| `GOOGLE_SHEET_WEBHOOK_URL` | Apps Script `/exec` URL that appends leads to the sheet. |
| `GOOGLE_SHEET_SECRET` | Shared token; must match `SECRET` in the Apps Script. |
| `GOOGLE_SHEET_TAB` | Tab for this landing page. Created with its header row on the first lead. Defaults to `Leads`. |
| `SMTP_HOST` / `SMTP_PORT` | Mailbox host; 465 for SSL/TLS, 587 for STARTTLS. |
| `SMTP_USER` / `SMTP_PASS` | Full mailbox address and password. Mail is sent from `SMTP_USER`. |
| `LEAD_EMAIL_TO` | Comma-separated counsellors who receive every lead. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag, e.g. `AW-1234567890`. Blank disables gtag. |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Conversion label fired on `/thank-you`. |

Both Ads variables are needed: the ID loads gtag, the label identifies the
conversion. `NEXT_PUBLIC_*` values are inlined into the client bundle **at
build time**, so they must be present for `next build`, not just for the
running process. A value supplied only at runtime renders on the server and
then disappears when React hydrates.

## Floating WhatsApp button

The number lives in `PARTNER_WHATSAPP` in `lib/site.ts`, not in the
environment, for exactly the build-time reason above. Digits only with the
country code and no `+`. Empty hides the button. The label reads "Talk to an
admission counsellor" and expands whenever the reader stops scrolling.

## Google Sheet setup

`apps-script/lead-webhook.gs` receives the leads. Paste it into the sheet's
Apps Script editor, set `SECRET`, deploy as a Web App (execute as **Me**,
access **Anyone**), and put the `/exec` URL in `GOOGLE_SHEET_WEBHOOK_URL`. The
tab named by `GOOGLE_SHEET_TAB` and its header row are created on the first
lead, so one script can serve several landing pages.

Columns, in order: Submitted at, Name, Phone, Email, City, Programme, Form,
utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, Page URL,
Consent Given, Consent Text, Consent Timestamp (UTC), IP Address, User Agent.
`HEADERS` and `toRow` in `lib/integrations/sheets.ts` must stay in lockstep —
the headers go up once, with the first lead, so a later mismatch silently files
every row under the wrong column.

## Consent

The form cannot be submitted until the consent box is ticked, and
`validateLead` rejects a lead without it server-side too — the disabled button
is the courtesy, the server check is the rule. Each lead stores the consent
wording shown at the time (`CONSENT_TEXT` in `lib/site.ts`), a UTC timestamp,
the IP from `x-forwarded-for`, and the user agent. All four are set on the
server: taking them from the request would let a crafted POST claim consent to
wording that was never displayed. Editing `CONSENT_TEXT` changes future records
only, which is the point — never edit it to cover past ones.

## Lead flow

1. A visitor submits either lead form (hero, closing CTA or the 15-second
   popup). Campaign parameters — `gclid` and the five `utm_*` values — are read
   from the URL on landing and kept in `sessionStorage`, so a lead submitted
   from the popup ten minutes later is still attributed.
2. `POST /api/lead` validates the payload with the same rules the browser used,
   drops honeypot submissions, and normalises the phone to `+91XXXXXXXXXX`.
3. Three things are attempted in parallel: the sheet append, the team email and
   the student's acknowledgement. The lead is accepted if the sheet **or** the
   team email lands; only if both fail does the form tell the visitor to call
   instead. A failed student acknowledgement is logged but never fails the
   lead — the enquiry is recorded, the student just lacks a receipt.
4. The browser is sent to `/thank-you`, which fires the Google Ads conversion
   and is `noindex`.

## Layout

```
app/
  page.tsx              the landing page, one component per section
  thank-you/page.tsx    conversion page (noindex)
  api/lead/route.ts     validation + fan-out to Sheets and Resend
  layout.tsx            Poppins, metadata, gtag
  sitemap.ts robots.ts
components/
  sections/             one file per page section
  form/                 LeadForm, LeadModal (15s + exit intent)
  ui/                   Section, SectionHeading, CtaButton, LogoMarquee, MobileCtaBar
  analytics/            GoogleTag, ConversionEvent
data/                   the content scraped from iiebm.com, typed
lib/
  site.ts               brand, contact and intake constants
  lead.ts               shared validation
  structured-data.ts    schema.org graph
  integrations/         sheets.ts (Apps Script webhook), email.ts (SMTP)
public/                 logos and photographs from iiebm.com
apps-script/            the Google Sheets webhook
```

## Design

Tokens in `app/globals.css` mirror iiebm.com: `#003FA3` primary blue, the
`#253A73` navy from their placement cards, Poppins, and a 12px card radius — so
a student arriving from an ad does not feel handed to a third party.

Type is one scale, defined once in `app/globals.css` and used through the
`.type-*` classes, so a heading is the same size in every section:

| Class | mobile | ≥640px | ≥1024px |
| --- | --- | --- | --- |
| `.type-h1` | 32px | 40px | 48px |
| `.type-h2` | 26px | 32px | 36px |
| `.type-h3` | 18px | 20px | 20px |
| `.type-h4` | 16px | 16px | 16px |
| `.type-lead` | 16px | 18px | 18px |
| `.type-body` | 15px | 15px | 15px |
| `.type-small` | 13px | 13px | 13px |
| `.type-eyebrow` | 12px | 12px | 12px |

Sizes step at 640px and 1024px only — the same two breakpoints the layouts use.
Reach for a `.type-*` class rather than a one-off `text-lg`, or the scale drifts
apart again.

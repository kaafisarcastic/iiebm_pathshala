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
| `SHEETS_WEBHOOK_URL` | Apps Script `/exec` URL that appends leads to the sheet. |
| `SHEETS_WEBHOOK_SECRET` | Shared token; must match `SECRET` in the Apps Script. |
| `RESEND_API_KEY` | Resend API key for the lead notification email. |
| `LEAD_FROM_EMAIL` | Sender, on a domain verified in Resend. |
| `LEAD_NOTIFY_EMAILS` | Comma-separated counsellors who receive every lead. |
| `NEXT_PUBLIC_GTAG_ID` | Google Ads tag, e.g. `AW-1234567890`. Blank disables gtag. |
| `NEXT_PUBLIC_ADS_CONVERSION_LABEL` | Conversion label fired on `/thank-you`. |

`NEXT_PUBLIC_*` values are inlined into the client bundle **at build time**, so
they must be present for `next build`, not just for the running process. A
value supplied only at runtime renders on the server and then disappears when
React hydrates.

## Floating WhatsApp button

The number lives in `PARTNER_WHATSAPP` in `lib/site.ts`, not in the environment,
for exactly the build-time reason above. Set `number` to digits only with the
country code and no `+` — `919876543210`. Empty hides the button. It appears on
the landing page (lifted clear of the mobile call/apply bar) and on
`/thank-you`, and opens a chat pre-filled with an admissions greeting.

## Google Sheet setup

`docs/google-sheet.gs` holds the Apps Script that receives leads. Paste it into
the sheet's Apps Script editor, set `SECRET`, deploy it as a Web App
(execute as **Me**, access **Anyone**), and put the `/exec` URL into
`SHEETS_WEBHOOK_URL`. The script creates the `Leads` tab and its header row on
the first write. Re-deploy a **new version** after editing the script.

## Lead flow

1. A visitor submits either lead form (hero, closing CTA or the 15-second
   popup). Campaign parameters — `gclid` and the five `utm_*` values — are read
   from the URL on landing and kept in `sessionStorage`, so a lead submitted
   from the popup ten minutes later is still attributed.
2. `POST /api/lead` validates the payload with the same rules the browser used,
   drops honeypot submissions, and normalises the phone to `+91XXXXXXXXXX`.
3. The sheet append and the Resend email are attempted in parallel. If either
   succeeds the lead is accepted; only if **both** fail does the form tell the
   visitor to call instead.
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
  integrations/         sheets.ts, email.ts
public/                 logos and photographs from iiebm.com
docs/google-sheet.gs    the Apps Script
```

## Design

Tokens in `app/globals.css` mirror iiebm.com: `#003FA3` primary blue, the
`#253A73` navy from their placement cards, Poppins, and a 12px card radius — so
a student arriving from an ad does not feel handed to a third party.

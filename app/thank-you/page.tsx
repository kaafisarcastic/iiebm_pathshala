import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConversionEvent } from "@/components/analytics/ConversionEvent";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { admissionSteps } from "@/data/admissions";
import { INSTITUTE, INTAKE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you — your enquiry is in",
  description:
    "Your admission enquiry has been received. An IIEBM admissions counsellor will call you back.",
  // A conversion page has no business in search results.
  robots: { index: false, follow: false },
};

const whatHappensNext = [
  {
    title: "A counsellor calls you",
    detail:
      "Usually the same day, from an Indian mobile number. Keep an eye out for a call from Pune.",
  },
  {
    title: "We check your eligibility",
    detail:
      "Your graduation percentage and entrance score decide which specialisations are open to you.",
  },
  {
    title: "You get the prospectus",
    detail:
      "Fee structure, hostel details and the documents you will need at admission — sent over email.",
  },
];

export default async function ThankYouPage({
  searchParams,
}: PageProps<"/thank-you">) {
  const { program } = await searchParams;
  const interest = typeof program === "string" ? program : "";

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <ConversionEvent />

      <main className="flex-1">
        <section className="border-b border-line bg-brand text-white">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-6 lg:py-24">
            <Image
              src="/brand/iiebm-logo.png"
              alt={`${INSTITUTE.name} logo`}
              width={220}
              height={76}
              priority
              className="mx-auto h-10 w-auto rounded-brand bg-white px-3 py-2"
            />

            <span className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/30">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              Thank you — your enquiry is in
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-white/85">
              {interest
                ? `We have your interest in ${interest} noted for the ${INTAKE.batch} batch. `
                : `We have your enquiry for the ${INTAKE.batch} batch. `}
              An admissions counsellor will call you back shortly.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${INSTITUTE.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-brand bg-white px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-tint"
              >
                Call {INSTITUTE.phone}
              </a>
              <Link
                href="/"
                className="inline-flex items-center rounded-brand border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Back to the programme
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            What happens next
          </h2>

          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {whatHappensNext.map((step, index) => (
              <li
                key={step.title}
                className="rounded-brand-lg border border-line bg-white p-6"
              >
                <span className="text-sm font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-brand-lg bg-canvas-alt p-6 sm:p-8">
            <h3 className="text-base font-semibold">
              Keep these ready for the call
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {admissionSteps[2].detail}
            </p>
          </div>
        </section>
      </main>

      <WhatsAppButton aboveMobileBar={false} />
      <Footer />
    </div>
  );
}

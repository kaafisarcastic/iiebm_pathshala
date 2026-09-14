import Image from "next/image";
import { LeadForm } from "@/components/form/LeadForm";
import { pgdmPlusCtc } from "@/data/placements";
import { ANCHORS, INSTITUTE, INTAKE } from "@/lib/site";

const proofPoints = [
  "Admissions open for PGDM, PGDM PLUS (SAP) and MBA",
  "AICTE approved 2-year full-time PGDM",
  "25 years of management education",
  "Ranked 10th best B-school in Maharashtra — IIRF",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <Image
        src="/campus/aerial-campus.webp"
        alt="Aerial view of the IIEBM Indus Business School campus in Wakad, Pune"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/*
        Two layers: an even wash that keeps every part of the photo dark enough
        for white text, plus a left-weighted brand gradient behind the headline.
        The campus stays clearly visible on the right.
      */}
      <div className="absolute inset-0 -z-10 bg-ink/45" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand via-brand/80 to-brand/10"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_minmax(0,26rem)] lg:gap-12 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide ring-1 ring-inset ring-white/25">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            Admissions open · Batch {INTAKE.batch}
          </p>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.35rem]">
            The first campus in India to introduce the PGDM PLUS course
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            A two-year AICTE approved PGDM from {INSTITUTE.name}, Pune — paired
            with SAP certification through SAP University Alliances, and a
            placement cell that put this batch&apos;s highest offer at 34 LPA.
          </p>

          <ul className="mt-7 flex flex-col gap-2.5">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/90">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 shrink-0 text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10.5l4 4 8-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <dl className="mt-9 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-brand bg-white/20">
            {pgdmPlusCtc.map((stat) => (
              <div
                key={stat.label}
                // min-w-0 stops the unbreakable "10.25 LPA" from widening the
                // grid track and pushing the whole page into a sideways scroll.
                className="flex min-w-0 flex-col-reverse bg-brand-dark/70 px-3 py-4 backdrop-blur-sm sm:px-4"
              >
                <dt className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/70 sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="text-xl font-semibold sm:text-2xl lg:text-3xl">
                  {stat.value}
                  <span className="ml-1 text-xs font-medium text-white/70">
                    {stat.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          id={ANCHORS.form}
          className="scroll-mt-28 rounded-brand-lg bg-white p-6 text-ink shadow-xl shadow-brand-dark/20 sm:p-7"
        >
          <h2 className="text-xl font-semibold leading-snug">
            Check your eligibility in one call
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Tell us where you are and a counsellor will call you back the same
            day.
          </p>

          <div className="mt-5">
            <LeadForm idPrefix="hero" source="hero-form" />
          </div>
        </div>
      </div>
    </section>
  );
}

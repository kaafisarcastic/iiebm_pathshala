import Image from "next/image";
import { LeadForm } from "@/components/form/LeadForm";
import { INSTITUTE, INTAKE, PARTNER_PHONE, asset } from "@/lib/site";

export function FinalCtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <Image
        src={asset("/campus/campus.webp")}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Same scrim recipe as the hero, so both photo bands read alike. */}
      <div className="absolute inset-0 -z-10 bg-ink/50" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand via-brand/85 to-brand/20"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-14 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="type-eyebrow text-white/70">
            Batch {INTAKE.batch}
          </p>
          <h2 className="type-h2 mt-3 text-balance">
            Seats At IIEBM Rarely Last Until The Deadline
          </h2>
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-white/85">
            {INTAKE.deadlineNote} Applications opened on{" "}
            {INTAKE.applicationsOpen} and the programme commences in{" "}
            {INTAKE.commencement}. Get your eligibility checked now rather than
            in May.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <a
              href={`tel:${PARTNER_PHONE.tel}`}
              className="font-semibold underline-offset-4 hover:underline"
            >
              {PARTNER_PHONE.display}
            </a>
            <a
              href={`mailto:${INSTITUTE.email}`}
              className="text-white/80 underline-offset-4 hover:underline"
            >
              {INSTITUTE.email}
            </a>
          </div>
        </div>

        <div className="rounded-brand-lg bg-white p-6 text-ink shadow-xl shadow-brand-dark/25 sm:p-7">
          <h3 className="type-h3">
            Request Your Callback
          </h3>
          <p className="type-body mt-1.5 text-muted">
            Same-day callback from an admissions counsellor.
          </p>
          <div className="mt-5">
            <LeadForm idPrefix="footer" source="final-cta" />
          </div>
        </div>
      </div>
    </section>
  );
}

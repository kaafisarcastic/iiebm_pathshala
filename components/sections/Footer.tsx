import Image from "next/image";
import { INSTITUTE, PARTNER_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Image
            src="/brand/iiebm-logo.png"
            alt={`${INSTITUTE.name} logo`}
            width={220}
            height={76}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {INSTITUTE.address}
          </p>
        </div>

        <dl className="flex flex-col gap-3 text-sm lg:text-right">
          <div>
            <dt className="sr-only">Phone</dt>
            <dd>
              <a
                href={`tel:${INSTITUTE.phoneHref}`}
                className="font-semibold text-brand"
              >
                {INSTITUTE.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Email</dt>
            <dd>
              <a href={`mailto:${INSTITUTE.email}`} className="text-muted">
                {INSTITUTE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Website</dt>
            <dd>
              <a
                href={INSTITUTE.website}
                className="text-muted underline-offset-4 hover:underline"
                rel="noopener"
              >
                iiebm.com
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-muted">
            This page is operated by {PARTNER_NAME} as an authorised admissions
            partner of {INSTITUTE.name}, Pune. Enquiries submitted here are
            shared with the institute&apos;s admissions team. All programme,
            placement and ranking information is published by{" "}
            {INSTITUTE.shortName} on{" "}
            <a
              href={INSTITUTE.website}
              className="underline underline-offset-2"
              rel="noopener"
            >
              iiebm.com
            </a>
            . {INSTITUTE.shortName} is an institute under the{" "}
            {INSTITUTE.legalName}. Logos and trademarks belong to their
            respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

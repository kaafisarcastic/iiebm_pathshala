import Image from "next/image";
import { FOOTER_DISCLOSURE, INSTITUTE, asset } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Image
            src={asset("/brand/iiebm-logo.png")}
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
          <p className="type-small text-muted">{FOOTER_DISCLOSURE}</p>
          <p className="type-small mt-3 text-muted">
            Copyright &copy; {INSTITUTE.name}. {INSTITUTE.shortName} is an
            institute under the {INSTITUTE.legalName}. Logos and trademarks
            belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

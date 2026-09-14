import Image from "next/image";
import { ANCHORS, INSTITUTE, PARTNER_NAME } from "@/lib/site";

const navLinks = [
  { href: `#${ANCHORS.placements}`, label: "Placements" },
  { href: `#${ANCHORS.programs}`, label: "Programs" },
  { href: `#${ANCHORS.campus}`, label: "Campus" },
  { href: `#${ANCHORS.admissions}`, label: "Admissions" },
  { href: `#${ANCHORS.faq}`, label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/iiebm-logo.png"
            alt={`${INSTITUTE.name} logo`}
            width={220}
            height={76}
            priority
            className="h-8 w-auto lg:h-10"
          />
          <span className="hidden border-l border-line pl-3 text-[11px] font-medium leading-tight text-muted sm:block">
            Official admissions
            <br />
            partner &middot; {PARTNER_NAME}
          </span>
        </div>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-6 lg:gap-3">
          <a
            href={`tel:${INSTITUTE.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-semibold text-brand sm:inline-flex"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path
                d="M5.5 3h2l1.2 3-1.6 1.2a9 9 0 004.7 4.7L13 10.3l3 1.2v2a1.5 1.5 0 01-1.7 1.5A12.5 12.5 0 014 5.7 1.5 1.5 0 015.5 3z"
                fill="currentColor"
              />
            </svg>
            {INSTITUTE.phone}
          </a>
          <a
            href={`#${ANCHORS.form}`}
            className="inline-flex items-center rounded-brand bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark lg:px-5"
          >
            Apply now
          </a>
        </div>
      </div>
    </header>
  );
}

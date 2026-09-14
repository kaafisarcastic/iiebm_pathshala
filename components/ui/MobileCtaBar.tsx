import { ANCHORS, INSTITUTE } from "@/lib/site";

/**
 * On phones the hero form scrolls away quickly, so a call / apply pair stays
 * pinned to the bottom of the viewport. Hidden from large screens, where the
 * header CTA is always visible.
 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:${INSTITUTE.phoneHref}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-brand border border-brand/30 px-4 py-3 text-sm font-semibold text-brand"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              d="M5.5 3h2l1.2 3-1.6 1.2a9 9 0 004.7 4.7L13 10.3l3 1.2v2a1.5 1.5 0 01-1.7 1.5A12.5 12.5 0 014 5.7 1.5 1.5 0 015.5 3z"
              fill="currentColor"
            />
          </svg>
          Call
        </a>
        <a
          href={`#${ANCHORS.form}`}
          className="inline-flex flex-1 items-center justify-center rounded-brand bg-brand px-4 py-3 text-sm font-semibold text-white"
        >
          Apply now
        </a>
      </div>
    </div>
  );
}

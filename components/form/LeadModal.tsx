"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LeadForm } from "@/components/form/LeadForm";
import {
  INTAKE,
  LEAD_MODAL_DELAY_MS,
  LEAD_MODAL_EXIT_INTENT_MIN_MS,
} from "@/lib/site";

const DISMISSED_KEY = "iiebm:lead-modal-done";

function alreadyHandled(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function markHandled() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Nothing to do — worst case the visitor sees the offer twice.
  }
}

/**
 * Offers the enquiry form once per session, whichever comes first:
 *   - the visitor has been reading for LEAD_MODAL_DELAY_MS, or
 *   - the pointer leaves towards the top of the window (exit intent), but only
 *     after LEAD_MODAL_EXIT_INTENT_MIN_MS.
 *
 * The dwell floor matters: `mouseout` towards the top fires whenever someone
 * reaches for a browser tab or the address bar, which on a fresh page load can
 * be a second or two in. Without it the popup lands before anyone has read a
 * word, which reads as a pop-up ad rather than an offer.
 *
 * It never interrupts someone who is already typing into a form on the page.
 */
export function LeadModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    markHandled();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (alreadyHandled()) return;

    const reveal = () => {
      // Don't steal focus from someone mid-enquiry.
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest("form")) return;
      if (alreadyHandled()) return;

      markHandled();
      setOpen(true);
      cleanup();
    };

    const armedAt = Date.now() + LEAD_MODAL_EXIT_INTENT_MIN_MS;

    const onPointerOut = (event: MouseEvent) => {
      if (Date.now() < armedAt) return;
      if (event.clientY <= 0 && !event.relatedTarget) reveal();
    };

    // Only ever runs after `timer` below has been initialised.
    const cleanup = () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onPointerOut);
    };

    const timer = window.setTimeout(reveal, LEAD_MODAL_DELAY_MS);
    document.addEventListener("mouseout", onPointerOut);

    return cleanup;
  }, []);

  // <dialog> gives us the focus trap, Esc handling and inert background.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onClick={(event) => {
        // Clicking the backdrop lands on the dialog element itself.
        if (event.target === dialogRef.current) close();
      }}
      aria-labelledby="lead-modal-title"
      /*
       * m-auto is load-bearing: the UA centres a modal <dialog> with
       * `margin: auto`, and Tailwind's preflight zeroes every margin, which
       * otherwise pins the dialog to the top-left corner.
       */
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(30rem,calc(100vw-2rem))] overflow-y-auto rounded-brand-lg bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas-alt hover:text-ink"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Batch {INTAKE.batch}
        </p>
        <h2
          id="lead-modal-title"
          className="mt-2 text-2xl font-semibold leading-tight"
        >
          Talk to an admissions counsellor
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Two minutes on the phone will tell you whether you are eligible, which
          specialisation fits you, and what the next step is.
        </p>

        <div className="mt-6">
          <LeadForm
            idPrefix="modal"
            source="15s-popup"
            submitLabel="Get my callback"
            onSuccess={close}
          />
        </div>
      </div>
    </dialog>
  );
}

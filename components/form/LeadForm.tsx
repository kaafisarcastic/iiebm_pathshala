"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { programOptions } from "@/data/programs";
import {
  emptyLead,
  hasErrors,
  validateLead,
  type Lead,
  type LeadFieldErrors,
} from "@/lib/lead";
import { INSTITUTE, PARTNER_NAME } from "@/lib/site";

/** Campaign parameters worth carrying into the sheet alongside the lead. */
const TRACKING_KEYS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "iiebm:tracking";

/**
 * Merges the campaign parameters currently in the URL with anything already
 * remembered for this session, and stores the result. Idempotent, so it can be
 * called on mount and again at submit time.
 */
function captureTracking(): Record<string, string> {
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const merged: Record<string, string> = { ...stored };
  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) merged[key] = value;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Private browsing — attribution is lost but the lead is not.
  }

  return merged;
}

type Field = {
  name: keyof Lead;
  label: string;
  type: "text" | "tel" | "email";
  placeholder: string;
  autoComplete: string;
  inputMode?: "text" | "tel" | "email";
};

const fields: Field[] = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "phone",
    label: "Mobile number",
    type: "tel",
    placeholder: "10-digit mobile",
    autoComplete: "tel",
    inputMode: "tel",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Where you live",
    autoComplete: "address-level2",
  },
];

type LeadFormProps = {
  /** Recorded against the lead so you can tell the hero form from the popup. */
  source: string;
  submitLabel?: string;
  /** The modal closes itself once the lead is away. */
  onSuccess?: () => void;
  idPrefix: string;
};

export function LeadForm({
  source,
  submitLabel = "Request a callback",
  onSuccess,
  idPrefix,
}: LeadFormProps) {
  const router = useRouter();

  // Capture campaign parameters as soon as the visitor lands, so they survive
  // even if they clear the query string before enquiring.
  useEffect(() => {
    captureTracking();
  }, []);

  const [values, setValues] = useState<Lead>(emptyLead);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const honeypot = useRef<HTMLInputElement>(null);

  function update(field: keyof Lead, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const found = validateLead(values);
    if (hasErrors(found)) {
      setErrors(found);
      return;
    }

    setStatus("sending");
    const tracking = captureTracking();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypot.current?.value ?? "",
          source,
          pageUrl: window.location.href,
          gclid: tracking.gclid ?? "",
          utmSource: tracking.utm_source ?? "",
          utmMedium: tracking.utm_medium ?? "",
          utmCampaign: tracking.utm_campaign ?? "",
          utmTerm: tracking.utm_term ?? "",
          utmContent: tracking.utm_content ?? "",
        }),
      });

      const body = (await response.json()) as {
        ok: boolean;
        errors?: LeadFieldErrors;
        message?: string;
      };

      if (!body.ok) {
        if (body.errors) setErrors(body.errors);
        setFormError(
          body.message ??
            "Please check the highlighted fields and try again.",
        );
        setStatus("idle");
        return;
      }

      onSuccess?.();
      router.push(`/thank-you?program=${encodeURIComponent(values.program)}`);
    } catch {
      setFormError(
        `Something went wrong. Please call ${INSTITUTE.phone} and we will take it from there.`,
      );
      setStatus("idle");
    }
  }

  const inputClass =
    "w-full rounded-brand border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${idPrefix}-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label
                htmlFor={id}
                className="text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {field.label}
              </label>
              <input
                id={id}
                name={field.name}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`${inputClass} ${error ? "border-red-400" : ""}`}
              />
              {error ? (
                <p id={`${id}-error`} className="text-xs text-red-600">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${idPrefix}-program`}
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Program of interest
        </label>
        <select
          id={`${idPrefix}-program`}
          name="program"
          value={values.program}
          onChange={(event) => update("program", event.target.value)}
          aria-invalid={errors.program ? true : undefined}
          aria-describedby={
            errors.program ? `${idPrefix}-program-error` : undefined
          }
          className={`${inputClass} ${errors.program ? "border-red-400" : ""} ${
            values.program ? "" : "text-muted/70"
          }`}
        >
          <option value="">Select a program</option>
          {programOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.program ? (
          <p id={`${idPrefix}-program-error`} className="text-xs text-red-600">
            {errors.program}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        ref={honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {formError ? (
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex w-full items-center justify-center rounded-brand bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>

      <p className="text-center text-xs leading-relaxed text-muted">
        By submitting, you agree to be contacted about admissions by{" "}
        {INSTITUTE.shortName} and its authorised admissions partner,{" "}
        {PARTNER_NAME}.
      </p>
    </form>
  );
}

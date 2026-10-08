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
  type LeadTextField,
} from "@/lib/lead";
import { CONSENT_TEXT, INSTITUTE, route } from "@/lib/site";

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
  name: LeadTextField;
  label: string;
  type: "text" | "tel" | "email";
  placeholder: string;
  autoComplete: string;
  inputMode?: "text" | "tel" | "email";
};

const fields: Field[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "phone",
    label: "Mobile Number",
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
  submitLabel = "Request A Callback",
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

  function update(field: LeadTextField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function setConsent(checked: boolean) {
    setValues((current) => ({ ...current, consentGiven: checked }));
    setErrors((current) => {
      if (!current.consentGiven) return current;
      const next = { ...current };
      delete next.consentGiven;
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
      const response = await fetch(route("/api/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          consentGiven: values.consentGiven,
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
          Programme of Interest
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
          <option value="">Select a programme</option>
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

      {/*
       * Consent gate. The checkbox is required by validateLead as well, so a
       * crafted POST cannot skip it — the disabled button is the courtesy, the
       * server check is the rule.
       */}
      <div className="rounded-brand border border-line bg-canvas-alt p-3.5">
        <label
          htmlFor={`${idPrefix}-consent`}
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id={`${idPrefix}-consent`}
            name="consentGiven"
            type="checkbox"
            checked={values.consentGiven}
            onChange={(event) => setConsent(event.target.checked)}
            aria-describedby={`${idPrefix}-consent-text`}
            aria-invalid={errors.consentGiven ? true : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand"
          />
          <span
            id={`${idPrefix}-consent-text`}
            className="type-small text-muted"
          >
            {CONSENT_TEXT}
          </span>
        </label>
      </div>

      {errors.consentGiven ? (
        <p className="type-small -mt-2 text-red-600">{errors.consentGiven}</p>
      ) : null}

      {formError ? (
        <p role="alert" className="type-small text-red-600">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending" || !values.consentGiven}
        className="mt-1 inline-flex w-full items-center justify-center rounded-brand bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark disabled:cursor-not-allowed disabled:bg-muted/40 disabled:text-white"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>

      <p className="type-small text-center text-muted">
        Or call{" "}
        <a
          href={`tel:${INSTITUTE.phoneHref}`}
          className="font-semibold text-brand"
        >
          {INSTITUTE.phone}
        </a>
      </p>
    </form>
  );
}

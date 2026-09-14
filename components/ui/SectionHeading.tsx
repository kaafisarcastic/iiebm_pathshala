import React from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Inverts colours for use on the brand-blue background. */
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      {eyebrow ? (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            inverted ? "text-white/70" : "text-brand"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={`max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-4xl ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`max-w-2xl text-pretty text-base leading-relaxed ${
            inverted ? "text-white/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

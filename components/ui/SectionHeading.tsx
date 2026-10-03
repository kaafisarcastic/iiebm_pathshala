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
          className={`type-eyebrow ${
            inverted ? "text-white/70" : "text-brand"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={`type-h2 max-w-3xl text-balance ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`type-lead max-w-2xl text-pretty ${
            inverted ? "text-white/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

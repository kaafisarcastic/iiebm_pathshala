import React from "react";

type SectionProps = {
  id?: string;
  /** Tints the section background so adjacent sections separate without rules. */
  tone?: "default" | "alt" | "brand";
  className?: string;
  children: React.ReactNode;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-canvas text-ink",
  alt: "bg-canvas-alt text-ink",
  brand: "bg-brand text-white",
};

export function Section({
  id,
  tone = "default",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${toneClass[tone]} py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

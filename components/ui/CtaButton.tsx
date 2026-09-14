import React from "react";
import Link from "next/link";

type Variant = "primary" | "outline" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-brand px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand-dark",
  outline:
    "border border-brand/30 bg-white text-brand hover:border-brand hover:bg-brand-tint focus-visible:outline-brand",
  light:
    "bg-white text-brand hover:bg-brand-tint focus-visible:outline-white",
};

type CtaButtonProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function CtaButton({
  href,
  variant = "primary",
  className = "",
  children,
}: CtaButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

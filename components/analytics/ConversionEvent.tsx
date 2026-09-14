"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the Google Ads conversion once, when the thank-you page mounts.
 * Silent unless both the tag id and the conversion label are configured.
 */
export function ConversionEvent() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GTAG_ID;
    const label = process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL;

    if (!id || !label || typeof window.gtag !== "function") return;

    window.gtag("event", "conversion", {
      send_to: `${id}/${label}`,
    });
  }, []);

  return null;
}

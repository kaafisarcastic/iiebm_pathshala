import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The conversion page and the lead endpoint have nothing to index.
      disallow: ["/thank-you", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

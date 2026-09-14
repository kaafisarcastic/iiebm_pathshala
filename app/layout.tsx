import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GoogleTag } from "@/components/analytics/GoogleTag";
import { INSTITUTE, SITE_URL } from "@/lib/site";

// Poppins is the typeface iiebm.com uses site-wide.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title =
  "PGDM & MBA Admissions 2026-28 | IIEBM Indus Business School, Pune";
const description =
  "Apply to the AICTE approved 2-year PGDM, PGDM PLUS with SAP certification, or the MBA at IIEBM Indus Business School, Pune. Highest CTC 34 LPA, 125 recruiters. Request a callback.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${INSTITUTE.shortName} Admissions`,
  },
  description,
  applicationName: `${INSTITUTE.shortName} Admissions`,
  keywords: [
    "PGDM Pune",
    "MBA Pune",
    "IIEBM",
    "Indus Business School",
    "PGDM admission 2026",
    "MBA admission 2026",
    "PGDM with SAP",
    "best B school in Pune",
    "MBA colleges in Pune",
    "AICTE approved PGDM",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${INSTITUTE.shortName} Admissions`,
    title,
    description,
    locale: "en_IN",
    images: [
      {
        url: "/campus/aerial-campus.webp",
        width: 1290,
        height: 700,
        alt: `${INSTITUTE.name} campus, Wakad, Pune`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/campus/aerial-campus.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#003fa3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <GoogleTag />
        {children}
      </body>
    </html>
  );
}

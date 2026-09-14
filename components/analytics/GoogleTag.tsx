import Script from "next/script";

/**
 * Loads gtag.js for Google Ads conversion tracking. Renders nothing until
 * NEXT_PUBLIC_GTAG_ID is set, so local and preview builds stay untracked.
 */
export function GoogleTag() {
  const id = process.env.NEXT_PUBLIC_GTAG_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

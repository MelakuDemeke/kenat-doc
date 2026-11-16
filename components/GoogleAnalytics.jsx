import Script from "next/script";

// GA4 measurement ID for kenat.et. A GA4 "G-" ID loads gtag.js (not gtm.js, which is for
// Google Tag Manager "GTM-" containers) and needs a gtag('config', ...) call to send page views.
// Client-side route changes are tracked by GA4 enhanced measurement ("page changes based on
// browser history events"), which is on by default for web streams.
const GA_ID = "G-BPH6XCHV0F";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_KEY } from "./cookie-banner";

/**
 * Loads Google Analytics 4 and Microsoft Clarity — only after cookie consent.
 * IDs come from NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID.
 */
export function Analytics() {
  const [consented, setConsented] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "accepted") setConsented(true);
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") setConsented(true);
    };
    window.addEventListener("tf-consent", onConsent);
    return () => window.removeEventListener("tf-consent", onConsent);
  }, []);

  if (!consented) return null;

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      )}
    </>
  );
}

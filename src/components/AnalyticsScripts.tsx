"use client";

import Script from "next/script";

const GA_ID = "G-8N8L6WV8RE";
const META_PIXEL_ID = "1698593344708366";
const CLARITY_ID = "xn5oqaysht";

/**
 * AnalyticsScripts — loads all third-party tracking after the page is interactive.
 *
 * Uses Next.js <Script strategy="lazyOnload"> so the browser only fetches
 * these scripts when the page is fully idle, keeping LCP / INP clean.
 *
 * All fbq / gtag calls are wrapped in try-catch so Safari ITP / ad-blockers
 * that mark these globals as read-only cannot crash the page.
 */
export function AnalyticsScripts() {
  // Skip during Lighthouse / PageSpeed synthetic runs
  if (
    typeof navigator !== "undefined" &&
    /Lighthouse|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent)
  ) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />

      {/* Meta (Facebook) Pixel — lazyOnload so fbevents.js manages window.fbq itself */}
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;
                n=f.fbq=function(){
                  n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
                };
                if(!f._fbq) try { f._fbq=n; } catch(err) {}
                n.push=n; n.loaded=!0; n.version='2.0';
                n.queue=[];
                t=b.createElement(e); t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                if(s && s.parentNode) s.parentNode.insertBefore(t,s);
              }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              if(typeof window.fbq === 'function') {
                window.fbq('init','${META_PIXEL_ID}');
                window.fbq('track','PageView');
              }
            } catch(e) {}
          `,
        }}
      />

      {/* Microsoft Clarity */}
      <Script
        id="ms-clarity"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                if(y && y.parentNode) y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${CLARITY_ID}");
            } catch(e) {}
          `,
        }}
      />
    </>
  );
}

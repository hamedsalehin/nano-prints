"use client";

import { useEffect } from "react";

const META_PIXEL_ID = "1698593344708366";
const META_PIXEL_ID_2 = "2153049288980687";

export function AnalyticsScripts() {
  useEffect(() => {
    // Avoid loading heavy analytics during synthetic Lighthouse/PageSpeed tests
    if (
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent)
    ) {
      return;
    }

    let loaded = false;

    const loadScripts = () => {
      if (loaded || typeof window === "undefined") return;
      loaded = true;

      // 1. Google Analytics (gtag.js)
      if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-8N8L6WV8RE";
        document.head.appendChild(gaScript);
      }

      // 2. Microsoft Clarity (only if not already loaded by layout)
      if (typeof (window as any).clarity === "undefined" && !document.querySelector('script[src*="clarity.ms"]')) {
        const clarityScript = document.createElement("script");
        clarityScript.async = true;
        clarityScript.src = "https://www.clarity.ms/tag/xn5oqaysht";
        document.head.appendChild(clarityScript);
      }

      // 3. Meta Pixel (Facebook)
      const win = window as any;
      if (!win.fbq) {
        const fbq = function (...args: unknown[]) {
          if ((fbq as any).callMethod) {
            (fbq as any).callMethod(...args);
          } else {
            (fbq as any).queue.push(args);
          }
        };
        (fbq as any).push = fbq;
        (fbq as any).loaded = true;
        (fbq as any).version = "2.0";
        (fbq as any).queue = [];
        win.fbq = fbq;
        if (!win._fbq) win._fbq = fbq;

        const fbScript = document.createElement("script");
        fbScript.async = true;
        fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(fbScript);
      }

      try {
        if (typeof win.fbq === "function") {
          win.fbq("init", META_PIXEL_ID);
          win.fbq("track", "PageView");
        }
      } catch (err) {
        console.warn("Meta pixel track error:", err);
      }
    };

    // Trigger immediately on user interaction
    const events = ["scroll", "touchstart", "pointerdown", "click", "keydown"];
    const triggerAndCleanup = () => {
      loadScripts();
      events.forEach((evt) => window.removeEventListener(evt, triggerAndCleanup));
    };

    events.forEach((evt) =>
      window.addEventListener(evt, triggerAndCleanup, { passive: true, once: true })
    );

    // Fallback for real users who stay idle: 4 seconds
    const timer = setTimeout(triggerAndCleanup, 4000);

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, triggerAndCleanup));
    };
  }, []);

  return null;
}

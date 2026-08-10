"use client";

import { useEffect } from "react";

export function AnalyticsScripts() {
  useEffect(() => {
    let loaded = false;

    const loadScripts = () => {
      if (loaded) return;
      loaded = true;

      // 1. Google Analytics (gtag.js)
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-8N8L6WV8RE";
      document.head.appendChild(gaScript);

      // 2. Microsoft Clarity
      const clarityScript = document.createElement("script");
      clarityScript.async = true;
      clarityScript.src = "https://www.clarity.ms/tag/xn5oqaysht";
      document.head.appendChild(clarityScript);

      // 3. Meta Pixel (Facebook)
      const fbScript = document.createElement("script");
      fbScript.async = true;
      fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(fbScript);

      const win = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof win.fbq === "function") {
        win.fbq("track", "PageView");
      }
    };

    // Trigger on first user engagement
    const events = ["scroll", "touchstart", "click", "mousemove", "keydown"];
    const triggerAndCleanup = () => {
      loadScripts();
      events.forEach((evt) => window.removeEventListener(evt, triggerAndCleanup));
    };

    events.forEach((evt) => window.addEventListener(evt, triggerAndCleanup, { passive: true, once: true }));

    // Fallback: load after 3.5 seconds of idle time if no interaction
    const timer = setTimeout(triggerAndCleanup, 3500);

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, triggerAndCleanup));
    };
  }, []);

  return null;
}

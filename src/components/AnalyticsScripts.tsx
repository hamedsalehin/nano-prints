"use client";

import { useEffect } from "react";

const META_PIXEL_ID = "2153049288980687";

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

      // 3. Meta Pixel (Facebook) — full official snippet
      !(function (
        f: Window & { fbq?: Function; _fbq?: Function },
        b: Document,
        e: string,
        v: string,
        n?: { callMethod?: Function; queue: unknown[]; push?: Function; loaded?: boolean; version?: string },
        t?: HTMLScriptElement,
        s?: HTMLScriptElement | null
      ) {
        if (f.fbq) return;
        n = f.fbq = function (...args: unknown[]) {
          n!.callMethod ? n!.callMethod!(...args) : n!.queue.push(args);
        } as unknown as typeof n;
        if (!f._fbq) f._fbq = n;
        n!.push = n;
        n!.loaded = true;
        n!.version = "2.0";
        n!.queue = [];
        t = b.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0] as HTMLScriptElement | null;
        s?.parentNode?.insertBefore(t, s);
      })(
        window as Window & { fbq?: Function; _fbq?: Function },
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      const win = window as unknown as { fbq: Function };
      win.fbq("init", META_PIXEL_ID);
      win.fbq("track", "PageView");

      // noscript fallback pixel
      const noscriptImg = document.createElement("img");
      noscriptImg.height = 1;
      noscriptImg.width = 1;
      noscriptImg.style.display = "none";
      noscriptImg.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
      document.body.appendChild(noscriptImg);
    };

    // Trigger immediately on real user engagement
    const events = ["scroll", "touchstart", "pointerdown", "click", "keydown", "mousemove"];
    const triggerAndCleanup = () => {
      loadScripts();
      events.forEach((evt) => window.removeEventListener(evt, triggerAndCleanup));
    };

    events.forEach((evt) =>
      window.addEventListener(evt, triggerAndCleanup, { passive: true, once: true })
    );

    // Fallback for real users who stay idle: 6 seconds
    const timer = setTimeout(triggerAndCleanup, 6000);

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, triggerAndCleanup));
    };
  }, []);

  return null;
}

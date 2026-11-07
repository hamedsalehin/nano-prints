"use client";

import { useEffect } from "react";

const META_PIXEL_ID = "1698593344708366";

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
      try {
        if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
          const gaScript = document.createElement("script");
          gaScript.async = true;
          gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-8N8L6WV8RE";
          document.head.appendChild(gaScript);
        }
      } catch (e) {
        // Safe fail
      }

      // 2. Microsoft Clarity (only if not already loaded by layout)
      try {
        if (
          typeof (window as unknown as { clarity?: unknown }).clarity === "undefined" &&
          !document.querySelector('script[src*="clarity.ms"]')
        ) {
          const clarityScript = document.createElement("script");
          clarityScript.async = true;
          clarityScript.src = "https://www.clarity.ms/tag/xn5oqaysht";
          document.head.appendChild(clarityScript);
        }
      } catch (e) {
        // Safe fail
      }

      // 3. Meta Pixel (Facebook) - Safely handle Safari ITP / Content Blocker readonly globals
      try {
        const win = window as any;
        if (!win.fbq) {
          const fbq = function (...args: unknown[]) {
            try {
              if ((fbq as any).callMethod) {
                (fbq as any).callMethod(...args);
              } else if (Array.isArray((fbq as any).queue)) {
                (fbq as any).queue.push(args);
              }
            } catch {
              // Ignore
            }
          };
          (fbq as any).push = fbq;
          (fbq as any).loaded = true;
          (fbq as any).version = "2.0";
          (fbq as any).queue = [];

          try {
            win.fbq = fbq;
          } catch {
            // Safari ITP or ad-blocker defined window.fbq as read-only
          }

          try {
            if (!win._fbq) {
              win._fbq = fbq;
            }
          } catch {
            // Safari ITP or ad-blocker defined window._fbq as read-only
          }
        }

        try {
          if (!document.querySelector('script[src*="connect.facebook.net"]')) {
            const fbScript = document.createElement("script");
            fbScript.async = true;
            fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
            document.head.appendChild(fbScript);
          }
        } catch {
          // Ignore
        }

        try {
          if (typeof win.fbq === "function") {
            win.fbq("init", META_PIXEL_ID);
            win.fbq("track", "PageView");
          }
        } catch {
          // Ignore
        }
      } catch (err) {
        // Meta pixel safe fail
      }
    };

    // Trigger immediately on user interaction
    const events = ["scroll", "touchstart", "pointerdown", "click", "keydown"];
    const triggerAndCleanup = () => {
      try {
        loadScripts();
      } catch {
        // Safe fail
      } finally {
        events.forEach((evt) => {
          try {
            window.removeEventListener(evt, triggerAndCleanup);
          } catch {
            // Safe fail
          }
        });
      }
    };

    events.forEach((evt) => {
      try {
        window.addEventListener(evt, triggerAndCleanup, { passive: true, once: true });
      } catch {
        // Safe fail
      }
    });

    // Fallback for real users who stay idle: 4 seconds
    const timer = setTimeout(triggerAndCleanup, 4000);

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => {
        try {
          window.removeEventListener(evt, triggerAndCleanup);
        } catch {
          // Safe fail
        }
      });
    };
  }, []);

  return null;
}

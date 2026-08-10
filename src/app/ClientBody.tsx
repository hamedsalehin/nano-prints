"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/components/AuthContext";
import { CartProvider } from "@/components/CartContext";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { usePathname } from "next/navigation";

// Lazy-load non-critical floating widgets & modals
const AuthModal = dynamic(() => import("@/components/AuthModal").then((mod) => mod.AuthModal), { ssr: false });
const CartSidebar = dynamic(() => import("@/components/CartSidebar").then((mod) => mod.CartSidebar), { ssr: false });
const PromotionalModal = dynamic(() => import("@/components/PromotionalModal").then((mod) => mod.PromotionalModal), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget").then((mod) => mod.ChatWidget), { ssr: false });
const GeminiChatbox = dynamic(() => import("@/components/GeminiChatbox").then((mod) => mod.GeminiChatbox), { ssr: false });

export function ClientBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesignerPage = pathname?.includes("/design") || pathname?.includes("/PrintDesignExperience");
  const [widgetsReady, setWidgetsReady] = useState(false);

  useEffect(() => {
    // Mount non-critical floating widgets on idle or first interaction to protect LCP & CPU
    const onIdle = () => setWidgetsReady(true);
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = (window as any).requestIdleCallback(onIdle, { timeout: 3500 });
        return () => (window as any).cancelIdleCallback(id);
      } else {
        const timer = setTimeout(onIdle, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      <AuthProvider>
        <CartProvider>
          {children}
          <AnalyticsScripts />
          {widgetsReady && (
            <>
              <AuthModal />
              <CartSidebar />
              <PromotionalModal />
              {!isDesignerPage && (
                <>
                  <ChatWidget />
                  <GeminiChatbox />
                </>
              )}
            </>
          )}
        </CartProvider>
      </AuthProvider>
    </body>
  );
}


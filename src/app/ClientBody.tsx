"use client";

import dynamic from "next/dynamic";
import { AuthProvider } from "@/components/AuthContext";
import { CartProvider } from "@/components/CartContext";
import { CartSidebar } from "@/components/CartSidebar";
import { usePathname } from "next/navigation";

// Lazy-load non-critical floating widgets & modals to dramatically improve PageSpeed & LCP
const AuthModal = dynamic(() => import("@/components/AuthModal").then((mod) => mod.AuthModal), { ssr: false });
const PromotionalModal = dynamic(() => import("@/components/PromotionalModal").then((mod) => mod.PromotionalModal), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget").then((mod) => mod.ChatWidget), { ssr: false });
const GeminiChatbox = dynamic(() => import("@/components/GeminiChatbox").then((mod) => mod.GeminiChatbox), { ssr: false });

export function ClientBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesignerPage = pathname?.includes("/design") || pathname?.includes("/PrintDesignExperience");

  return (
    <body className="antialiased" suppressHydrationWarning>
      <AuthProvider>
        <CartProvider>
          {children}
          <AuthModal />
          <CartSidebar />
          <PromotionalModal />
          {!isDesignerPage && (
            <>
              <ChatWidget />
              <GeminiChatbox />
            </>
          )}
        </CartProvider>
      </AuthProvider>
    </body>
  );
}

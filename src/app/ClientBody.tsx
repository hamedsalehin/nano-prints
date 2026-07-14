"use client";

import { AuthProvider } from "@/components/AuthContext";
import { CartProvider } from "@/components/CartContext";
import { AuthModal } from "@/components/AuthModal";
import { CartSidebar } from "@/components/CartSidebar";
import { PromotionalModal } from "@/components/PromotionalModal";
import { ChatWidget } from "@/components/ChatWidget";
import { GeminiChatbox } from "@/components/GeminiChatbox";
import { usePathname } from "next/navigation";

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

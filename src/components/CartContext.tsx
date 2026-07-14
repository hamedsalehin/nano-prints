"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";

export interface CartItem {
  id: string; // unique item id
  productTitle: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  designUrl?: string;
  designFilename?: string;
  customOptions: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  discountApplied: boolean;
  checkout: () => Promise<{
    success: boolean;
    error?: string;
    orderIds?: string[];
  }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, setShowAuthModal } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  // Check discount eligibility from Supabase or localStorage fallback
  useEffect(() => {
    let active = true;

    const checkDiscount = async () => {
      if (!user?.email) {
        setDiscountApplied(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("discount_claims")
          .select("*")
          .eq("email", user.email.trim().toLowerCase())
          .is("used_at", null)
          .maybeSingle();

        if (error) throw error;
        if (active) {
          setDiscountApplied(!!data);
        }
      } catch (err) {
        console.warn("Failed to check discount status in Supabase:", err);
        if (active) {
          // Fallback to local storage tracking
          const claimed = localStorage.getItem("nano_promo_claimed") === "true";
          const claimedEmail = localStorage.getItem("nano_promo_claimed_email");
          const usedLocally = localStorage.getItem("nano_promo_used") === "true";

          if (claimed && claimedEmail === user.email.trim().toLowerCase() && !usedLocally) {
            setDiscountApplied(true);
          } else {
            setDiscountApplied(false);
          }
        }
      }
    };

    checkDiscount();

    // Listen for real-time claims in current tab
    const handleLocalClaim = () => {
      checkDiscount();
    };
    window.addEventListener("nano_discount_claimed", handleLocalClaim);

    return () => {
      active = false;
      window.removeEventListener("nano_discount_claimed", handleLocalClaim);
    };
  }, [user]);

  // Load cart on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nano_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items:", e);
      }
    }
    setIsMounted(true);
  }, []);

  // Save cart when items change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("nano_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { ...item, id }]);
    setCartOpen(true); // Auto-open cart sidebar when adding item
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async () => {
    if (!user) {
      setShowAuthModal(true);
      return {
        success: false,
        error: "Please sign in or create an account to place your order.",
      };
    }

    if (items.length === 0) {
      return { success: false, error: "Your cart is empty." };
    }

    try {
      const orderIds: string[] = [];

      for (const item of items) {
        // Apply 10% discount if eligible
        const finalUnitPrice = discountApplied ? item.unitPrice * 0.9 : item.unitPrice;
        const finalTotalPrice = discountApplied ? item.totalPrice * 0.9 : item.totalPrice;

        const { data, error } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            product_title: item.productTitle,
            product_size: item.size,
            quantity: item.quantity,
            unit_price: finalUnitPrice,
            total_price: finalTotalPrice,
            design_url: item.designUrl || null,
            design_filename: item.designFilename || null,
            custom_options: item.customOptions,
            status: "pending",
          })
          .select("id")
          .single();

        if (error) throw error;
        if (data) orderIds.push(data.id);
      }

      // If a discount was applied, mark it as used in Supabase
      if (discountApplied) {
        try {
          await supabase
            .from("discount_claims")
            .update({ used_at: new Date().toISOString() })
            .eq("email", user.email!.trim().toLowerCase())
            .is("used_at", null);
        } catch (dbErr) {
          console.warn("Failed to mark discount as used in Supabase:", dbErr);
        }
        localStorage.setItem("nano_promo_used", "true");
        setDiscountApplied(false);
      }

      // Trigger order confirmation emails asynchronously
      if (orderIds.length > 0) {
        try {
          fetch("/api/send-order-emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderIds,
              userEmail: user.email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("send-order-emails response:", data);
            })
            .catch((err) => {
              console.error("send-order-emails request failed:", err);
            });
        } catch (emailErr) {
          console.error("Failed to call send-order-emails API:", emailErr);
        }
      }

      clearCart();
      return { success: true, orderIds };
    } catch (err) {
      console.error("Checkout failed:", err);
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to place order. Please try again.",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        cartOpen,
        setCartOpen,
        discountApplied,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

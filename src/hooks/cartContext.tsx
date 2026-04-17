"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CartItem } from "@/types";

interface Coupon {
  code: string;
  discount: number; // percentage
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  mounted: boolean;
  // Discount related
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  discountAmount: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Load cart and coupon from localStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const storedCart = localStorage.getItem("aura_cart");
      if (storedCart) setItems(JSON.parse(storedCart));

      const storedCoupon = localStorage.getItem("aura_coupon");
      if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
    } catch {
      setItems([]);
      setAppliedCoupon(null);
    }
  }, []);

  const save = (updated: CartItem[]) => {
    setItems(updated);
    localStorage.setItem("aura_cart", JSON.stringify(updated));
  };

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      const updated = existing
        ? prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          )
        : [...prev, item];
      localStorage.setItem("aura_cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.productId !== productId);
      localStorage.setItem("aura_cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId);
        return;
      }
      setItems((prev) => {
        const updated = prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i,
        );
        localStorage.setItem("aura_cart", JSON.stringify(updated));
        return updated;
      });
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("aura_cart");
    setAppliedCoupon(null);
    localStorage.removeItem("aura_coupon");
  }, []);

  // Coupon methods
  const applyCoupon = useCallback((coupon: Coupon) => {
    setAppliedCoupon(coupon);
    localStorage.setItem("aura_coupon", JSON.stringify(coupon));
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    localStorage.removeItem("aura_coupon");
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const discountAmount = appliedCoupon
    ? (total * appliedCoupon.discount) / 100
    : 0;
  const grandTotal = total - discountAmount;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
        mounted,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

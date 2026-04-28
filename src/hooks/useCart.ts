"use client";
import { useState } from "react";
import { CartItem } from "@/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const updated = [...prev, item];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items, addItem, total };
}

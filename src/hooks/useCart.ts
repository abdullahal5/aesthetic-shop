"use client";
import { useState, useEffect } from "react";
import { CartItem } from "@/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

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

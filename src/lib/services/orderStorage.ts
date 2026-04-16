import { Order } from "@/types";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("aura_orders");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem("aura_orders", JSON.stringify(orders));
}

export function updateOrderStatus(id: string, status: Order["status"]): void {
  const orders = getOrders();
  const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem("aura_orders", JSON.stringify(updated));
}

export function generateOrderNumber(): string {
  return `AUR-${Date.now().toString().slice(-6)}`;
}

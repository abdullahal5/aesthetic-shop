import { Order } from "@/types";

const STORAGE_KEY = "aura_orders";

const isBrowser = typeof window !== "undefined";

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${timestamp}-${random}`;
};

export const saveOrder = (order: Order): void => {
  if (!isBrowser) return;

  try {
    const existingOrders = getOrders();
    existingOrders.unshift(order);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existingOrders));
  } catch (error) {
    console.error("Failed to save order:", error);
  }
};

export const getOrders = (): Order[] => {
  if (!isBrowser) return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getOrder = (orderNumber: string): Order | null => {
  if (!isBrowser) return null;

  try {
    const orders = getOrders();
    return orders.find((order) => order.orderNumber === orderNumber) || null;
  } catch {
    return null;
  }
};

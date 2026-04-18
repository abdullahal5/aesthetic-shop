"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  Trash2,
  Phone,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Gift,
  StickyNote,
} from "lucide-react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "@/lib/admin/adminData";
import type { AdminOrder } from "@/lib/admin/adminData";

type OrderStatus = AdminOrder["status"];

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  pending: { label: "Pending", color: "#D97706", bg: "#FEF3C7", icon: Clock },
  confirmed: {
    label: "Confirmed",
    color: "#2563EB",
    bg: "#DBEAFE",
    icon: CheckCircle,
  },
  shipped: { label: "Shipped", color: "#7C3AED", bg: "#EDE9FE", icon: Truck },
  delivered: {
    label: "Delivered",
    color: "#059669",
    bg: "#D1FAE5",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "#DC2626",
    bg: "#FEE2E2",
    icon: XCircle,
  },
};

const statusOrder: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <cfg.icon size={11} />
      {cfg.label}
    </span>
  );
}

function OrderCard({
  order,
  onStatusChange,
  onDelete,
}: {
  order: AdminOrder;
  onStatusChange: (num: string, status: OrderStatus) => void;
  onDelete: (num: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
      {/* Header row */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 cursor-pointer hover:bg-stone-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Order info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-xl overflow-hidden shrink-0"
            style={{ backgroundColor: "var(--brand-sand)" }}
          >
            <Image
              src={order.items[0]?.image || ""}
              alt=""
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              {order.customerName}
            </p>
            <p className="text-xs text-stone-400 truncate">
              {order.orderNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <StatusBadge status={order.status} />
          <div className="text-right">
            <p
              className="text-sm font-bold"
              style={{ color: "var(--brand-dark)" }}
            >
              ৳{order.total.toLocaleString()}
            </p>
            <p className="text-xs text-stone-400">{timeAgo(order.createdAt)}</p>
          </div>
          <ChevronDown
            size={16}
            className={`text-stone-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="border-t border-stone-100 px-5 py-4 space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
                Customer
              </p>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--brand-dark)" }}
              >
                <Phone size={13} style={{ color: "var(--brand-earth)" }} />
                {order.customerPhone}
              </div>
              {order.customerEmail && (
                <p className="text-sm text-stone-500">{order.customerEmail}</p>
              )}
              <div className="flex items-start gap-2 text-sm text-stone-500">
                <MapPin
                  size={13}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--brand-earth)" }}
                />
                <span>
                  {order.address}, {order.district}
                </span>
              </div>
              {order.note && (
                <div className="flex items-start gap-2 text-sm text-stone-500">
                  <StickyNote
                    size={13}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--brand-earth)" }}
                  />
                  <span className="italic">{order.note}</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
                Items ({order.items.length})
              </p>
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
                    style={{ backgroundColor: "var(--brand-sand)" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className="text-xs flex-1 truncate"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    {item.name} × {item.quantity}
                  </p>
                  <p
                    className="text-xs font-semibold shrink-0"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div
            className="rounded-xl p-3 space-y-1.5 text-xs"
            style={{ backgroundColor: "var(--brand-sand)" }}
          >
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span>৳{order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount && (
              <div
                className="flex justify-between"
                style={{ color: "var(--brand-sage)" }}
              >
                <span className="flex items-center gap-1">
                  <Gift size={11} /> {order.discount.code} (
                  {order.discount.percentage}%)
                </span>
                <span>-৳{order.discount.amount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-500">
              <span className="flex items-center gap-1">
                <Truck size={11} /> Delivery
              </span>
              <span>৳{order.deliveryFee}</span>
            </div>
            <div
              className="flex justify-between font-bold border-t border-stone-200 pt-1.5"
              style={{ color: "var(--brand-dark)" }}
            >
              <span>Total</span>
              <span>৳{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Package size={14} style={{ color: "var(--brand-earth)" }} />
              <span className="text-xs font-medium text-stone-600">
                Change Status:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {statusOrder.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(order.orderNumber, s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    order.status === s
                      ? "ring-2 ring-offset-1"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    color: statusConfig[s].color,
                    backgroundColor: statusConfig[s].bg,
                    // ringColor: statusConfig[s].color,
                  }}
                >
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
            <div className="ml-auto">
              {delConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => onDelete(order.orderNumber)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDelConfirm(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 text-stone-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDelConfirm(true)}
                  className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const load = () => setOrders(getOrders());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleStatusChange = (num: string, status: OrderStatus) => {
    updateOrderStatus(num, status);
    load();
  };

  const handleDelete = (num: string) => {
    deleteOrder(num);
    load();
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--brand-dark)" }}
        >
          Orders
        </h1>
        <p className="text-sm text-stone-400 mt-0.5">
          {orders.length} total orders
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
            filterStatus === "all"
              ? "text-white"
              : "bg-white border border-stone-200 text-stone-500 hover:bg-stone-50"
          }`}
          style={
            filterStatus === "all"
              ? { backgroundColor: "var(--brand-dark)" }
              : {}
          }
        >
          All ({orders.length})
        </button>
        {statusOrder.map((s) => {
          const cfg = statusConfig[s];
          const active = filterStatus === s;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                active
                  ? "ring-2 ring-offset-1"
                  : "bg-white border border-stone-200 hover:bg-stone-50"
              }`}
              style={
                active
                  ? { color: cfg.color, backgroundColor: cfg.bg }
                  : { color: "var(--brand-dark)" }
              }
            >
              {cfg.label} ({counts[s] || 0})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, order number, or phone..."
          className="w-full h-10 pl-9 pr-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 py-16 text-center text-stone-400">
          <Package size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

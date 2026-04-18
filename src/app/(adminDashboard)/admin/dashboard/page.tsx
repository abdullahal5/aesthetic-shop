"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Package,
  Tag,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  AdminOrder,
  getAdminProducts,
  getDiscounts,
} from "@/lib/admin/adminData";
import { getOrders } from "@/lib/services/orderStorage";

const statusConfig = {
  pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
  confirmed: {
    label: "Confirmed",
    color: "#3B82F6",
    bg: "#DBEAFE",
    icon: CheckCircle,
  },
  shipped: { label: "Shipped", color: "#8B5CF6", bg: "#EDE9FE", icon: Truck },
  delivered: {
    label: "Delivered",
    color: "#10B981",
    bg: "#D1FAE5",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "#EF4444",
    bg: "#FEE2E2",
    icon: XCircle,
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    activeCoupons: 0,
  });

  useEffect(() => {
    const o = getOrders();
    const p = getAdminProducts();
    const d = getDiscounts();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(o);
    setStats({
      totalRevenue: o
        .filter((x) => x.status !== "cancelled")
        .reduce((s, x) => s + x.total, 0),
      totalOrders: o.length,
      activeProducts: p.filter((x) => x.status === "active").length,
      activeCoupons: d.filter((x) => x.active).length,
    });
  }, []);

  const statusCounts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--brand-dark)" }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-stone-400 mt-0.5">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-7">
        {[
          {
            label: "Total Revenue",
            value: `৳${stats.totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: "var(--brand-earth)",
            bg: "var(--brand-sand)",
            link: "/admin/orders",
          },
          {
            label: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: "#3B82F6",
            bg: "#EFF6FF",
            link: "/admin/orders",
          },
          {
            label: "Active Products",
            value: stats.activeProducts,
            icon: Package,
            color: "#8B5CF6",
            bg: "#F5F3FF",
            link: "/admin/products",
          },
          {
            label: "Active Coupons",
            value: stats.activeCoupons,
            icon: Tag,
            color: "#10B981",
            bg: "#F0FDF4",
            link: "/admin/discounts",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.link}
            className="bg-white rounded-2xl p-4 md:p-5 border border-stone-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <ArrowUpRight
                size={14}
                className="text-stone-300 group-hover:text-stone-500 transition-colors"
              />
            </div>
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--brand-dark)" }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-stone-400 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-medium flex items-center gap-1 hover:underline"
              style={{ color: "var(--brand-earth)" }}
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-stone-50">
            {recentOrders.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-stone-400">
                No orders yet
              </div>
            ) : (
              recentOrders.map((order) => {
                const cfg = statusConfig[order.status];
                return (
                  <Link
                    key={order.id}
                    href={`/admin/orders`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 transition-colors"
                  >
                    {/* Product thumb */}
                    <div
                      className="w-10 h-10 rounded-xl overflow-hidden shrink-0"
                      style={{ backgroundColor: "var(--brand-sand)" }}
                    >
                      <Image
                        src={order.items[0]?.image || ""}
                        alt={order.items[0]?.name || ""}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold truncate"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        {order.customerName}
                      </p>
                      <p className="text-xs text-stone-400 truncate">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-xs font-bold"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        ৳{order.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-stone-400">
                        {timeAgo(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0"
                      style={{ color: cfg.color, backgroundColor: cfg.bg }}
                    >
                      {cfg.label}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          <h2
            className="font-semibold text-sm mb-4"
            style={{ color: "var(--brand-dark)" }}
          >
            Order Status
          </h2>
          <div className="space-y-3">
            {(
              Object.entries(statusConfig) as [
                keyof typeof statusConfig,
                (typeof statusConfig)[keyof typeof statusConfig],
              ][]
            ).map(([key, cfg]) => {
              const count = statusCounts[key] || 0;
              const total = orders.length || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <cfg.icon size={13} style={{ color: cfg.color }} />
                      <span
                        className="text-xs"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: cfg.color }}
                    >
                      {count}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="mt-5 pt-5 border-t border-stone-100 space-y-2">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
              Quick Actions
            </p>
            {[
              {
                href: "/admin/products/new",
                label: "Add New Product",
                icon: Package,
              },
              { href: "/admin/discounts", label: "Create Discount", icon: Tag },
              {
                href: "/admin/banners",
                label: "Manage Banners",
                icon: ShoppingBag,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:bg-stone-50"
                style={{ color: "var(--brand-dark)" }}
              >
                <item.icon size={14} style={{ color: "var(--brand-earth)" }} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

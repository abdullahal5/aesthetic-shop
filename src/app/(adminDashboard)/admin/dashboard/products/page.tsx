"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Star, Package } from "lucide-react";
import {
  AdminProduct,
  deleteProduct,
  getAdminProducts,
} from "@/lib/admin/adminData";

const statusStyle = {
  active: { bg: "#D1FAE5", color: "#065F46", label: "Active" },
  draft: { bg: "#FEF3C7", color: "#92400E", label: "Draft" },
  archived: { bg: "#F3F4F6", color: "#6B7280", label: "Archived" },
};

// Helper function to validate image URL
const getValidImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder-image.jpg";
  // Check if URL is valid (starts with http://, https://, or /)
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  ) {
    return url;
  }
  // Return placeholder for invalid URLs
  return "/placeholder-image.jpg";
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by waiting for client-side mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setProducts(getAdminProducts());
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getAdminProducts());
    setDeleteConfirm(null);
  };

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-48 mb-4"></div>
          <div className="h-10 bg-stone-200 rounded w-full mb-4"></div>
          <div className="h-96 bg-stone-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--brand-dark)" }}
          >
            Products
          </h1>
          <p className="text-sm text-stone-400 mt-0.5">
            {products.length} total products
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--brand-earth)" }}
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-amber-400 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "draft", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                filterStatus === s
                  ? "text-white"
                  : "bg-white border border-stone-200 text-stone-500 hover:bg-stone-50"
              }`}
              style={
                filterStatus === s
                  ? { backgroundColor: "var(--brand-earth)" }
                  : {}
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {/* Desktop table header */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-5 py-3 text-xs font-semibold text-stone-400 uppercase tracking-wide border-b border-stone-100">
          <span>Image</span>
          <span>Product</span>
          <span className="text-right">Price</span>
          <span className="text-right">Stock</span>
          <span className="text-right">Sold</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-stone-400">
            <Package size={32} className="mb-3 opacity-40" />
            <p className="text-sm font-medium">No products found</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {filtered.map((product) => {
              const st = statusStyle[product.status];
              const imageUrl =
                product.images?.[0]?.url || product.images?.[0] || "";
              const validImageUrl = getValidImageUrl(imageUrl as string);

              return (
                <div
                  key={product.id}
                  className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-3 md:gap-4 px-5 py-4 hover:bg-stone-50 transition-colors"
                >
                  {/* Image */}
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-100 flex items-center justify-center"
                    style={{ backgroundColor: "var(--brand-sand)" }}
                  >
                    {validImageUrl ? (
                      <Image
                        src={validImageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement?.classList.add(
                            "flex",
                            "items-center",
                            "justify-center",
                          );
                          const fallbackSpan = document.createElement("span");
                          fallbackSpan.textContent = "📦";
                          fallbackSpan.className = "text-2xl";
                          target.parentElement?.appendChild(fallbackSpan);
                        }}
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>

                  {/* Name + category */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className="font-semibold text-sm truncate"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        {product.name}
                      </p>
                      {product.featured && (
                        <Star
                          size={12}
                          className="fill-amber-400 text-amber-400 shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-xs text-stone-400 truncate">
                      {product.category} · {product.slug}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="md:text-right">
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      ৳{product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-stone-400 line-through">
                        ৳{product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="md:text-right">
                    <p
                      className={`text-sm font-semibold ${
                        product.stock <= 3 ? "text-red-500" : "text-stone-600"
                      }`}
                    >
                      {product.stock}
                    </p>
                    <p className="text-xs text-stone-400">in stock</p>
                  </div>

                  {/* Sold */}
                  <div className="md:text-right">
                    <p className="text-sm font-semibold text-stone-600">
                      {product.totalSold}
                    </p>
                    <p className="text-xs text-stone-400">sold</p>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ color: st.color, backgroundColor: st.bg }}
                    >
                      {st.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700"
                    >
                      <Pencil size={15} />
                    </Link>
                    {deleteConfirm === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-stone-100 text-stone-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors text-stone-400 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

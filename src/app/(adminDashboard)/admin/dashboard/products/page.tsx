/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  Package,
  RefreshCw,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/product.types";
import { productKeys, useDeleteProduct, useProducts } from "@/hooks/product/useProduct";

const statusStyle = {
  active: { bg: "#D1FAE5", color: "#065F46", label: "Active" },
  draft: { bg: "#FEF3C7", color: "#92400E", label: "Draft" },
  archived: { bg: "#F3F4F6", color: "#6B7280", label: "Archived" },
};

// Helper function to validate image URL - handles different data types safely
const getValidImageUrl = (url: string | undefined | any) => {
  // If no URL provided
  if (!url) return "/placeholder-image.jpg";

  // If url is a string, check if it's valid
  if (typeof url === "string") {
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    ) {
      return url;
    }
    return "/placeholder-image.jpg";
  }

  // If url is an object with a url property (common in APIs)
  if (typeof url === "object" && url !== null) {
    const imageUrl = url.url || url.src || url.path;
    if (imageUrl && typeof imageUrl === "string") {
      return getValidImageUrl(imageUrl);
    }
  }

  // Fallback for any other case
  return "/placeholder-image.jpg";
};

// Map API product status to status style keys
const getStatusKey = (status: string): "active" | "draft" | "archived" => {
  switch (status?.toLowerCase()) {
    case "active":
      return "active";
    case "draft":
      return "draft";
    case "archived":
      return "archived";
    default:
      return "draft";
  }
};

// Helper to extract image URL from various formats
const extractImageUrl = (image: any): string => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (typeof image === "object") {
    return image.url || image.src || image.path || "";
  }
  return "";
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Fetch products from API
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProducts({
    status: filterStatus !== "all" ? filterStatus : undefined,
  });

  const deleteProductMutation = useDeleteProduct();

  // Filter products by search (client-side filtering since API doesn't have search param)
  const filtered = products.filter((p: Product) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      setDeleteConfirm(null);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleRefetch = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-48 mb-4"></div>
          <div className="h-10 bg-stone-200 rounded w-full mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-stone-200 rounded"></div>
            <div className="h-16 bg-stone-200 rounded"></div>
            <div className="h-16 bg-stone-200 rounded"></div>
            <div className="h-16 bg-stone-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <Package size={48} className="mx-auto mb-4 text-red-400" />
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Failed to load products
          </h2>
          <p className="text-red-600 text-sm mb-4">
            {error?.message || "An error occurred while fetching products."}
          </p>
          <button
            onClick={handleRefetch}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
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
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-stone-400">
              {filtered.length} of {products.length} total products
            </p>
            {isFetching && !isLoading && (
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <RefreshCw size={12} className="animate-spin" />
                <span>Updating...</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefetch}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
            disabled={isFetching}
          >
            <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/dashboard/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--brand-earth)" }}
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>
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
            {search || filterStatus !== "all" ? (
              <>
                <Package size={32} className="mb-3 opacity-40" />
                <p className="text-sm font-medium">
                  No matching products found
                </p>
                <p className="text-xs mt-1">
                  Try adjusting your search or filter
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setFilterStatus("all");
                  }}
                  className="mt-4 text-sm text-amber-600 hover:text-amber-700"
                >
                  Clear filters
                </button>
              </>
            ) : (
              <>
                <Package size={32} className="mb-3 opacity-40" />
                <p className="text-sm font-medium">No products yet</p>
                <p className="text-xs mt-1">
                  Get started by adding your first product
                </p>
                <Link
                  href="/admin/dashboard/products/new"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "var(--brand-earth)" }}
                >
                  <Plus size={14} />
                  Add Product
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {filtered.map((product: Product) => {
              const statusKey = getStatusKey(product.status);
              const st = statusStyle[statusKey];
              const imageUrl = extractImageUrl(product.images?.[0]);
              const validImageUrl = getValidImageUrl(imageUrl);
              const isDeleting =
                deleteProductMutation.isPending && deleteConfirm === product.id;

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
                    {validImageUrl &&
                    validImageUrl !== "/placeholder-image.jpg" ? (
                      <Image
                        src={validImageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
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
                      {product.category || "Uncategorized"} · {product.slug}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="md:text-right">
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      ৳{product.price?.toLocaleString() || 0}
                    </p>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <p className="text-xs text-stone-400 line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </p>
                      )}
                  </div>

                  {/* Stock */}
                  <div className="md:text-right">
                    <p
                      className={`text-sm font-semibold ${
                        (product.stock || 0) <= 3
                          ? "text-red-500"
                          : "text-stone-600"
                      }`}
                    >
                      {product.stock ?? 0}
                    </p>
                    <p className="text-xs text-stone-400">in stock</p>
                  </div>

                  {/* Sold */}
                  <div className="md:text-right">
                    <p className="text-sm font-semibold text-stone-600">
                      {product.totalSold ?? 0}
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
                      href={`/admin/dashboard/products/${product.id}`}
                      className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700"
                    >
                      <Pencil size={15} />
                    </Link>
                    {deleteConfirm === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting}
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeleting ? "Deleting..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-stone-100 text-stone-500 hover:bg-stone-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors text-stone-400 hover:text-red-500 disabled:opacity-50"
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

      {/* Refetch on visibility (optional) */}
      {isFetching && !isLoading && (
        <div className="fixed bottom-4 right-4 bg-stone-800 text-white text-xs px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
          <RefreshCw size={12} className="animate-spin" />
          Syncing...
        </div>
      )}
    </div>
  );
}

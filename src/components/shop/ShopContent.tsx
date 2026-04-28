"use client";

import ProductCard from "@/components/home/ProductCard";
import { useProducts } from "@/hooks/product/useProduct";
import { AlertCircle, ShoppingBag } from "lucide-react";
import ShopSkeleton from "./ShopSkeleton";

export default function ShopContent() {
  const {
    data: products,
    isLoading,
    isFetching,
    error,
  } = useProducts({
    status: "active", // Only show active products
  });

  // Loading state
  if (isLoading) {
    return <ShopSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--brand-dark)" }}
        >
          Failed to load products
        </h3>
        <p className="text-sm mb-6" style={{ color: "#8B7B70" }}>
          {error?.message || "Something went wrong. Please try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--brand-earth)" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Check if products exist
  const hasProducts = products && products.length > 0;

  // Empty state
  if (!hasProducts) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <ShoppingBag size={32} style={{ color: "var(--brand-earth)" }} />
        </div>
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--brand-dark)" }}
        >
          No products found
        </h3>
        <p className="text-sm mb-6" style={{ color: "#8B7B70" }}>
          We couldn&apos;t find any products at the moment. Please check back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--brand-earth)" }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Products count with fetching indicator */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={{ color: "#8B7B70" }}>
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
            <span className="text-xs text-stone-400">Updating...</span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

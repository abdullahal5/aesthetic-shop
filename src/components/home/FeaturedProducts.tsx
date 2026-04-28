"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/home/ProductCard";
import { useFeaturedProducts } from "@/hooks/product/useProduct";

export default function FeaturedProducts() {
  const {
    data: products,
    isLoading,
    isFetching,
    error,
  } = useFeaturedProducts(4);

  // Loading state
  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--brand-sage)" }}
            >
              Our Collection
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: "var(--brand-dark)" }}
            >
              Featured Products
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-stone-50 rounded-2xl animate-pulse"
              style={{ height: "320px" }}
            />
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Failed to load products</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="rounded-full"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  // Check if products exist
  const hasProducts = products && products.length > 0;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--brand-sage)" }}
          >
            Our Collection
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--brand-dark)" }}
          >
            Featured Products
            {isFetching && !isLoading && (
              <span className="text-sm font-normal ml-3 text-stone-400">
                Refreshing...
              </span>
            )}
          </h2>
        </div>
        <Link href="/shop">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full hidden md:flex items-center gap-1.5 border-stone-200 hover:bg-stone-50"
          >
            View All <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      {hasProducts ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/shop">
              <Button
                variant="outline"
                className="rounded-full px-8 border-stone-200"
              >
                View All Products <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-stone-500 mb-4">No products available</p>
          <Link href="/shop">
            <Button className="rounded-full px-8">Shop Now</Button>
          </Link>
        </div>
      )}
    </section>
  );
}

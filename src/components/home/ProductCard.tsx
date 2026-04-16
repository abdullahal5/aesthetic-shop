"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) /
        product.reviews.length
      : 0;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0].url,
      slug: product.slug,
    });
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-xl hover:shadow-stone-100/60 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ backgroundColor: "var(--brand-sand)" }}
      >
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <Badge
              className="text-white border-0 text-xs font-bold rounded-full px-2.5"
              style={{ backgroundColor: "var(--brand-earth)" }}
            >
              -{discount}%
            </Badge>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge
              variant="outline"
              className="bg-white/90 text-red-600 border-red-200 text-xs rounded-full px-2.5"
            >
              Only {product.stock} left
            </Badge>
          )}
        </div>

        {/* Quick add on hover */}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
          style={{ backgroundColor: "var(--brand-dark)", color: "white" }}
          aria-label="Add to cart"
        >
          <ShoppingBag size={15} />
        </button>

        {/* Arrow icon */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md">
          <ArrowUpRight size={14} style={{ color: "var(--brand-dark)" }} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2.5">
        <div>
          <p
            className="text-xs font-medium uppercase tracking-widest mb-1"
            style={{ color: "var(--brand-sage)" }}
          >
            {product.category}
          </p>
          <h3
            className="font-semibold text-sm leading-snug transition-colors duration-200 line-clamp-1"
            style={{ color: "var(--brand-dark)" }}
          >
            {product.name}
          </h3>
          <p className="text-xs mt-1 line-clamp-1" style={{ color: "#8B7B70" }}>
            {product.tagline}
          </p>
        </div>

        {/* Rating */}
        {avgRating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  className={
                    s <= Math.round(avgRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-stone-200"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-stone-500">
              {avgRating.toFixed(1)} ({product.reviews.length})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-baseline gap-2">
            <span
              className="text-lg font-bold"
              style={{ color: "var(--brand-dark)" }}
            >
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-xs" style={{ color: "var(--brand-sage)" }}>
            {product.totalSold} sold
          </span>
        </div>
      </div>
    </Link>
  );
}

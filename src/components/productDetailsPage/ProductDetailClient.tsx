"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  Phone,
  ChevronRight,
  Minus,
  Plus,
  Package,
  BadgeCheck,
} from "lucide-react";
import { Product } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "../home/ProductCard";
import { useCart } from "@/hooks/cartContext";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0].url,
      slug: product.slug,
    });
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--brand-cream)" }}
    >
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "#8B7B70" }}
        >
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-stone-900 transition-colors">
            Shop
          </Link>
          <ChevronRight size={12} />
          <span
            className="font-medium truncate max-w-[200px]"
            style={{ color: "var(--brand-dark)" }}
          >
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3 sticky top-24 self-start">
            <div
              className="relative aspect-square rounded-3xl overflow-hidden"
              style={{ backgroundColor: "var(--brand-sand)" }}
            >
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt}
                fill
                className="object-cover transition-all duration-300"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {discount && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: "var(--brand-earth)" }}
                >
                  -{discount}% OFF
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${selectedImage === i ? "border-amber-500 shadow-md" : "border-transparent hover:border-stone-300"}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  className="text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--brand-sage-light)",
                    color: "var(--brand-earth)",
                    border: "none",
                  }}
                >
                  {product.category}
                </Badge>
                {product.stock <= 5 && (
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-200 bg-red-50 text-xs rounded-full"
                  >
                    Only {product.stock} left
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge className="text-xs rounded-full bg-red-100 text-red-700 border-0">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <h1
                className="text-3xl font-bold leading-tight"
                style={{ color: "var(--brand-dark)" }}
              >
                {product.name}
              </h1>
              <p className="text-base" style={{ color: "#8B7B70" }}>
                {product.tagline}
              </p>

              {/* Rating row */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-200"
                      }
                    />
                  ))}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--brand-dark)" }}
                >
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-sm text-stone-400">
                  ({product.reviews.length} reviews)
                </span>
                <span className="text-sm text-stone-400">·</span>
                <span className="text-sm text-stone-400">
                  {product.totalSold} sold
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className="text-4xl font-bold"
                style={{ color: "var(--brand-dark)" }}
              >
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-stone-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Save ৳
                    {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div
              className="text-sm leading-relaxed space-y-3"
              style={{ color: "#6B5744" }}
            >
              {product.description
                .split("\n\n")
                .map((para, i) => para.trim() && <p key={i}>{para.trim()}</p>)}
            </div>

            {/* Features */}
            <div>
              <h3
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--brand-dark)" }}
              >
                What's Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#6B5744" }}
                  >
                    <Check
                      size={13}
                      style={{ color: "var(--brand-sage)" }}
                      className="shrink-0"
                    />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--brand-dark)" }}
              >
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    className="w-10 text-center font-semibold text-sm"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="w-10 h-10 flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-40"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-stone-400">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAdd}
                disabled={added || product.stock === 0}
                className="w-full h-13 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: added
                    ? "var(--brand-sage)"
                    : "var(--brand-dark)",
                  color: "white",
                  border: "none",
                }}
              >
                {added ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Cart — ৳{(product.price * quantity).toLocaleString()}
                  </>
                )}
              </Button>
              <Link href="/checkout">
                <Button
                  variant="outline"
                  className="w-full h-13 rounded-full text-sm font-semibold border-stone-300 hover:bg-stone-50"
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      quantity,
                      image: product.images[0].url,
                      slug: product.slug,
                    })
                  }
                  style={{ color: "var(--brand-dark)" }}
                >
                  Buy Now
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, title: "Fast Delivery", sub: "Dhaka 1–2 days" },
                {
                  icon: ShieldCheck,
                  title: "COD Available",
                  sub: "Pay on receipt",
                },
                {
                  icon: Phone,
                  title: "Call Confirmed",
                  sub: "Before dispatch",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center"
                  style={{ backgroundColor: "var(--brand-sand)" }}
                >
                  <item.icon
                    size={15}
                    style={{ color: "var(--brand-earth)" }}
                  />
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-stone-400">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs border border-stone-200 text-stone-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end gap-4 mb-8">
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--brand-dark)" }}
              >
                Customer Reviews
              </h2>
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-200"
                      }
                    />
                  ))}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--brand-dark)" }}
                >
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-sm text-stone-400">
                  · {product.reviews.length} reviews
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((review) => (
                <article
                  key={review.id}
                  className="p-5 rounded-2xl bg-white border border-stone-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                        style={{ backgroundColor: "var(--brand-earth)" }}
                      >
                        {review.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "var(--brand-dark)" }}
                          >
                            {review.name}
                          </p>
                          {review.verified && (
                            <BadgeCheck
                              size={13}
                              style={{ color: "var(--brand-sage)" }}
                            />
                          )}
                        </div>
                        <p className="text-xs text-stone-400">
                          {new Date(review.date).toLocaleDateString("en-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          className={
                            s <= review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-stone-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B5744" }}
                  >
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: "var(--brand-dark)" }}
            >
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

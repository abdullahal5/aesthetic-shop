"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Ticket,
  Gift,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/cartContext";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    count,
    mounted,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    grandTotal,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");

  // Mock coupon validation - replace with your actual API call
  const validateCoupon = async (code: string) => {
    const validCoupons: Record<string, number> = {
      WELCOME10: 10,
      SAVE20: 20,
      SPECIAL15: 15,
      FREESHIP: 5,
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (validCoupons[code.toUpperCase()]) {
      return { valid: true, discount: validCoupons[code.toUpperCase()] };
    }
    return { valid: false, discount: 0 };
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsApplying(true);
    setError("");

    const result = await validateCoupon(couponCode);

    if (result.valid) {
      applyCoupon({
        code: couponCode.toUpperCase(),
        discount: result.discount,
      });
      setCouponCode("");
    } else {
      setError("Invalid or expired coupon code");
    }

    setIsApplying(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };

  const deliveryFee = total > 0 ? 70 : 0;
  const finalTotal = grandTotal + deliveryFee;

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <Skeleton className="h-8 w-40" />
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: "var(--brand-sand)" }}
        >
          <ShoppingBag size={32} style={{ color: "var(--brand-earth)" }} />
        </div>
        <div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--brand-dark)" }}
          >
            Your cart is empty
          </h1>
          <p className="text-stone-400">
            Add something beautiful to your cart.
          </p>
        </div>
        <Link href="/shop">
          <Button
            className="rounded-full px-8"
            style={{
              backgroundColor: "var(--brand-earth)",
              color: "white",
              border: "none",
            }}
          >
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--brand-dark)" }}
        >
          Your Cart
        </h1>
        <span className="text-sm text-stone-400">
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0"
                style={{ backgroundColor: "var(--brand-sand)" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/shop/${item.slug}`}>
                  <p
                    className="font-semibold text-sm leading-snug hover:underline"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    {item.name}
                  </p>
                </Link>
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: "var(--brand-earth)" }}
                >
                  ৳{item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      className="w-8 text-center text-sm font-semibold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-stone-50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="ml-auto p-1.5 rounded-lg text-stone-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--brand-dark)" }}
                >
                  ৳{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 sticky top-24 space-y-4">
            <h2
              className="font-semibold"
              style={{ color: "var(--brand-dark)" }}
            >
              Order Summary
            </h2>
            <Separator />

            {/* Coupon Section */}
            <div className="space-y-3">
              {!appliedCoupon ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-600 flex items-center gap-1.5">
                    <Ticket size={13} />
                    Apply Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setError("");
                        }}
                        placeholder="Enter coupon code"
                        className="w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                        style={{
                          backgroundColor: "var(--brand-cream)",
                          borderColor: error ? "#ef4444" : "#e5e5e5",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleApplyCoupon();
                        }}
                      />
                      {error && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <X size={10} />
                          {error}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isApplying || !couponCode.trim()}
                      className="rounded-xl px-4 h-10 text-xs font-medium transition-all"
                      style={{
                        backgroundColor: "var(--brand-sage)",
                        color: "white",
                        opacity: isApplying || !couponCode.trim() ? 0.6 : 1,
                      }}
                    >
                      {isApplying ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-stone-400">Try:</span>
                    {["WELCOME10", "SAVE20", "SPECIAL15"].map((code) => (
                      <button
                        key={code}
                        onClick={() => setCouponCode(code)}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{
                    backgroundColor: "var(--brand-sand)",
                    border: "1px solid var(--brand-sage-light)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--brand-sage-light)" }}
                    >
                      <Gift size={14} style={{ color: "var(--brand-sage)" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        <CheckCircle
                          size={12}
                          style={{ color: "var(--brand-sage)" }}
                        />
                        Coupon Applied!
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--brand-earth)" }}
                      >
                        {appliedCoupon.code} • {appliedCoupon.discount}% OFF
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="p-1 rounded-lg hover:bg-white/50 transition-colors"
                    aria-label="Remove coupon"
                  >
                    <X
                      size={14}
                      className="text-stone-400 hover:text-red-500"
                    />
                  </button>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal ({count} items)</span>
                <span>৳{total.toLocaleString()}</span>
              </div>

              {appliedCoupon && (
                <div
                  className="flex justify-between text-xs"
                  style={{ color: "var(--brand-sage)" }}
                >
                  <span className="flex items-center gap-1">
                    <Gift size={12} /> Discount ({appliedCoupon.discount}%)
                  </span>
                  <span>- ৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-500">
                <span className="flex items-center gap-1">
                  <Truck size={12} /> Delivery (Dhaka)
                </span>
                <span>৳{deliveryFee}</span>
              </div>

              <Separator />

              <div
                className="flex justify-between font-bold text-base pt-1"
                style={{ color: "var(--brand-dark)" }}
              >
                <span>Total</span>
                <div className="text-right">
                  <span>৳{finalTotal.toLocaleString()}</span>
                  {appliedCoupon && (
                    <p className="text-xs font-normal text-stone-400 line-through mt-0.5">
                      ৳{(total + deliveryFee).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div
              className="p-3 rounded-xl border border-stone-100 space-y-1"
              style={{ backgroundColor: "var(--brand-sand)" }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--brand-dark)" }}
              >
                Payment Method
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: "var(--brand-earth)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--brand-earth)" }}
                  />
                </div>
                <p className="text-xs text-stone-500">Cash on Delivery (COD)</p>
              </div>
            </div>

            <Link href="/checkout">
              <Button
                className="w-full rounded-full h-11 text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--brand-dark)",
                  color: "white",
                  border: "none",
                }}
              >
                Proceed to Checkout <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>

            <div className="flex items-start gap-2 text-xs text-stone-400 pt-2.5">
              <ShieldCheck
                size={13}
                className="shrink-0 mt-0.5"
                style={{ color: "var(--brand-sage)" }}
              />
              <p>
                We call to confirm before dispatch. 7-day return policy for
                defective items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue shopping */}
      <div className="mt-8">
        <Link
          href="/shop"
          className="text-sm flex items-center gap-1 hover:underline transition-colors"
          style={{ color: "var(--brand-earth)" }}
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}

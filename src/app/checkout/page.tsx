"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/cartContext";
import { generateOrderNumber, saveOrder } from "@/lib/services/orderStorage";

const BD_DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Mymensingh",
  "Rangpur",
  "Comilla",
  "Narayanganj",
  "Gazipur",
  "Tangail",
  "Bogura",
  "Dinajpur",
  "Jessore",
  "Feni",
  "Noakhali",
  "Cumilla",
  "Cox's Bazar",
  "Jashore",
];

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-sm font-medium flex items-center gap-1"
        style={{ color: "var(--brand-dark)" }}
      >
        {label}{" "}
        {required && <span style={{ color: "var(--brand-earth)" }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (hasError?: boolean) =>
  cn(
    "w-full h-11 px-4 rounded-xl border text-sm bg-white outline-none transition-colors",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100",
  );

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "Dhaka",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = form.district === "Dhaka" ? 70 : 130;
  const grandTotal = total + deliveryFee;

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^(\+880|0)?1[3-9]\d{8}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid BD phone number";
    if (!form.address.trim()) e.address = "Address is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    return e;
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 1000));
    const orderNumber = generateOrderNumber();
    saveOrder({
      id: crypto.randomUUID(),
      orderNumber,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      address: form.address,
      district: form.district,
      items,
      subtotal: total,
      deliveryFee,
      total: grandTotal,
      paymentMethod: "cod",
      status: "pending",
      note: form.note,
      createdAt: new Date().toISOString(),
    });
    clearCart();
    router.push(
      `/thank-you?order=${orderNumber}&name=${encodeURIComponent(form.name)}`,
    );
  };

  if (items.length === 0) {
    return (
      <>
        <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-4">
          <p className="text-stone-500">Your cart is empty.</p>
          <Button
            onClick={() => router.push("/shop")}
            className="rounded-full"
            style={{
              backgroundColor: "var(--brand-earth)",
              color: "white",
              border: "none",
            }}
          >
            Browse Products
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: "var(--brand-dark)" }}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <section className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
              <h2
                className="font-semibold flex items-center gap-2"
                style={{ color: "var(--brand-dark)" }}
              >
                <Phone size={16} style={{ color: "var(--brand-earth)" }} />{" "}
                Contact Info
              </h2>
              <Field label="Full Name" error={errors.name} required>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your full name"
                  className={inputCls(!!errors.name)}
                />
              </Field>
              <Field label="Phone Number" error={errors.phone} required>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={inputCls(!!errors.phone)}
                />
                <p className="text-xs text-stone-400 mt-1">
                  We'll call this number to confirm before dispatch.
                </p>
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="your@email.com (optional)"
                  className={inputCls(!!errors.email)}
                />
              </Field>
            </section>

            {/* Address */}
            <section className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
              <h2
                className="font-semibold flex items-center gap-2"
                style={{ color: "var(--brand-dark)" }}
              >
                <MapPin size={16} style={{ color: "var(--brand-earth)" }} />{" "}
                Delivery Address
              </h2>
              <Field label="District" required>
                <select
                  value={form.district}
                  onChange={(e) => set("district", e.target.value)}
                  className={cn(inputCls(), "cursor-pointer")}
                >
                  {BD_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Full Address" error={errors.address} required>
                <textarea
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="House, road, area, thana..."
                  rows={3}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors resize-none",
                    errors.address
                      ? "border-red-300 focus:border-red-400"
                      : "border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100",
                  )}
                />
              </Field>
              <Field label="Order Note">
                <input
                  value={form.note}
                  onChange={(e) => set("note", e.target.value)}
                  placeholder="Any special instructions?"
                  className={inputCls()}
                />
              </Field>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
              <h2
                className="font-semibold"
                style={{ color: "var(--brand-dark)" }}
              >
                Payment Method
              </h2>
              <div
                className="flex items-start gap-3 p-4 rounded-xl border-2"
                style={{
                  borderColor: "var(--brand-earth)",
                  backgroundColor: "var(--brand-sand)",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0"
                  style={{ borderColor: "var(--brand-earth)" }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "var(--brand-earth)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    💵 Cash on Delivery (COD)
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Pay when the product arrives at your door.
                  </p>
                </div>
                <CheckCircle
                  size={16}
                  className="ml-auto shrink-0 mt-0.5"
                  style={{ color: "var(--brand-earth)" }}
                />
              </div>
              <p className="text-xs text-stone-400 flex items-start gap-1.5">
                <Truck size={12} className="mt-0.5 shrink-0" />
                We'll call you at <strong>
                  {form.phone || "your number"}
                </strong>{" "}
                to confirm before dispatch.
              </p>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 sticky top-24 space-y-4">
              <h2
                className="font-semibold"
                style={{ color: "var(--brand-dark)" }}
              >
                Order Summary
              </h2>
              <Separator />

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <div
                      className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0"
                      style={{ backgroundColor: "var(--brand-sand)" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium truncate"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p
                      className="text-sm font-semibold shrink-0"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span className="flex items-center gap-1">
                    <Truck size={12} /> Delivery ({form.district})
                  </span>
                  <span>৳{deliveryFee}</span>
                </div>
                <Separator />
                <div
                  className="flex justify-between font-bold text-base"
                  style={{ color: "var(--brand-dark)" }}
                >
                  <span>Total</span>
                  <span>৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full rounded-full h-12 text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
                style={{
                  backgroundColor: "var(--brand-dark)",
                  color: "white",
                  border: "none",
                }}
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </Button>
              <p className="text-xs text-stone-400 text-center">
                Secure checkout · COD · 7-day returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Download,
  Phone,
  Mail,
  Clock,
  MapPin,
  Gift,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed | AestheticBD",
  description: "Your order has been confirmed. We'll deliver within 3-5 days.",
  robots: {
    index: false,
  },
};

export default function ThankYouPage() {
  const orderNumber =
    // eslint-disable-next-line react-hooks/purity
    "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const totalAmount = 650;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--brand-cream)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Hero Section with Gradient */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-green-100 to-green-200 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "var(--brand-dark)" }}
          >
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg" style={{ color: "var(--brand-earth)" }}>
            Thank you for choosing AestheticBD. We&apos;re excited to serve you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: "var(--brand-sand)" }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Order Details
                </h2>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--brand-earth)" }}
                >
                  Order #{orderNumber}
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Product */}
                <div className="flex gap-4">
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--brand-sand)" }}
                  >
                    <span className="text-4xl">💧</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      Aurora Glass Bottle
                    </h3>
                    <p
                      className="text-sm mb-2"
                      style={{ color: "var(--brand-earth)" }}
                    >
                      Frosted glass with silicone sleeve
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quantity: 1</span>
                      <span
                        className="font-semibold"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        ৳650
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="border-t"
                  style={{ borderColor: "var(--brand-sand)" }}
                />

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--brand-earth)" }}>
                      Subtotal
                    </span>
                    <span>৳650</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--brand-earth)" }}>
                      Shipping
                    </span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div
                    className="flex justify-between text-lg font-bold pt-2 border-t"
                    style={{ borderColor: "var(--brand-sand)" }}
                  >
                    <span style={{ color: "var(--brand-dark)" }}>Total</span>
                    <span style={{ color: "var(--brand-dark)" }}>
                      ৳{totalAmount}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "var(--brand-sand)" }}
                >
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--brand-earth)" }}
                  >
                    Payment Method
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    Cash on Delivery (COD)
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--brand-earth)" }}
                  >
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </Card>

            {/* Delivery Timeline Card */}
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: "var(--brand-sand)" }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Delivery Timeline
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--brand-sage-light)" }}
                    >
                      <Clock
                        className="w-4 h-4"
                        style={{ color: "var(--brand-sage)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        Order Confirmed
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--brand-earth)" }}
                      >
                        We&apos;ll call you within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--brand-sage-light)" }}
                    >
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: "var(--brand-sage)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        Shipping
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--brand-earth)" }}
                      >
                        3-5 business days in Dhaka
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--brand-sage-light)" }}
                    >
                      <Gift
                        className="w-4 h-4"
                        style={{ color: "var(--brand-sage)" }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{ color: "var(--brand-dark)" }}
                      >
                        Delivery Day
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--brand-earth)" }}
                      >
                        Pay with cash when you receive
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - 1 column on desktop */}
          <div className="space-y-6">
            {/* Need Help Card */}
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: "var(--brand-sand)" }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Need Help?
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <a
                  href="tel:+8801234567890"
                  className="flex items-center gap-3 p-3 rounded-lg transition-all hover:translate-x-1"
                  style={{ backgroundColor: "var(--brand-sand)" }}
                >
                  <Phone
                    className="w-5 h-5"
                    style={{ color: "var(--brand-sage)" }}
                  />
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--brand-earth)" }}
                    >
                      Call us
                    </p>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      +880 1234 567890
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:support@aestheticbd.com"
                  className="flex items-center gap-3 p-3 rounded-lg transition-all hover:translate-x-1"
                  style={{ backgroundColor: "var(--brand-sand)" }}
                >
                  <Mail
                    className="w-5 h-5"
                    style={{ color: "var(--brand-sage)" }}
                  />
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--brand-earth)" }}
                    >
                      Email us
                    </p>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      support@aestheticbd.com
                    </p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Actions Card */}
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              <div className="p-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  style={{
                    borderColor: "var(--brand-sage)",
                    color: "var(--brand-dark)",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </Button>
                <Link href="/">
                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: "var(--brand-sage)",
                      color: "white",
                      // hover: { backgroundColor: "var(--brand-earth)" },
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Promo Card */}
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-3">🎁</div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Refer a Friend
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--brand-earth)" }}
                >
                  Get 10% off on your next order
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  style={{
                    borderColor: "var(--brand-sage)",
                    color: "var(--brand-sage)",
                  }}
                >
                  Share Code: AESTHETIC10
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card
          className="border-0 shadow-sm mt-6 overflow-hidden"
          style={{ backgroundColor: "white" }}
        >
          <div
            className="p-6 border-b"
            style={{ borderColor: "var(--brand-sand)" }}
          >
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--brand-dark)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  When will I receive my order?
                </p>
                <p className="text-sm" style={{ color: "var(--brand-earth)" }}>
                  Within 3-5 business days in Dhaka. We&apos;ll call you to confirm
                  the exact date.
                </p>
              </div>
              <div>
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  What if I need to cancel?
                </p>
                <p className="text-sm" style={{ color: "var(--brand-earth)" }}>
                  Contact us within 2 hours for cancellation. Call +880 1234
                  567890.
                </p>
              </div>
              <div>
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Is delivery really free?
                </p>
                <p className="text-sm" style={{ color: "var(--brand-earth)" }}>
                  Yes! Free delivery for all orders in Dhaka city.
                </p>
              </div>
              <div>
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Can I track my order?
                </p>
                <p className="text-sm" style={{ color: "var(--brand-earth)" }}>
                  Yes! We&apos;ll share tracking info once your order is shipped.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Social Proof */}
        <div
          className="text-center mt-12 pt-8 border-t"
          style={{ borderColor: "var(--brand-sand)" }}
        >
          <p className="text-sm mb-3" style={{ color: "var(--brand-earth)" }}>
            Join 500+ happy customers who love their aesthetic bottles
          </p>
          <div className="flex justify-center gap-2">
            {["⭐", "⭐", "⭐", "⭐", "⭐"].map((star, i) => (
              <span key={i} className="text-xl">
                {star}
              </span>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--brand-earth)" }}>
            Rated 4.9/5 from 127 reviews
          </p>
        </div>
      </div>
    </div>
  );
}

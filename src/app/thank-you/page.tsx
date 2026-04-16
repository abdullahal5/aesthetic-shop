import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed | AestheticBD",
  description: "Your order has been confirmed. We'll deliver within 3-5 days.",
  robots: {
    index: false, // Don't index thank you page for SEO
  },
};

export default function ThankYouPage() {
  const orderNumber =
    "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const totalAmount = 650;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We&apos;ll contact you soon to confirm
            delivery details.
          </p>
        </div>

        {/* Order Details */}
        <Card className="p-8 border-gray-200 mb-8">
          <div className="space-y-6">
            {/* Order Number */}
            <div className="border-b border-gray-200 pb-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900">Order Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-900">Aurora Glass Bottle</span>
                  <span className="font-medium">৳650</span>
                </div>
                <p className="text-xs text-gray-500">Quantity: 1</p>
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>৳650</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>৳{totalAmount}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-2">Payment Method</p>
              <p className="font-medium text-gray-900">
                Cash on Delivery (COD)
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Pay when you receive your order
              </p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 border-blue-200 bg-blue-50 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">
            What&apos;s Next?
          </h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1</span>
              <span>
                We&apos;ll call you within 24 hours to confirm your delivery
                address
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2</span>
              <span>Your Aurora Glass Bottle will be packed with care</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3</span>
              <span>Delivery within 3-5 business days in Dhaka</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4</span>
              <span>Pay the delivery person (COD)</span>
            </li>
          </ol>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            size="lg"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </Button>

          <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-600" />
            <div className="text-sm">
              <p className="text-gray-600">
                Questions? We&apos;re here to help
              </p>
              <a
                href="tel:+8801234567890"
                className="font-semibold text-gray-900 hover:text-gray-700"
              >
                Call +880 1234 567890
              </a>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to explore more products?</p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        {/* FAQ */}
        <Card className="p-8 border-gray-200 mt-12 bg-gray-50">
          <h2 className="font-semibold text-gray-900 mb-4">Common Questions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900 mb-1">
                When will I receive my order?
              </p>
              <p className="text-gray-600">
                Within 3-5 business days in Dhaka. We&apos;ll call you to
                confirm the exact date.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">
                What if I need to cancel?
              </p>
              <p className="text-gray-600">
                Contact us within 2 hours for cancellation. Call +880 1234
                567890.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">
                Is it really free shipping?
              </p>
              <p className="text-gray-600">
                Yes! Free delivery for all orders in Dhaka city.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

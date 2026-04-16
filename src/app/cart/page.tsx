import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Shopping Cart | AestheticBD",
  description: "View your shopping cart and proceed to checkout",
  robots: {
    index: false, // Don't index cart page for SEO
  },
};

export default function CartPage() {
  const cartEmpty = true; // Will be dynamic with state management

  if (cartEmpty) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">{/* Items will go here */}</div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-gray-200 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">৳0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between mb-6">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">৳0</span>
              </div>
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white mb-2"
              >
                Proceed to Checkout
              </Button>
              <Link href="/">
                <Button size="lg" variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Checkout | AestheticBD",
  description: "Complete your order",
  robots: {
    index: false, // Don't index checkout for SEO
  },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-gray-200">
              <form className="space-y-6">
                {/* Delivery Address */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="col-span-1"
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        className="col-span-1"
                        required
                      />
                    </div>
                    <Input placeholder="Phone Number" type="tel" required />
                    <Input placeholder="Address" required />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Area/District" required />
                      <Input placeholder="Postal Code" required />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay when you receive your order
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        disabled
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-400">
                          Bank Transfer (Coming Soon)
                        </p>
                        <p className="text-sm text-gray-500">
                          Direct bank payment
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Any special requests or delivery instructions..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    rows={4}
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Place Order
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 border-gray-200 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Product */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-900">Aurora Glass Bottle × 1</p>
                  <p className="font-medium">৳650</p>
                </div>
                <p className="text-xs text-gray-500">Free shipping in Dhaka</p>
              </div>

              {/* Summary */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>৳650</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">৳650</span>
                </div>
              </div>

              {/* Trust Info */}
              <div className="mt-6 space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p>✓ Secure checkout</p>
                <p>✓ Fast delivery (3-5 days)</p>
                <p>✓ Easy returns</p>
                <p>✓ Customer support available</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

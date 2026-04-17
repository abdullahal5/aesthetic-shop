import Link from "next/link";
import { Sparkles, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--brand-dark)", color: "#E8DDD4" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--brand-amber)" }}
              >
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">AuraStore</span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "#A89888" }}
            >
              Aesthetic daily-use products for students, creatives, and anyone
              who believes their space deserves to look as good as they feel.
            </p>
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#A89888" }}
              >
                <MapPin
                  size={14}
                  style={{ color: "var(--brand-amber)" }}
                  className="shrink-0"
                />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#A89888" }}
              >
                <Phone
                  size={14}
                  style={{ color: "var(--brand-amber)" }}
                  className="shrink-0"
                />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-white transition-colors"
                >
                  +880 1700 000 000
                </a>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#A89888" }}
              >
                <MessageCircle
                  size={14}
                  style={{ color: "var(--brand-amber)" }}
                  className="shrink-0"
                />
                <a
                  href="https://wa.me/8801700000000"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Shop
            </h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/shop", label: "All Products" },
                { href: "/shop", label: "Water Bottles" },
                { href: "/shop", label: "Tumblers" },
                { href: "/shop", label: "Gift Sets" },
              ].map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#A89888" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Info
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Delivery: Dhaka 1–2 days" },
                { label: "Outside Dhaka: 3–5 days" },
                { label: "Payment: COD available" },
                { label: "Returns: 7 days policy" },
              ].map((i) => (
                <p
                  key={i.label}
                  className="text-sm"
                  style={{ color: "#A89888" }}
                >
                  {i.label}
                </p>
              ))}
              <div
                className="mt-2 p-3 rounded-xl text-xs leading-relaxed"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#A89888",
                }}
              >
                <span className="text-white font-medium">Return Policy — </span>
                7-day return for defective products. Call us to arrange. COD
                available nationwide.
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "#6B5744" }}
        >
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} AuraStore Bangladesh. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <span style={{ color: "var(--brand-amber)" }}>♥</span> in
            Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}

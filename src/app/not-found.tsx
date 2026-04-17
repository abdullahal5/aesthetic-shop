import Link from "next/link";
import { ArrowRight, Home, MapPinOff, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <div
        className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden"
        style={{ backgroundColor: "var(--brand-cream)" }}
      >
        {/* Soft background blobs */}
        <div
          aria-hidden
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--brand-sage-light) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--brand-amber) 0%, transparent 70%)",
          }}
        />

        <div className="relative text-center max-w-lg mx-auto space-y-8">
          {/* Sparkle icon */}
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "var(--brand-sand)" }}
            >
              <MapPinOff size={28} style={{ color: "var(--brand-earth)" }} />
            </div>
          </div>

          {/* 404 number */}
          <div className="space-y-1">
            <p
              className="text-8xl md:text-9xl font-bold leading-none tracking-tighter select-none"
              style={{ color: "var(--brand-sand)" }}
            >
              404
            </p>
            <div className="relative -mt-6 md:-mt-8">
              <p
                className="text-xl md:text-2xl font-bold"
                style={{ color: "var(--brand-dark)" }}
              >
                This page doesn&apos;t exist
              </p>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "#8B7B70" }}
          >
            Looks like this page wandered off. Maybe it found a better aesthetic
            somewhere. Let&apos;s get you back to something beautiful.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button
                className="rounded-full px-7 h-11 text-sm font-semibold gap-2 transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--brand-dark)",
                  color: "white",
                  border: "none",
                }}
              >
                <Home size={15} />
                Go Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="outline"
                className="rounded-full px-7 h-11 text-sm font-semibold gap-2 border-stone-200 hover:bg-stone-50"
                style={{ color: "var(--brand-dark)" }}
              >
                <ShoppingBag size={15} />
                Browse Shop
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="pt-2">
            <p className="text-xs mb-3" style={{ color: "#A89888" }}>
              Quick links
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/cart", label: "Cart" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-xs border transition-all hover:bg-stone-100"
                  style={{
                    borderColor: "var(--brand-sand)",
                    color: "var(--brand-earth)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

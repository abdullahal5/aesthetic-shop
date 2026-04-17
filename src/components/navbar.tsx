"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/cartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const { count, mounted } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-stone-200/60"
      style={{
        backgroundColor: "rgba(253,250,246,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          aria-label="AuraStore Home"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--brand-earth)" }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-base sm:text-lg font-bold tracking-tight"
              style={{ color: "var(--brand-dark)" }}
            >
              Aura
            </span>
            <span
              className="text-base sm:text-lg font-light"
              style={{ color: "var(--brand-earth)" }}
            >
              Store
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--brand-dark)", opacity: 0.7 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/cart" aria-label={`Cart — ${mounted ? count : 0} items`}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative hover:bg-stone-100 w-9 h-9 sm:w-10 sm:h-10"
            >
              <ShoppingBag size={18} style={{ color: "var(--brand-dark)" }} />
              {mounted && count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--brand-earth)" }}
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-stone-100 w-9 h-9 sm:w-10 sm:h-10"
              >
                <Menu size={18} style={{ color: "var(--brand-dark)" }} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-72 p-6"
              style={{ backgroundColor: "var(--brand-cream)" }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--brand-earth)" }}
                >
                  <Sparkles size={14} className="text-white" />
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--brand-dark)" }}
                >
                  AuraStore
                </span>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 px-4 rounded-xl text-sm font-medium transition-colors hover:bg-stone-100"
                    style={{ color: "var(--brand-dark)" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-medium transition-colors hover:bg-stone-100 flex items-center gap-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  <ShoppingBag size={16} />
                  Cart{" "}
                  {mounted && count > 0 && (
                    <span
                      className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "var(--brand-earth)" }}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </nav>

              <div className="mt-8 pt-8 border-t border-stone-200">
                <p className="text-xs text-stone-400">
                  Fast delivery · COD available · Bangladesh
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

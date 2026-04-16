"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { banners } from "@/lib/data/products";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  const activeBanners = banners.filter((b) => b.active);
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const go = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 150);
    },
    [transitioning],
  );

  const next = useCallback(
    () => go((current + 1) % activeBanners.length),
    [current, activeBanners.length, go],
  );
  const prev = useCallback(
    () => go((current - 1 + activeBanners.length) % activeBanners.length),
    [current, activeBanners.length, go],
  );

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const banner = activeBanners[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(420px, 60vh, 680px)" }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
      >
        <Image
          src={banner.imageUrl}
          alt={banner.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(44,36,32,0.82) 0%, rgba(44,36,32,0.5) 50%, rgba(44,36,32,0.15) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative h-full max-w-6xl mx-auto px-4 flex items-center transition-all duration-500 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
        <div className="max-w-xl text-white">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: "var(--brand-amber)", color: "white" }}
          >
            {banner.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4">
            {banner.title}
          </h1>
          <p
            className="text-lg mb-8 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {banner.description}
          </p>
          <div className="flex gap-3">
            <Link href={banner.ctaLink}>
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-sm font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--brand-amber)",
                  color: "white",
                  border: "none",
                }}
              >
                {banner.ctaText}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-sm font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {activeBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  backgroundColor:
                    i === current
                      ? "var(--brand-amber)"
                      : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

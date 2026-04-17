"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { banners } from "@/lib/data/products";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  const activeBanners = banners.filter((b) => b.active);
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback(
    (index: number) => {
      if (transitioning) return;
      let newIndex = index;
      if (newIndex < 0) newIndex = activeBanners.length - 1;
      if (newIndex >= activeBanners.length) newIndex = 0;

      setTransitioning(true);
      setTimeout(() => {
        setCurrent(newIndex);
        setTimeout(() => {
          setTransitioning(false);
        }, 50);
      }, 150);
    },
    [transitioning, activeBanners.length],
  );

  const next = useCallback(() => go(current + 1), [current, go]);

  const prev = useCallback(() => go(current - 1), [current, go]);

  // Auto-play
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, activeBanners.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Pause auto-play on hover/touch
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || activeBanners.length <= 1) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, isPaused, activeBanners.length]);

  const banner = activeBanners[current];

  if (!banner) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "clamp(380px, 55vh, 680px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          quality={85}
        />
        {/* Overlay - optimized for mobile readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(44,36,32,0.88) 0%, rgba(44,36,32,0.6) 50%, rgba(44,36,32,0.2) 100%)",
          }}
        />
      </div>

      {/* Content - optimized for mobile */}
      <div
        className={`relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center transition-all duration-500 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
        <div className="max-w-xl text-white w-full">
          <span
            className="inline-block text-[11px] sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: "var(--brand-amber)", color: "white" }}
          >
            {banner.subtitle}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] sm:leading-[1.1] tracking-tight mb-2 sm:mb-4">
            {banner.title}
          </h1>
          <p
            className="text-sm sm:text-lg mb-5 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-none opacity-90"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {banner.description}
          </p>

          {/* Buttons - inline row on mobile, no full width */}
          <div className="flex flex-row gap-2 sm:gap-4">
            <Link href={banner.ctaLink}>
              <Button
                size="default"
                className="rounded-full px-4 sm:px-8 h-8 sm:h-12 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
                style={{
                  backgroundColor: "var(--brand-amber)",
                  color: "white",
                  border: "none",
                }}
              >
                {banner.ctaText}
                <ArrowRight size={12} className="ml-1 sm:ml-2" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="default"
                variant="outline"
                className="rounded-full px-4 sm:px-8 h-8 sm:h-12 text-xs sm:text-sm font-semibold border-white/40 text-white hover:bg-white/10 active:bg-white/20 bg-black/20 backdrop-blur-sm shadow-lg whitespace-nowrap"
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation - optimized for mobile */}
      {activeBanners.length > 1 && (
        <>
          {/* Previous Button - smaller on mobile */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            aria-label="Previous banner"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          {/* Next Button - smaller on mobile */}
          <button
            onClick={next}
            className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            aria-label="Next banner"
          >
            <ChevronRight size={16} className="text-white" />
          </button>

          {/* Dots - compact and touch-friendly */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-black/30 backdrop-blur-md">
            {activeBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-300 rounded-full touch-manipulation"
                style={{
                  width: i === current ? "16px" : "5px",
                  height: "5px",
                  backgroundColor:
                    i === current
                      ? "var(--brand-amber)"
                      : "rgba(255,255,255,0.6)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint - subtle on mobile */}
          <div className="sm:hidden absolute bottom-16 left-1/2 -translate-x-1/2 text-white/30 text-[10px] flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <span>← Swipe →</span>
          </div>
        </>
      )}
    </section>
  );
}

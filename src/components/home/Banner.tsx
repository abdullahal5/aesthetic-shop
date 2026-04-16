"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgColor: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    title: "Aesthetic Bottles. Real Vibes.",
    subtitle: "Limited Edition",
    description:
      "Hydrate in style with bottles designed for students and gift lovers.",
    ctaText: "Shop Now",
    ctaLink: "/products/aurora-glass-bottle",
    image: "💧",
    bgColor: "from-blue-50 to-purple-50",
  },
  {
    id: 2,
    title: "Student Special Offer",
    subtitle: "20% OFF",
    description:
      "Get your favorite aesthetic bottle at an exclusive student discount.",
    ctaText: "Grab Deal",
    ctaLink: "/shop",
    image: "🎓",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    id: 3,
    title: "Gift Ready Packaging",
    subtitle: "Free Gift Wrap",
    description: "Perfect for birthdays, anniversaries, or just because.",
    ctaText: "Explore Gifts",
    ctaLink: "/shop",
    image: "🎁",
    bgColor: "from-pink-50 to-red-50",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div
              className={`max-w-7xl mx-auto px-4 py-16 md:py-24 bg-gradient-to-br ${slide.bgColor}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 text-pretty">
                    {slide.description}
                  </p>
                  <a href={slide.ctaLink}>
                    <Button
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      {slide.ctaText}
                    </Button>
                  </a>
                </div>

                {/* Image/Icon */}
                <div className="flex justify-center items-center">
                  <div className="text-8xl md:text-9xl animate-bounce">
                    {slide.image}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-gray-900"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

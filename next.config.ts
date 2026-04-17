import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 🔹 Needed for monorepo / pnpm / turborepo setups
  outputFileTracingRoot: path.join(__dirname, "../"),

  // 🔹 Standalone build (works great on Vercel, Docker, VPS)
  output: "standalone",

  // 🔹 React best practices
  reactStrictMode: true,

  // 🔹 Gzip compression
  compress: true,

  images: {
    // Allow external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],

    // Modern formats auto-served
    formats: ["image/avif", "image/webp"],

    // Fix quality warnings
    qualities: [75, 85],

    // Device breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/cartContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: {
    default: "AuraStore — Aesthetic Daily Products Bangladesh",
    template: "%s | AuraStore",
  },
  description:
    "Aesthetic water bottles and daily-use products designed for students, desk setups, and thoughtful gifts. Fast delivery across Bangladesh. COD available.",
  keywords: [
    "aesthetic water bottle bangladesh",
    "desk setup bangladesh",
    "gift bottle dhaka",
    "frosted glass bottle bd",
  ],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://aurastore.com.bd",
    siteName: "AuraStore",
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} font-sans antialiased`}
        style={{ backgroundColor: "var(--brand-cream)" }}
      >
        <CartProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}

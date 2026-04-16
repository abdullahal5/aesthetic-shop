import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "YourBrand — Aesthetic Daily Products Bangladesh",
    template: "%s | YourBrand",
  },
  description:
    "Cute, useful, aesthetic daily-use products for students, desk setups, and gifts. Fast delivery across Bangladesh.",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://yourdomain.com",
    siteName: "YourBrand",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

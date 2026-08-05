import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { LanguageProvider } from "@/hooks/useLanguage";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { CompareProvider } from "@/hooks/useCompare";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXE Furniture | Premium Handcrafted Luxury Furniture",
  description:
    "Discover our curated collection of handcrafted luxury furniture. Each piece tells a story of exceptional craftsmanship and enduring beauty. Transform your space into a sanctuary of elegance.",
  keywords: [
    "luxury furniture",
    "handcrafted furniture",
    "premium furniture",
    "designer furniture",
    "home decor",
    "interior design",
  ],
  openGraph: {
    title: "LUXE Furniture | Premium Handcrafted Luxury Furniture",
    description:
      "Discover our curated collection of handcrafted luxury furniture.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                {children}
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { SearchDrawer } from "@/components/ui/SearchDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NOIRÉ — Haute Horlogerie D'Auteur | Swiss Luxury Timepieces",
  description:
    "Precision-crafted mechanical timepieces engineered around architectural proportion, 72-hour in-house calibers, and metallurgical permanence. Manufactured in Geneva.",
  keywords: [
    "NOIRÉ",
    "Luxury Watches",
    "Haute Horlogerie",
    "Mechanical Watches",
    "Automatic Caliber",
    "Swiss Chronograph",
    "Geneva Timepieces",
  ],
  authors: [{ name: "NOIRÉ Horlogerie S.A." }],
  openGraph: {
    title: "NOIRÉ — Haute Horlogerie D'Auteur",
    description: "Precision-crafted mechanical timepieces designed for modern living.",
    url: "https://noire-timepieces.com",
    siteName: "NOIRÉ",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 1000,
        alt: "NOIRÉ S-01 Monolith Timepiece",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#F4F1EA] selection:bg-[#C5A880] selection:text-[#0B0B0B]">
        <CartProvider>
          {/* Header */}
          <Header />

          {/* Interactive Global Drawers */}
          <CartDrawer />
          <QuickViewModal />
          <SearchDrawer />

          {/* Main Page Slot */}
          <main className="flex-1 w-full">{children}</main>

          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

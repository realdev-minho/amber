import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ToastContainer } from "@/components/providers/ToastContainer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { FlyToCartOverlay } from "@/components/cart/FlyToCartOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amber — Your Shop For Everything",
  description:
    "Discover a curated e-commerce marketplace featuring luxury fashion, studio acoustics, horology, and architectural home objects.",
  keywords: ["amber", "ecommerce", "luxury", "fashion", "electronics", "watches", "curated marketplace"],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var origError = console.error;
                console.error = function() {
                  var msg = arguments[0];
                  if (typeof msg === 'string' && (msg.indexOf('bis_skin_checked') !== -1 || msg.indexOf('hydrated but some attributes') !== -1)) {
                    return;
                  }
                  origError.apply(console, arguments);
                };
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#0D0B0A] text-[#FBF8F5]">
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileNav />
          </div>
          <ToastContainer />
          <FlyToCartOverlay />
        </QueryProvider>
      </body>
    </html>
  );
}

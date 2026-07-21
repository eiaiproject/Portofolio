import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const SITE_URL = "https://anggieirawan.my.id";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Anggie Irawan | AI-Assisted Product Builder",
    template: "%s | Anggie Irawan",
  },
  description:
    "Anggie Irawan turns rough ideas into simple working web products. Landing pages, internal tools, and offline-first apps for small businesses, founders, and solo makers.",
  authors: [{ name: "Anggie Irawan" }],
  creator: "Anggie Irawan",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/AI-favicon.svg",
    apple: "/AI-favicon.svg",
  },
  openGraph: {
    title: "Anggie Irawan | AI-Assisted Product Builder",
    description:
      "From non-IT background to shipping products. Landing pages, prototypes, dashboards, and small web apps.",
    url: SITE_URL,
    siteName: "Anggie Irawan — A Monograph",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anggie Irawan — AI-Assisted Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anggie Irawan | AI-Assisted Product Builder",
    description:
      "From non-IT background to shipping products. Landing pages, prototypes, dashboards, and small web apps.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#111111",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <span>&copy; 2026 Anggie Irawan</span>
        </footer>

        {/* ═══ JSON-LD Structured Data ═══ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anggie Irawan",
              url: SITE_URL,
              jobTitle: "AI-Assisted Product Builder",
              description:
                "Anggie Irawan turns rough ideas into simple working web products. Landing pages, internal tools, and offline-first apps for small businesses, founders, and solo makers.",
              knowsAbout: ["Web Development", "React", "TypeScript", "Progressive Web Apps", "Offline-First Architecture"],
              mainEntity: {
                "@type": "ItemList",
                name: "Portfolio Projects",
                itemListElement: [
                  {
                    "@type": "SoftwareApplication",
                    position: 1,
                    name: "Expend",
                    description: "Offline-First Expense & Debt Tracker",
                    applicationCategory: "FinanceApplication",
                    url: "https://expend.pages.dev",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  },
                  {
                    "@type": "SoftwareApplication",
                    position: 2,
                    name: "Invois",
                    description: "Offline-First Invoice & Receipt Maker",
                    applicationCategory: "BusinessApplication",
                    url: "https://invois.pages.dev",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  },
                  {
                    "@type": "SoftwareApplication",
                    position: 3,
                    name: "Ledjer",
                    description: "Double-Entry Bookkeeping for UMKM",
                    applicationCategory: "FinanceApplication",
                    url: "https://ledjer.id",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  },
                  {
                    "@type": "SoftwareApplication",
                    position: 4,
                    name: "Zipto",
                    description: "ZIP to Markdown Converter — local-first PWA",
                    applicationCategory: "DeveloperApplication",
                    url: "https://zipto.pages.dev",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

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
  title: "Anggie Irawan | AI-Assisted Product Builder",
  description:
    "Anggie Irawan turns rough ideas into simple working web products. Landing pages, internal tools, and offline-first apps for small businesses, founders, and solo makers.",
  icons: {
    icon: "/AI-favicon.svg",
  },
  openGraph: {
    title: "Anggie Irawan | AI-Assisted Product Builder",
    description:
      "From non-IT background to shipping products. Landing pages, prototypes, dashboards, and small web apps.",
    type: "website",
    siteName: "Anggie Irawan — A Monograph",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anggie Irawan | AI-Assisted Product Builder",
    description:
      "From non-IT background to shipping products. Landing pages, prototypes, dashboards, and small web apps.",
  },
  robots: {
    index: true,
    follow: true,
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
}: {
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}

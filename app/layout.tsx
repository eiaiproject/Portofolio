import type {Metadata, Viewport} from 'next';
import './globals.css'; // Global styles

// ponytail: system fonts → no build-time network deps, still professional
const fontVars = {
  sans: '--font-sans',
  mono: '--font-mono',
};

export const metadata: Metadata = {
  title: 'Anggie Irawan - AI-Assisted Product Builder',
  description: 'Portfolio of an AI-assisted builder turning rough ideas into landing pages, prototypes, dashboards, and small web apps through learning by shipping.',
  icons: {
    icon: '/AI-logo.svg',
  },
  openGraph: {
    title: 'Anggie Irawan - AI-Assisted Product Builder',
    description: 'Portfolio of an AI-assisted builder turning rough ideas into landing pages, prototypes, and small web apps.',
    type: 'website',
    siteName: "Anggie's Build Lab",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anggie Irawan - AI-Assisted Product Builder',
    description: 'Portfolio of an AI-assisted builder turning rough ideas into landing pages, prototypes, and small web apps.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#070A0F] text-[#E5E7EB] antialiased">
        <a
          href="#status"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#7DD3FC] focus:text-[#070A0F] focus:rounded-sm focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

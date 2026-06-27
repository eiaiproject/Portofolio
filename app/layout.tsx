import type {Metadata, Viewport} from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Anggie's Build Lab",
  description: 'A digital lab notebook and build journal — learn by building with AI.',
  openGraph: {
    title: "Anggie's Build Lab",
    description: 'A digital lab notebook and build journal — learn by building with AI.',
    type: 'website',
    siteName: "Anggie's Build Lab",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anggie's Build Lab",
    description: 'A digital lab notebook and build journal — learn by building with AI.',
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
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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

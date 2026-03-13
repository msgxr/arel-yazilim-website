import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#E8531D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://arelsoftwareclub.github.io'),
  title: {
    default: 'Arel Yazılım Kulübü | İstanbul Arel Üniversitesi',
    template: '%s | Arel Yazılım Kulübü',
  },
  description:
    'İstanbul Arel Üniversitesi Yazılım Kulübü — yapay zekâ, yazılım geliştirme ve veri bilimi alanlarında proje üreten, etkinlikler düzenleyen resmî öğrenci topluluğu.',
  keywords: [
    'Arel Yazılım Kulübü',
    'İstanbul Arel Üniversitesi',
    'yazılım',
    'yapay zeka',
    'veri bilimi',
    'öğrenci kulübü',
    'AYK',
  ],
  authors: [{ name: 'Arel Yazılım Kulübü' }],
  creator: 'Arel Yazılım Kulübü',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://arelsoftwareclub.github.io',
    siteName: 'Arel Yazılım Kulübü',
    title: 'Arel Yazılım Kulübü | İstanbul Arel Üniversitesi',
    description:
      'İstanbul Arel Üniversitesi resmî öğrenci yazılım kulübü. Proje, etkinlik, hackathon ve kariyer fırsatları.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arel Yazılım Kulübü',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ArelSoftware',
    creator: '@ArelSoftware',
    title: 'Arel Yazılım Kulübü | İstanbul Arel Üniversitesi',
    description:
      'İstanbul Arel Üniversitesi resmî öğrenci yazılım kulübü. Proje, etkinlik ve kariyer fırsatları.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://arelsoftwareclub.github.io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Ana içeriğe geç
        </a>
        <div id="progress-bar" aria-hidden="true" />
        {children}
        <div id="toast-container" role="alert" aria-live="polite" />
      </body>
    </html>
  );
}

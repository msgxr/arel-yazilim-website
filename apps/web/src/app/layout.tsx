import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/ui/BackToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://arelsoftwareclub.github.io/website'),
  title: {
    default: 'Arel Yazılım Kulübü | İstanbul Arel Üniversitesi',
    template: '%s | Arel Yazılım Kulübü',
  },
  description:
    'İstanbul Arel Üniversitesi Yazılım Kulübü — yapay zekâ, yazılım geliştirme ve veri bilimi alanlarında proje üreten, etkinlikler düzenleyen resmî öğrenci topluluğu. 250+ aktif üye.',
  keywords: [
    'Arel Yazılım Kulübü',
    'İstanbul Arel Üniversitesi',
    'yazılım kulübü',
    'yapay zeka',
    'web geliştirme',
    'veri bilimi',
    'hackathon',
    'teknofest',
    'öğrenci kulübü',
  ],
  authors: [{ name: 'Arel Yazılım Kulübü' }],
  creator: 'Arel Yazılım Kulübü',
  publisher: 'Arel Yazılım Kulübü',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://arelsoftwareclub.github.io/website',
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
    canonical: 'https://arelsoftwareclub.github.io/website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} antialiased font-sans bg-slate-50 text-slate-900`}>
        <a href="#main-content" className="skip-to-content">
          Ana içeriğe geç
        </a>
        <ScrollProgress />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <BackToTop />
        <div id="toast-container" role="alert" aria-live="polite" />
      </body>
    </html>
  );
}
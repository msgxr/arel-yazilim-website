import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Strict React mode
  reactStrictMode: true,

  // Output standalone for Docker/Railway compatibility
  // output: 'standalone',

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },

  // Redirects for backwards compat with old GitHub Pages routes
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/hakkimizda.html', destination: '/hakkimizda', permanent: true },
      { source: '/etkinlikler.html', destination: '/etkinlikler', permanent: true },
      { source: '/duyurular.html', destination: '/duyurular', permanent: true },
      { source: '/projeler.html', destination: '/projeler', permanent: true },
      { source: '/ekip.html', destination: '/ekip', permanent: true },
      { source: '/iletisim.html', destination: '/iletisim', permanent: true },
      { source: '/uyelik.html', destination: '/uyelik', permanent: true },
      { source: '/belgeler.html', destination: '/belgeler', permanent: true },
      { source: '/kariyer.html', destination: '/kariyer', permanent: true },
      { source: '/is-birlikleri.html', destination: '/is-birlikleri', permanent: true },
      { source: '/odak-alanlari.html', destination: '/odak-alanlari', permanent: true },
      { source: '/gizlilik.html', destination: '/gizlilik', permanent: true },
      { source: '/yonetmelik.html', destination: '/yonetmelik', permanent: true },
      { source: '/ari.html', destination: '/ari-lab', permanent: true },
      { source: '/kurumsal.html', destination: '/kurumsal', permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Strict React mode
  reactStrictMode: true,

  // GitHub Pages hosting paths (always /website for this repo)
  basePath: '/website',
  trailingSlash: true,

  // Static export for GitHub Pages
  output: 'export',

  // Image optimization — unoptimized required for static export
  images: {
    unoptimized: true,
  },

  // Note: headers() and redirects() not supported with 'output: export'.
  // GitHub Pages is a static host — no Node.js runtime.
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'station-images-prod.radio-assets.com',
      },
    ],
  },
};

export default nextConfig;

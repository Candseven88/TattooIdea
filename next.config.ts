import type { NextConfig } from "next";

// Log API key status for debugging
console.log('ZHIPUAI_API_KEY exists:', !!process.env.ZHIPUAI_API_KEY);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.bigmodel.cn',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.zhipuai.cn',
        pathname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_ENABLED: process.env.ZHIPUAI_API_KEY ? 'true' : 'false',
  },
};

export default nextConfig;

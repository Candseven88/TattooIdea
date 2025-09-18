/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // 在生产构建中忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在生产构建中忽略TypeScript错误
    ignoreBuildErrors: true,
  },
  // 配置Turbopack
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // 配置webpack以处理SVG文件（Webpack模式）
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // 配置环境变量
  env: {
    NEXT_PUBLIC_API_ENABLED: process.env.NEXT_PUBLIC_API_ENABLED,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_PAYPAL_CURRENCY: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY,
    NEXT_PUBLIC_PAYPAL_MODE: process.env.NEXT_PUBLIC_PAYPAL_MODE,
  },
};

module.exports = nextConfig; 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/NDI2025',
  assetPrefix: '/NDI2025',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

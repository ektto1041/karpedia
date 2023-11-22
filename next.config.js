/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'karpedia.s3.amazonaws.com',
      },
      {
        hostname: 'karpedia.s3.ap-northeast-2.amazonaws.com',
      },
    ]
  }
}

const removeImports = require('next-remove-imports')();

module.exports = removeImports(nextConfig);
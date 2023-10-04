/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      }
    ]
  }
}

const removeImports = require('next-remove-imports')();

module.exports = removeImports(nextConfig);
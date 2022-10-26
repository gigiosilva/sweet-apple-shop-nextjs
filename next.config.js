/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['sweet-apple-acres.netlify.app'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    env: {
      PORT: '3000',
    },
  },
}

module.exports = nextConfig

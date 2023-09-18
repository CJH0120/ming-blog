/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    enableUndici: true,
    serverActions: true,
  },
}

module.exports = nextConfig

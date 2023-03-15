/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {protocol: 'https',
      hostname: 'githubusercontent.com',
      port: '',
      pathname: '/K-minutti/**'
      }
    ]
  }
}

module.exports = nextConfig

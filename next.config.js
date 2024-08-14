/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    IMG_ROUTE: process.env.IMG_ROUTE
  },
  images: {
    disableStaticImages: true,
  },
}

module.exports = nextConfig

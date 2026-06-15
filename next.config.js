/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export — no server to run the optimizer
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-ac8c898079b54cd79dec959b8a8978e9.r2.dev", // DOMÍNIO FIXO
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
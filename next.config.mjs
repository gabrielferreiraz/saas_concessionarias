/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ABRINDO A CATRACA PARA UPLOAD MÚLTIPLO
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
        hostname: process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN ?? "localhost",
      },
      // Fallback: allow host derived from R2_PUBLIC_BASE_URL when provided
      ...(process.env.R2_PUBLIC_BASE_URL
        ? [
            {
              protocol: "https",
              hostname: (() => {
                try {
                  return new URL(process.env.R2_PUBLIC_BASE_URL).hostname
                } catch {
                  return "localhost"
                }
              })(),
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      }
    ],
  },
};

export default nextConfig;
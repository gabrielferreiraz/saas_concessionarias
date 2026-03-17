/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuração para permitir uploads de arquivos maiores (até 50MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },

  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      // Normalização automática para NEXT_PUBLIC_R2_PUBLIC_DOMAIN
      {
        protocol: "https",
        hostname: (process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || "localhost")
          .replace(/^https?:\/\//, "") // Remove protocolo se houver
          .replace(/\/$/, ""),          // Remove barra final se houver
      },
      // Normalização automática para R2_PUBLIC_BASE_URL
      {
        protocol: "https",
        hostname: (process.env.R2_PUBLIC_BASE_URL || "localhost")
          .replace(/^https?:\/\//, "")
          .replace(/\/$/, ""),
      },
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
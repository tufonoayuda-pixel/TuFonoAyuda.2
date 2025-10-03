/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
    ],
  },
  // output: 'export', // REMOVED - incompatible with API routes and server features
  // trailingSlash: true, // REMOVED - not needed for dynamic deployment
  // distDir: 'out', // REMOVED - using default .next directory
  experimental: {
    esmExternals: 'loose',
  },
}

export default nextConfig

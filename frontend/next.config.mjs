/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**', // Added path catch-all fallback
      },
      {
        protocol: 'https',
        hostname: '**.alphacoders.com', // ⚡ Added wildcard prefix to cover any subdomains
        pathname: '/**',                // ⚡ Added catch-all path match rule
      },
      {
        protocol: 'https',
        hostname: 'alphacoders.com',    // Keep the root domain definition safe too
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
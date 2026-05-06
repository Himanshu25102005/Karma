/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        // Existing Pinterest config...
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // Add this line
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
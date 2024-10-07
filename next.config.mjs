/** @type {import('next').NextConfig} */
const nextConfig = {
    // crossOrigin: 'anonymous',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            {
                protocol: 'https',
                hostname: `d1udnjrlnb89hm.cloudfront.net`,
            },
        ],
    },
}

export default nextConfig

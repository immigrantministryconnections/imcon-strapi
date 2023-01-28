/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'imconstrapi.blob.core.windows.net'],
  },

  async rewrites() {
    return [
      {
        source: '/about',
        destination: 'https://immigrantministry.com/about',
      },
    ];
  },
};

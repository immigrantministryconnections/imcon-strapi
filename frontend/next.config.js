/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'imconstrapi.blob.core.windows.net'],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://immigrantministry.com/blog',
        permanent: true,
      },
      {
        source: '/aboutus',
        destination: 'https://immigrantministry.com/about',
        permanent: true,
      },
    ];
  },
};

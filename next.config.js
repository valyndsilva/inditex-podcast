/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "is1-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com",
      "is3-ssl.mzstatic.com",
      "is4-ssl.mzstatic.com",
      "is5-ssl.mzstatic.com",
    ],
  },
};

module.exports = nextConfig;

/*----------------------------------------------------------------
Important Note:
In Next.js, the handling of assets in development and production modes is already taken care of automatically. Next.js has built-in optimizations for asset serving in different environments.
During development mode, assets are served without minimizing. This allows for faster build times and easier debugging. It means that the individual files are served as separate HTTP requests, which can be useful for development purposes.
On the other hand, during production mode, Next.js automatically optimizes and concatenates the assets to improve performance. This includes minimizing the files to reduce their size and combining them into bundles. This optimization helps to reduce the number of HTTP requests and improve the loading speed of your application.
Next.js uses webpack under the hood, which is a powerful bundler that handles the asset optimization and concatenation automatically in production mode. It follows best practices for optimizing assets and ensures that they are served efficiently.
Therefore, you don't need to explicitly handle the asset concatenation and minimization in Next.js. The framework takes care of it automatically based on the mode in which your application is running.
----------------------------------------------------------------*/

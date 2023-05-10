/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true
      },
      {
        source: "/index",
        destination: "/login",
        permanent: true
      },
      {
        source: "/dashboard/assessment-tax",
        destination: "/dashboard/assessment-tax/payment",
        permanent: true
      },
      {
        source: "/dashboard/trade-license",
        destination: "/dashboard/trade-license/application",
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig

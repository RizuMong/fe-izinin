const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  async rewrites() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not defined. Please set it in your environment variables."
      )
    }

    const normalized = baseUrl.replace(/\/$/, "")

    return [
      {
        source: "/api/:path*",
        destination: `${normalized}/:path*`,
      },
    ]
  },
}

export default nextConfig
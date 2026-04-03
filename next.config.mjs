const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  async rewrites() {
    const rawUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://be-izinin-production.up.railway.app"
    const baseUrl = rawUrl.replace(/\/$/, "")

    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
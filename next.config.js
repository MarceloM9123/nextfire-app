/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "https://www.marcelomata.com",
        headers: [
          {
            key: "Access-Control-Allow-Origin", value: "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/hdris/empty-wharehouse/empty_warehouse_01_1k.hdr" 
          }
        ]
      }
    ]
  }
  
}

module.exports = nextConfig

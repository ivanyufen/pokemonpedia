module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['https://assets.tokopedia.net', 'assets.tokopedia.net', 'media4.giphy.com', 'raw.githubusercontent.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home?tab=allPokemons',
        permanent: true,
      },
    ]
  },
}

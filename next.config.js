module.exports = {
  reactStrictMode: true,
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

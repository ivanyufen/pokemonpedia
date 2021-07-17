import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { PokemonProvider } from 'context/PokemonContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Pokepedia</title>
      <meta name="description" content="Pokemons by Tokopedia" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <PokemonProvider>
      <div className='max-w-md mx-auto shadow-md bg-white h-auto'>
        <Header/>
        <Component {...pageProps} />
      </div>
    </PokemonProvider>
    </>
  )
}

export default MyApp

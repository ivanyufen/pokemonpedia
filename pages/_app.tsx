import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Header from 'components/Header'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { PokemonProvider } from 'context/PokemonContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PokemonProvider>
      <div className='max-w-md mx-auto shadow-md bg-white h-auto'>
        <Header/>
        <Component {...pageProps} />
      </div>
    </PokemonProvider>
  )
}

export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MouseProvider from '../Hooks/useMouse'
import "../styles/global.scss";
import GridSystemProvider from '../Hooks/useGridSystem';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MouseProvider>
      <GridSystemProvider>
        <Component {...pageProps} />
      </GridSystemProvider>
    </MouseProvider>)
}

export default MyApp

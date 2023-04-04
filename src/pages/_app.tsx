import "@atlaskit/css-reset/dist/bundle.css"
import type { AppProps } from "next/app"


const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default App

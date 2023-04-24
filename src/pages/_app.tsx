import "@atlaskit/css-reset/dist/bundle.css"
import type { AppProps } from "next/app"
import { FlagsProvider } from "@atlaskit/flag"


const App = ({ Component, pageProps }: AppProps) => (
  <FlagsProvider>
    <Component {...pageProps} />
  </FlagsProvider>
)

export default App

import "@atlaskit/css-reset/dist/bundle.css"
import type { AppProps } from "next/app"
import { FlagsProvider } from "@atlaskit/flag"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"


const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => (
  <SessionProvider session={session}>
    <FlagsProvider>
      <Component {...pageProps} />
    </FlagsProvider>
  </SessionProvider>
)

export default App

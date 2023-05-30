import "@atlaskit/css-reset/dist/bundle.css"
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from "next/app"
import { FlagsProvider } from "@atlaskit/flag"
import { NextComponentType } from "next"
import React from "react"
import { Session } from "next-auth"
import { useRouter } from "next/router"


type AuthProps = {
  children: React.ReactElement
}

const Auth = ({ children }: AuthProps) => {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in").then(console.log) // Always redirect if unauthenticated
    }
  })

  if (status === "loading") {
    return <div>Loading...</div>
  }
  return children
}

type CustomAppProps = AppProps<{ session: Session }> & {
  Component: NextComponentType & { isAuth?: boolean }
}

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => (
  <SessionProvider session={session}>
    {
      Component.isAuth
      ? <Auth>
        <FlagsProvider>
          <Component {...pageProps} />
        </FlagsProvider>
      </Auth>
      : <FlagsProvider>
        <Component {...pageProps} />
      </FlagsProvider>
    }
  </SessionProvider>
)

export default App

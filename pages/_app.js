import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { useRef } from "react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Chat-app</title>
        <meta name="description" content="Chat apllication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

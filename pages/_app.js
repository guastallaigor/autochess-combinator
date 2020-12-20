// page/_app.js
import { GlobalStyles } from "twin.macro";
import Head from "next/head";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Auto Chess Combinator</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default App;

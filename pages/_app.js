// page/_app.js
import { GlobalStyles } from "twin.macro";
import Head from "next/head";
import "../styles/globals.css";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "data-goatcounter",
      "https://autochess-combinator.goatcounter.com/count"
    );
    script.async = true;
    script.src = "//gc.zgo.at/count.js";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }, []);
  return (
    <>
      <Head>
        <title>Auto Chess Combinator</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;

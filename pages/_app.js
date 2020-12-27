// page/_app.js
import { GlobalStyles } from "twin.macro";
import PropTypes from "prop-types";
import Head from "next/head";
import { useEffect } from "react";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const script = document.createElement("script");
    script.setAttribute("data-goatcounter", "https://autochess-combinator.goatcounter.com/count");
    script.async = true;
    script.src = "//gc.zgo.at/count.js";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }, []);

  return (
    <>
      <Head>
        <title>Auto Chess Combinator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
};

export default App;

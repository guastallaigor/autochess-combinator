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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="canonical" href="https://autochess-combinator.vercel.app" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta charset="utf-8" />
      <meta
        name="keywords"
        content="Auto Chess,Auto Chess strategies,AutoChess,Auto Chess PC version,Auto Chess mobile game,Auto Chess Combinator,AutoChessCombinator"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="title" content="Auto Chess Combinator" />
      <meta
        hid="description"
        name="description"
        content="Website that shows information for every chess peace in Auto Chess (Epic Games) and let you make chess peaces combinations as much as you want!"
      />
      <meta name="robots" content="index,follow" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://autochess-combinator.vercel.app"
      />
      <meta property="og:title" content="Auto Chess Combinator" />
      <meta
        property="og:description"
        content="Website that shows information for every chess peace in Auto Chess (Epic Games) and let you make chess peaces combinations as much as you want!"
      />
      <meta property="og:image" content="/android-chrome-512x512.png" />
      <meta property="og:site_name" content="Auto Chess Combinator" />
      <meta property="og:locale" content="en_US" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content="Auto Chess Combinator" />
      <meta property="twitter:site" content="@guastallaigor" />
      <meta property="twitter:creator" content="@guastallaigor" />
      <meta
        property="twitter:description"
        content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
      />
      <meta property="twitter:image" content="/android-chrome-192x192.png" />
      <meta property="twitter:image:alt" content="Logo Auto Chess Combinator" />
    </Head>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default App;

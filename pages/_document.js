import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="application-name" content="Auto Chess Combinator" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Auto Chess Combinator" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="canonical" href="https://autochess-combinator.vercel.app" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="keywords"
            content="Auto Chess,Auto Chess strategies,AutoChess,Auto Chess PC version,Auto Chess mobile game,Auto Chess Combinator,AutoChessCombinator,team,builder,team builder,auto chess,autochess,teambuilder"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta name="title" content="Auto Chess Combinator" />
          <meta
            hid="description"
            name="description"
            content="Make chess pieces combinations as much as you want! (Auto Chess - Epic Games)"
          />
          <meta name="robots" content="index,follow" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://autochess-combinator.vercel.app" />
          <meta property="og:title" content="Auto Chess Combinator" />
          <meta
            property="og:description"
            content="Make chess pieces combinations as much as you want! (Auto Chess - Epic Games)"
          />
          <meta property="og:image" content="/icon-512x512.png" />
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
          <meta property="twitter:image" content="/icon-192x192.png" />
          <meta property="twitter:image:alt" content="Logo Auto Chess Combinator" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <strong>
              We&#39;re sorry but Auto Chess Combinator doesn&#39;t work properly without JavaScript enabled. Please
              enable it to continue.
            </strong>
          </noscript>
        </body>
      </Html>
    );
  }
}

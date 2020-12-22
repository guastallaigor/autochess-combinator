// page/_app.js
import { GlobalStyles } from "twin.macro";
import Head from "next/head";
import "../styles/globals.css";

const sendMetric = ({ name, value }) => {
  const url = `https://qckm.io?m=${name}&v=${value}&k=${process.env.NEXT_PUBLIC_QUICK_METRICS_API_KEY}`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url);
  } else {
    fetch(url, { method: "POST", keepalive: true });
  }
};

export function reportWebVitals(metric) {
  switch (metric.name) {
    case "FCP":
      sendMetric(metric);
      break;
    case "LCP":
      sendMetric(metric);
      break;
    case "CLS":
      sendMetric(metric);
      break;
    case "FID":
      sendMetric(metric);
      break;
    case "TTFB":
      sendMetric(metric);
      break;
    default:
      break;
  }
}

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

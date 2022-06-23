// pages/_document.js

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;800&family=Public+Sans&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
          {/* <link rel="alternate icon" href="/favicon.ico"></link> */}
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <meta name="theme-color" content="#6f67b3"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

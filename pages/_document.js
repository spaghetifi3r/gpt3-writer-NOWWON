import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Ask NOWWON" key="title"/>
        <meta property="og:description" content="Virtual Assistant for Everyone" key="description"/>
        <meta
          property="og:image"
          content="assets/NOWWON.png"
        />
        <meta name="twitter:NOWWON" content="assets/NOWWON.png"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

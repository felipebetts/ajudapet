import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
          {/* <script src="/js/MercadoPago.js"></script> */}
          {/* <script src="/js/integration.js"></script> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
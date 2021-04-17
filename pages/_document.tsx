import Document, { Html, Head, Main, NextScript } from 'next/document'
import lightning from '../public/lightning.ico'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="pl">
        <Head >
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="shortcut icon" href="../public/lightning.ico" type="image/x-icon" />
            <link rel="icon" href="../public/lightning.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
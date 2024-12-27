/* ----------- RESOURCES ----------- */
import Head from 'next/head'
import { SSRProvider } from 'react-bootstrap'
import { appWithTranslation } from 'next-i18next'
import { CustomThemeProvider } from 'Context/ThemeContext'
import { AuthProvider } from 'Context/AuthContenxt'

/* ----------- CONTRACTS -----------  */
import { AppProps } from 'Contracts/PageProps'

/* ----------- STYLES ----------- */
import 'Styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css'


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <AuthProvider>
        <SSRProvider>
          <CustomThemeProvider>
            <Component {...pageProps} />
          </CustomThemeProvider>
        </SSRProvider>
      </AuthProvider>
    </>
  )
}

export default appWithTranslation(App)
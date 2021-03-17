import { ThemeProvider } from "@material-ui/styles";
import { useEffect }  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import theme from '../components/theme'


function MyApp({ Component, pageProps }) {

  useEffect(() => {
  // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  return (
    <React.Fragment>
      <Head>
        <title>Millers</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
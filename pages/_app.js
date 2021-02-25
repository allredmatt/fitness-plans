import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme }     from '@material-ui/core/styles';
import { useEffect }  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3763db',
    },
    secondary: {
      main: '#f5915f',
    },
    mainBackground: "#6d7896"
  },
});

function MyApp({ Component, pageProps }) {

  useEffect(() => {
  // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
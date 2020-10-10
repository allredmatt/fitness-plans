import '../styles/globals.css'
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme }     from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3763db',
    },
    secondary: {
      main: '#8637db',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

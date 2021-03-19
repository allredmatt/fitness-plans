import { createMuiTheme }     from '@material-ui/core/styles';

const brightBlue = '#2196f3'
const lightBlue = '#7abff3'
const lightGrey = '#fafafa'


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#484848',
      main: '#303030',
      dark: '#000000',
      contrastText: brightBlue,
    },
    secondary: {
      light: '#5472d3',
      main: brightBlue,
      dark: '#002171',
      contrastText: '#fafafa',
    },
    background:{
      default: '#212121',
      highlighted: 'rgba(255, 255, 255, 0.08)'
    },
    text: {
      primary: lightBlue,
      secondary: lightGrey
    }
  },
  overrides: {
    MuiButton: {
     textPrimary: {
        color: brightBlue,
      },
    },
    MuiTab:{
        textColorInherit:{
          color: lightGrey,
          '&.Mui-selected':{
            color: brightBlue
          }
        },
    },
    MuiFormLabel:{
      root:{
        '&.Mui-focused':{
          color: brightBlue
        }
      }
    },
    MuiOutlinedInput:{
      root:{
        '&.Mui-focused .MuiOutlinedInput-notchedOutline':{
          borderColor: lightBlue
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 750,
      lg: 1280,
      xl: 1920,
      //xs for old iPhones, sm for most modern phones, md for tablets, lg for 720p, xl for 1080p
    },
  }
});

export default theme;
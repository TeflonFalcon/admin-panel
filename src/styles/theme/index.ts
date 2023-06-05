import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#FFF',
    },
    action: {
      focus: '#aaa',
      selected: '#000',
      active: '#000',
      hover: '#000',
    },
    text: {
      primary: '#FFF',
      secondary: '#cccccc',
    },
    info: {
      main: '#a81111',
    },
    background: {
      default: '#101010',
      paper: '#262626',
    },
  },
  typography: {
    fontFamily: `${'Montserrat'}, sans-serif`,
  },
})

export default theme

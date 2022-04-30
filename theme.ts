import { extendTheme } from '@chakra-ui/react'

// Colors
const black = '#2b2b2b'
const grayL = '#d4d4d4'
const gray = '#828282'
const grayD = '#4a4a4a'
const grayDD = '#333333'
const white = '#ffffff'

const primary = '#7209b7'
const primaryL = '#f5ebfc'
const primaryD = '#7209b7'

export { black, grayL, gray, grayD, grayDD, white, primary, primaryL }

// Theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: black,
      },
    },
  },
  colors: {
    black: {
      500: black,
    },
    gray: {
      100: '#f7f7f7',
      200: grayL,
      300: gray,
      400: grayD,
      500: grayDD,
    },
    white: {
      500: white,
    },
    primary: {
      100: white,
      200: primaryL,
      500: primary,
      600: primaryD,
    },
    tabs: {
      50: primary,
      100: primary,
      200: primary,
      300: primary,
      400: primary,
      500: primary,
      600: primary,
      700: primary,
      800: primary,
      900: primary,
    },
  },
  fonts: {
    body: 'Poppins',
    heading: 'Poppins',
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: 'white',
        },
      },
    },
  },
})

export default theme

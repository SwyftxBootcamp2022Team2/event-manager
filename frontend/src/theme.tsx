import { extendTheme } from '@chakra-ui/react';
import '@fontsource/poppins';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: {
      body: {
        background: '#f5f5f5',
      },
    },
  },
});

export default theme;

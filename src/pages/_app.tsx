import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Box
        maxW="7xl"
        minH="calc(100vh - 60)"
        mx={{
          base: '4%', sm: '4%', md: '10%', lg: '16%', xl: '20%',
        }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <Component {...pageProps} />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

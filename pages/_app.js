import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import useHandleThemeStore from 'src/store/useHandleThemeStore';
import { theme } from 'src/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
const AuthenticationProvider = dynamic(() => import('src/provider/AuthenticationProvider'), { ssr: false });
const WalletConnectorProvider = dynamic(() => import('src/provider/WalletConnectProvider'), { ssr: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

// get connectors

const getLibrary = provider => {
  return new Web3Provider(provider);
};

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const mode = useHandleThemeStore.use.theme();

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletConnectorProvider>
              <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
              </Head>
              <ThemeProvider theme={theme(mode)}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
                <ToastContainer
                  position='top-right'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme={mode === 'dark' ? 'dark' : 'light'}
                />
              </ThemeProvider>
            </WalletConnectorProvider>
          </Web3ReactProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};

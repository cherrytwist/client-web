import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { AuthenticationProvider } from './context/AuthenticationProvider';
import { ConfigProvider } from './context/ConfigProvider';
import { EcoverseProvider } from './context/EcoverseProvider';
import { NavigationProvider } from './context/NavigationProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { UserProvider } from './context/UserProvider';
import { env } from './env';
import { useGraphQLClient } from './hooks/useGraphQLClient';
import { createStyles } from './hooks/useTheme';
import { Routing } from './navigation';
import { Error as ErrorPage } from './pages/Error';
import sentryBootstrap from './sentry/bootstrap';
import configureStore from './store';

const graphQLEndpoint =
  (env && env.REACT_APP_GRAPHQL_ENDPOINT) ||
  (process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:4000/graphql');

sentryBootstrap();

const useGlobalStyles = createStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px #c3c3c3',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary,
    },
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
      margin: 0,
      fontFamily: '"Source Sans Pro", "Montserrat"',
    },
    '#root': {
      height: '100%',
    },
    '#app': {
      height: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const Root: FC = () => {
  useGlobalStyles();
  return (
    <Sentry.ErrorBoundary
      fallback={({ error }) => {
        return <ErrorPage error={error} />;
      }}
    >
      <Provider store={configureStore()}>
        <ReduxRoot />
      </Provider>
    </Sentry.ErrorBoundary>
  );
};

const ReduxRoot: FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider apiUrl={graphQLEndpoint}>
        <AuthenticationProvider>
          <CTApolloProvider>
            <ThemeProvider>
              <NavigationProvider>
                <UserProvider>
                  <EcoverseProvider>
                    <App>
                      <Routing />
                    </App>
                  </EcoverseProvider>
                </UserProvider>
              </NavigationProvider>
            </ThemeProvider>
          </CTApolloProvider>
        </AuthenticationProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

const CTApolloProvider: FC = ({ children }) => {
  const client = useGraphQLClient(graphQLEndpoint);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Root;

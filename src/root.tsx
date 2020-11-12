import { ApolloProvider } from '@apollo/client';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { AuthenticationProvider } from './context/AuthenticationProvider';
import { ConfigProvider } from './context/ConfigProvider';
import { NavigationProvider } from './context/NavigationProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { UserProvider } from './context/UserProvider';
import { env } from './env';
import { useGraphQLClient } from './hooks/useGraphQLClient';
import { Routing } from './navigation';
import configureStore from './store';

const graphQLEndpoint =
  (env && env.REACT_APP_GRAPHQL_ENDPOINT) ||
  (process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:4000/graphql');

const Root: FC = () => {
  return (
    <Provider store={configureStore()}>
      <ReduxRoot />
    </Provider>
  );
};

const ReduxRoot: FC = () => {
  const client = useGraphQLClient(graphQLEndpoint);

  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <AuthenticationProvider>
          <ThemeProvider>
            <NavigationProvider>
              <UserProvider>
                <BrowserRouter>
                  <App>
                    <Routing />
                  </App>
                </BrowserRouter>
              </UserProvider>
            </NavigationProvider>
          </ThemeProvider>
        </AuthenticationProvider>
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default Root;

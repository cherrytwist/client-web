import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AdminPage } from '../components/AdminPage';
import App from '../components/App';
import { ChallengePage } from '../components/ChallengePage';
import { Layout } from '../components/Layout';
import { AdminLayout } from '../components/AdminLayout';
import { AppProvider } from '../context/AppProvider';
import { useGraphQLClient } from '../hooks/useGraphQLClient';
import { FourOuFour } from '../pages/FourOuFour';

export interface AppContainerProps {
  graphQLEndpoint: string;
  enableAuthentication: boolean;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  const { graphQLEndpoint, enableAuthentication } = props;
  const client = useGraphQLClient(graphQLEndpoint, enableAuthentication);

  return (
    <ApolloProvider client={client}>
      <AppProvider enableAuthentication={enableAuthentication}>
        <Router>
          <Switch>
            <Route path="/admin/:path?" exact>
              <AdminLayout>
                <Switch>
                  <Route path="/admin" exact component={AdminPage} />
                </Switch>
              </AdminLayout>
            </Route>
            <Route>
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <App />
                  </Route>
                  <Route exact path="/challenge/:id" children={<ChallengePage />} />
                  <Route exact path="/connect">
                    <div>Connect Page</div>
                  </Route>
                  <Route exact path="/messages">
                    <div>Messages Page</div>
                  </Route>
                  <Route exact path="/login">
                    <div>Login Page</div>
                  </Route>
                  <Route exact path="/explore">
                    <div>Explore Page</div>
                  </Route>
                </Switch>
              </Layout>
            </Route>
            <Route path="*">
              <FourOuFour />
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
};

export default AppContainer;

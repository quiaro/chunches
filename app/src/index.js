import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo';
import routes from './routes';
import Default from './routes/Default';
import { getUserSession } from './common/AuthService';
import { SIMPLE_API_ENDPOINT } from './common/constants';
import { theme } from './styles/theme';
import './styles/base.css';

const networkInterface = createNetworkInterface({
  uri: SIMPLE_API_ENDPOINT,
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      // get the session token from local storage if it exists
      const { token } = getUserSession();
      if (token) {
        req.options.headers.authorization = `Bearer ${token}`;
      }
      next();
    },
  },
]);

const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Switch>
          {/* Public routes */}
          {routes
            .filter(route => route.public)
            .map(route => <Route key={`route-${route.name}`} {...route} />)}
          <Route component={Default} />
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);

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
import AppContainer from './components/styled/AppContainer';
import NavBar from './components/NavBar';
import { ID_TOKEN_KEY } from './common/constants';
import { theme } from './styles/theme';
import './styles/base.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj7gdhdwb02te01141lbxk8vo',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem(ID_TOKEN_KEY)) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          ID_TOKEN_KEY,
        )}`;
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
        <AppContainer className="center">
          <NavBar />
          <div className="pa3">
            <Switch>
              {/* Public routes */}
              {routes.filter(route => route.public)
                     .map(route => <Route key={`route-${route.name}`} {...route} />) }
              <Route component={Default} />
            </Switch>
          </div>
        </AppContainer>
      </ThemeProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);

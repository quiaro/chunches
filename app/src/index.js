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
import SideBar from './components/SideBar';
import { ID_TOKEN_KEY, SIMPLE_API_ENDPOINT } from './common/constants';
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
        <div>
          <Switch>
            {/* Public routes */}
            {routes.filter(route => route.public)
                   .map(route => <Route key={`route-${route.name}`} {...route} />) }
            <Route component={Default} />
          </Switch>
          <SideBar className='shadow-1' />
        </div>
      </ThemeProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);

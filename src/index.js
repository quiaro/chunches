import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import { GC_AUTH_TOKEN } from './constants'

import Login from './containers/Login';

import Home from './components/Home';
import App from './components/App';
import Logout from './components/Logout';

import './styles/index.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj7gdhdwb02te01141lbxk8vo'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Switch>
        {/* All public routes are declared here. Any routes that don't match
          will be handled by the App component, which checks first if the
          user is authenticated or not. If not, it will prompt the user to
          login. */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={App} />
      </Switch>
    </ApolloProvider>
  </Router>
  , document.getElementById('root')
)

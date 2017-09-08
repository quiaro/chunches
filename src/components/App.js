import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import ItemsDisplay from './ItemsDisplay'
import Login from './Login'
import Search from './Search'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='center'>
        <Header />
        <div className='pa3'>
          <Switch>
            <Route exact path='/' component={ItemsDisplay} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App

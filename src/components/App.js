import React, { Component } from 'react'
import TheirItems from './TheirItems'
import MyItems from './MyItems'
import MyNetwork from './MyNetwork'
import Profile from './Profile'
import Messages from './Messages'
import Header from './Header'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='center'>
        <Header />
        <div className='pa3'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/de-otros' />} />
            <Route exact path='/de-otros' component={TheirItems} />
            <Route exact path='/mios' component={MyItems} />
            <Route exact path='/mi-red' component={MyNetwork} />
            <Route exact path='/perfil' component={Profile} />
            <Route exact path='/mensajes' component={Messages} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App

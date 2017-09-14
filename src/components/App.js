import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

import Header from './Header'
import Welcome from './Welcome'
import TheirItems from './TheirItems'
import MyItems from './MyItems'
import MyNetwork from './MyNetwork'
import Profile from './Profile'
import Messages from './Messages'

const App = () => {

  return (
    <div className='center'>
      <Header />
      <div className='pa3'>
        <Switch>
          <PrivateRoute exact path='/home' component={Welcome} />
          <PrivateRoute exact path='/their-items' component={TheirItems} />
          <PrivateRoute exact path='/my-items' component={MyItems} />
          <PrivateRoute exact path='/network' component={MyNetwork} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/messages' component={Messages} />
        </Switch>
      </div>
    </div>
  )
}

export default App

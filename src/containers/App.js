import React, { Component } from 'react'

import TradeRequestNotifications from './TradeRequestNotifications'
import GetStarted from './GetStarted'
import TradeRequestForm from './TradeRequestForm'
import GiveAwayForm from './GiveAwayForm'
import { GC_USER } from '../constants'

class App extends Component {

  render() {

    const user = JSON.parse(localStorage.getItem(GC_USER));

    return (
        <div>
          <TradeRequestNotifications></TradeRequestNotifications>
          <h1>Welcome to the app!</h1>

          <GetStarted tradeRequestsSent={user.pursuer.length}></GetStarted>

          <TradeRequestForm></TradeRequestForm>

          <GiveAwayForm></GiveAwayForm>
        </div>
    )
  }
}

export default App

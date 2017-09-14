import React from 'react'

import GetStarted from './GetStarted'
import TradeRequestNotifications from '../containers/TradeRequestNotifications'
import TradeRequestForm from '../containers/TradeRequestForm'
import GiveAwayForm from '../containers/GiveAwayForm'
import { GC_USER } from '../constants'

const Welcome = () => {
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

export default Welcome

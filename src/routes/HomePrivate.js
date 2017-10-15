import React from 'react'
import GetStarted from '../components/GetStarted'
import PendingTradeRequests from '../components/PendingTradeRequests'
import StatusTradeRequests from '../components/StatusTradeRequests'
import TradeRequestForm from '../containers/TradeRequestForm'
import GiveAwayForm from '../containers/GiveAwayForm'


const HomePrivate = (props) => {
  const { user } = props.data;

  return (
    props.data.loading
      ? <div>Loading</div>
      : <div>
          <PendingTradeRequests uid={user.id}></PendingTradeRequests>
          <h1>Welcome to the app!</h1>

          <GetStarted tradeRequestsSent={user.pursuer.length}></GetStarted>

          <TradeRequestForm uid={user.id}></TradeRequestForm>

          <GiveAwayForm uid={user.id}></GiveAwayForm>
        </div>
  )
}

export default HomePrivate
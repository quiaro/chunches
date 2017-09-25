import React from 'react'
import { graphql } from 'react-apollo';
import GetStarted from './GetStarted'
import TradeRequestNotifications from '../containers/TradeRequestNotifications'
import TradeRequestForm from '../containers/TradeRequestForm'
import GiveAwayForm from '../containers/GiveAwayForm'
import USER_QUERY from '../queries/user';

const HomePrivate = (props) => {

  return (
    props.data.loading
      ? <div>Loading</div>
      : <div>
          {/* <TradeRequestNotifications></TradeRequestNotifications> */}
          <h1>Welcome to the app!</h1>

          <GetStarted tradeRequestsSent={props.data.user.pursuer.length}></GetStarted>

          {/* <TradeRequestForm></TradeRequestForm> */}

          {/* <GiveAwayForm></GiveAwayForm> */}
        </div>
  )
}

export default graphql(USER_QUERY)(HomePrivate)

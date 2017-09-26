import React from 'react'
import { graphql } from 'react-apollo';
import GetStarted from './GetStarted'
import TradeRequestNotifications from '../containers/TradeRequestNotifications'
import TradeRequestForm from '../containers/TradeRequestForm'
import GiveAwayForm from '../containers/GiveAwayForm'
import USER_QUERY from '../queries/user';

const HomePrivate = (props) => {
  const { user } = props.data;

  return (
    props.data.loading
      ? <div>Loading</div>
      : <div>
          <TradeRequestNotifications uid={user.id}></TradeRequestNotifications>
          <h1>Welcome to the app!</h1>

          <GetStarted tradeRequestsSent={props.data.user.pursuer.length}></GetStarted>

          <TradeRequestForm uid={user.id}></TradeRequestForm>

          <GiveAwayForm uid={user.id}></GiveAwayForm>
        </div>
  )
}

export default graphql(USER_QUERY)(HomePrivate)

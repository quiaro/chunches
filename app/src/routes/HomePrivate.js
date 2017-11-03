import React from 'react';
import GetStarted from '../components/GetStarted';
import PendingTradeRequests from '../components/PendingTradeRequests';
import TradeRequestForm from '../containers/TradeRequestForm';
import GiveAwayForm from '../containers/GiveAwayForm';

const HomePrivate = props => {
  const { loadingUser, user } = props.data;
  
  return loadingUser ? (
    <div>Loading</div>
  ) : (
    <div>
      <PendingTradeRequests uid={user.id} />
      <h1>Welcome to the app!</h1>

      <GetStarted tradeRequestsSent={user.pursuer.length} />

      <TradeRequestForm uid={user.id} />

      <GiveAwayForm uid={user.id} />
    </div>
  );
};

export default HomePrivate;

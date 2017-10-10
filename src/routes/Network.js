import React from 'react';
import PendingTradeRequests from '../components/PendingTradeRequests'

export default (props) => (
  <PendingTradeRequests uid={props.data.user.id}></PendingTradeRequests>
)

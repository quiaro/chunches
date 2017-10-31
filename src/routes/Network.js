import React from 'react';
import PendingTradeRequests from '../components/PendingTradeRequests'
import StatusTradeRequests from '../components/StatusTradeRequests'
import ToggleSwitch from '@trendmicro/react-toggle-switch';

const Network= (props) => {
  const { user } = props.data;

  return (
    props.data.loading
      ? <div>Loading</div>
      : <div>
          <PendingTradeRequests uid={user.id}></PendingTradeRequests>
          <br/>
          <StatusTradeRequests uid={user.id}></StatusTradeRequests> 
        </div>
  )
}
export default Network

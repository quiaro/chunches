import React from 'react';

export default (props) => (
  <div>
  { props.tradeRequestsSent === 0 &&
    <span>To get started, look up your friends or invite them to the app so you can share or give things away to each other.</span>
  }
  </div>
)

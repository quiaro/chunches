import React from 'react';
import { gql, graphql, compose } from 'react-apollo';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

const StatusTradeRequests = (props) => {
  const { statusTradeRequests, updateTradeRequest } = props;
  console.log(props);
  return (
    <div>
      {!statusTradeRequests.loading &&
        statusTradeRequests.allTradeRequests.length > 0 &&
        statusTradeRequests.allTradeRequests.map((tradeRequest, index) =>
          <div key={tradeRequest.id}>
            <span>
              <em>{tradeRequest.pursuer.name}</em> 
            </span>
            <div>
              <ToggleSwitch 
                  checked={true}
                  onChange={(event) => {
                      this.setState({ checked: !this.state.checked });
                  }}

              />
            </div>
          </div>,
        )}
    </div>
  );
}

const ALL_TRADE_REQUESTS_QUERY = gql`
  query StatusTradeRequests($uid: ID!) {
    allTradeRequests(filter: { AND: [{ pursued: { id: $uid } }] }) {
      id
      pursuer {
        id
        name
      }
    }
  }
`;

const UPDATE_TRADE_REQUEST_MUTATION = gql`
  mutation UpdateTradeRequest($id: ID!, $status: TradeRequestStatus!) {
    updateTradeRequest(id: $id, status: $status) {
      id
    }
  }
`;

export default compose(
  graphql(ALL_TRADE_REQUESTS_QUERY, { name: 'statusTradeRequests' }),
  graphql(UPDATE_TRADE_REQUEST_MUTATION, {
    name: 'updateTradeRequest',
    options: (props) => ({
      refetchQueries: [
        {
          query: ALL_TRADE_REQUESTS_QUERY,
          variables: {
            uid: props.uid,
          },
        },
      ]
    }),
  }),
)(StatusTradeRequests);
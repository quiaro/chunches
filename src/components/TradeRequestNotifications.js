import React from 'react';
import { gql, graphql, compose } from 'react-apollo';

const TradeRequestNotifications = (props) => {
  const { pendingTradeRequests, updateTradeRequest } = props;

  return (
    <div>
      {!pendingTradeRequests.loading &&
        pendingTradeRequests.allTradeRequests.length > 0 &&
        pendingTradeRequests.allTradeRequests.map((tradeRequest, index) =>
          <div key={tradeRequest.id}>
            <span>
              <em>{tradeRequest.pursuer.name}</em> would like to exchange
              things with you
            </span>
            <button
              onClick={() =>
                updateTradeRequest({
                  variables: {
                    id: tradeRequest.id,
                    status: 'ACCEPTED',
                  },
                })}
            >
              Accept
            </button>
            <button
              onClick={() =>
                updateTradeRequest({
                  variables: {
                    id: tradeRequest.id,
                    status: 'REJECTED',
                  },
                })}
            >
              Reject
            </button>
          </div>,
        )}
    </div>
  );
}

const ALL_PENDING_TRADE_REQUESTS_QUERY = gql`
  query PendingTradeRequests($uid: ID!) {
    allTradeRequests(
      filter: { AND: [{ pursued: { id: $uid } }, { status: PENDING }] }
    ) {
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
  graphql(ALL_PENDING_TRADE_REQUESTS_QUERY, { name: 'pendingTradeRequests' }),
  graphql(UPDATE_TRADE_REQUEST_MUTATION, {
    name: 'updateTradeRequest',
    options: (props) => ({
      refetchQueries: [
        {
          query: ALL_PENDING_TRADE_REQUESTS_QUERY,
          variables: {
            uid: props.uid,
          },
        },
      ]
    }),
  }),
)(TradeRequestNotifications);

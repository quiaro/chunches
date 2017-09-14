import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import { GC_USER_ID } from '../constants'

class TradeRequestNotifications extends Component {

  componentDidMount() {
    this.loadTradeRequests();
  }

  state = {
    tradeRequestsPending: [],
  }

  async loadTradeRequests() {
    const result = await this.props.client.query({
      query: ALL_TRADE_REQUESTS_QUERY,
      variables: {
        uid: localStorage.getItem(GC_USER_ID),
      }
    })
    const tradeRequests = result.data.allTradeRequests
    this.setState({ tradeRequestsPending: tradeRequests });
  }

  async resolveTradeRequest(tradeRequestId, status) {
    const result = await this.props.client.mutate({
      mutation: UPDATE_TRADE_REQUEST_MUTATION,
      variables: {
        id: tradeRequestId,
        status: status
      }
    });
    // TODO: Error handling
    const resolvedTradeRequest = result.data.updateTradeRequest.id;

    // Remove updated trade request from the pending trade request list
    const tradeRequests = this.state.tradeRequestsPending.filter(
      (tradeRequest) => tradeRequest.id !== resolvedTradeRequest
    )
    this.setState({ tradeRequestsPending: tradeRequests });
  }

  render() {
    const { tradeRequestsPending } = this.state;

    return (
      <div>
        { tradeRequestsPending.length > 0 &&
          tradeRequestsPending.map((tradeRequest, index) => (
            <div key={tradeRequest.id}>
              <span><em>{tradeRequest.pursuer.name}</em> would like to exchange things with you</span>
              <button onClick={ () => this.resolveTradeRequest(tradeRequest.id, 'ACCEPTED') }>Accept</button>
              <button onClick={ () => this.resolveTradeRequest(tradeRequest.id, 'REJECTED') }>Reject</button>
            </div>
          ))
        }
      </div>
    )
  }
}

// TODO: It would be better to fetch all contact requests instead, load them
// into the store and then just query for the ones that are pending
const ALL_TRADE_REQUESTS_QUERY = gql`
  query AllTradeRequestsQuery($uid: ID!) {
    allTradeRequests(filter: {
      AND: [{
        pursued: {
          id: $uid
        }
      }, {
        status: PENDING
      }]
    }) {
      id
      pursuer {
        id
        name
      }
    }
  }
`

const UPDATE_TRADE_REQUEST_MUTATION = gql`
  mutation UpdateTradeRequestMutation ($id: ID!, $status: TradeRequestStatus!) {
    updateTradeRequest(
      id: $id,
      status: $status
    ) {
      id
    }
  }
`

export default withApollo(TradeRequestNotifications)

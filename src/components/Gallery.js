import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import { GC_USER_ID } from '../constants'

import '../styles/Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  async loadItems() {
    const uid = localStorage.getItem(GC_USER_ID);

    // IDs of all users that have trade relationships with the user
    const userNetwork = new Set();

    const result = await this.props.client.query({
      query: ALL_ACCEPTED_TRADE_REQUESTS_QUERY,
      variables: {
        uid
      }
    })

    result.data.allTradeRequests.forEach(tr => {
      userNetwork.add(tr.pursuer.id);
      userNetwork.add(tr.pursued.id);
    })

    // remove user from his own network
    userNetwork.delete(uid);

    const networkItems = await this.props.client.query({
      query: ALL_NETWORK_ITEMS_QUERY,
      variables: {
        network: Array.from(userNetwork)
      }
    })

    this.setState({
      items: networkItems.data.allItems
    })
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    const items = this.state.items.map(function(item, i) {
      return (
        <div className="item mb4" key={i}>
          <a className="db center tc black link dim"
             href="#">

            <img className="ba b--black-10"
                 alt={item.title}
                 src={`https://images.graph.cool/v1/cj7gdhdwb02te01141lbxk8vo/${item.image.secret}/200x`} width="200" height="200" />

            <b className="db mt2 f6 lh-copy">{item.title}</b>
          </a>
          <button className='f6 link dim ba ph3 pv2 mb2 mt2 db white bg-dark-blue'>Me sirve</button>
        </div>
      );
    });

    return (
      <div className="items pt4">
        {items}
      </div>
    );
  }
}

const ALL_ACCEPTED_TRADE_REQUESTS_QUERY = gql`
  query AllAcceptedTradeRequestsQuery($uid: ID!) {
    allTradeRequests(filter: {
      AND: [{
        OR: [{
          pursuer: {
            id: $uid
          }
        }, {
          pursued: {
            id: $uid
          }
        }]
      }, {
        status: ACCEPTED
      }]
    }) {
      id
      pursuer {
        id
      }
      pursued {
        id
      }
    }
  }
`

const ALL_NETWORK_ITEMS_QUERY = gql`
  query AllNetworkItemsQuery($network: [ID!]) {
    allItems(filter: {
      owner: {
        id_in: $network
      }
    }) {
      id
      createdAt,
      image {
        name
        secret
        id
        url
      }
      owner {
        id
        name
      }
      status,
      title
    }
  }
`

export default withApollo(Gallery)

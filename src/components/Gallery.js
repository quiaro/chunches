import React, { Component } from 'react';
import { gql, graphql, compose, withApollo } from 'react-apollo';
import ItemGallery from './styled/ItemGallery';
import ErrorHandler from '../common/ErrorHandler';

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemsLoaded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { uid } = this.props;
    const { data } = nextProps;
    // After loading all trade requests for the user, get all the items from
    // each person in his/her network
    if (!data.loading && data.allTradeRequests && !data.allItems) {
      // Save the IDs of all users that have trade relationships with the user
      const userNetwork = this.getUserNetwork(uid, data.allTradeRequests);

      this.props.client.query({
        query: ALL_NETWORK_ITEMS_QUERY,
        variables: {
          network: Array.from(userNetwork),
        },
      }).then(res => this.setState({
        items: res.data.allItems,
        itemsLoaded: true,
      }))
      .catch(e => ErrorHandler(e));
    }
  }

  getUserNetwork(uid, allTradeRequests) {
    const userNetwork = new Set();

    allTradeRequests.forEach(tr => {
      userNetwork.add(tr.pursuer.id);
      userNetwork.add(tr.pursued.id);
    });

    // remove user from his own network
    userNetwork.delete(uid);
    return userNetwork;
  }

  render() {
    const { items, itemsLoaded } = this.state;

    const DOMItems = items.map(item =>
      (
        <div className="item mb4" key={item.id}>
          <a className="db center tc black link dim" href="#">
            <img
              className="ba b--black-10"
              alt={item.title}
              src={`https://images.graph.cool/v1/cj7gdhdwb02te01141lbxk8vo/${item
                .image.secret}/200x`}
              width="200"
              height="200"
            />

            <b className="db mt2 f6 lh-copy">
              {item.title}
            </b>
          </a>
          <button className="f6 link dim ba ph3 pv2 mb2 mt2 db white bg-dark-blue">
            Me sirve
          </button>
        </div>
      )
    );

    return (
      <ItemGallery className="pt4">
        { !itemsLoaded
            ? <div>Loading items ...</div>
            : !items.length
              ? <div>There are currently no items</div>
              : DOMItems
         }
      </ItemGallery>
    );
  }
}

const ALL_ACCEPTED_TRADE_REQUESTS_QUERY = gql`
  query ($uid: ID!) {
    allTradeRequests(
      filter: {
        AND: [
          { OR: [{ pursuer: { id: $uid } }, { pursued: { id: $uid } }] }
          { status: ACCEPTED }
        ]
      }
    ) {
      id
      pursuer {
        id
      }
      pursued {
        id
      }
    }
  }
`;

const ALL_NETWORK_ITEMS_QUERY = gql`
  query ($network: [ID!]) {
    allItems(filter: { owner: { id_in: $network } }) {
      id
      createdAt
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
      status
      title
    }
  }
`;

export default compose(
  graphql(ALL_ACCEPTED_TRADE_REQUESTS_QUERY),
  withApollo
)(Gallery);

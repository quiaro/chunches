import React, { Component } from 'react';
import { gql, graphql, compose, withApollo } from 'react-apollo';
import GalleryGrid from './styled/GalleryGrid';
import GalleryItem from './GalleryItem';
import ErrorHandler from '../common/ErrorHandler';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemsLoaded: false,
    };
    this.removeItem = this.removeItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { id, requests } = this.props.user;
    const { data } = nextProps;
    // After loading all trade requests for the user, get all the items from
    // each person in his/her network
    if (!data.loading && data.allTradeRequests && !data.allItems) {
      // Save the IDs of all users that have trade relationships with the user
      const userNetwork = this.getUserNetwork(id, data.allTradeRequests);
      const itemsRequested = requests.filter(request => request.status === "PENDING")
                                     .map(request => request.item.id);

      this.props.client
        .query({
          query: ALL_NETWORK_ITEMS_QUERY,
          variables: {
            network: Array.from(userNetwork),
            itemsRequested: itemsRequested,
          },
        })
        .then(res =>
          this.setState({
            items: res.data.allItems,
            itemsLoaded: true,
          }),
        )
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

  removeItem(itemIdx) {
    const updatedItems = this.state.items.slice();
    updatedItems.splice(itemIdx, 1);
    this.setState({ items: updatedItems });
  }

  render() {
    const { user } = this.props;
    const { items, itemsLoaded } = this.state;

    const galleryItems = items.map((item, idx) =>
      <GalleryItem
        key={item.id}
        item={item}
        user={user}
        onRemove={() => this.removeItem(idx)}
      />,
    );

    return (
      <GalleryGrid className="pt4">
        {!itemsLoaded
          ? <div>Loading items ...</div>
          : !items.length
            ? <div>There are currently no items</div>
            : galleryItems}
      </GalleryGrid>
    );
  }
}

const ALL_ACCEPTED_TRADE_REQUESTS_QUERY = gql`
  query($uid: ID!) {
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
  query($network: [ID!], $itemsRequested: [ID!]) {
    allItems(
      filter: {
        AND: [
          { id_not_in: $itemsRequested }
          { owner: { id_in: $network } }
        ]
      }
    ) {
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
  graphql(ALL_ACCEPTED_TRADE_REQUESTS_QUERY, {
    options: ({ user }) => ({
      variables: {
        uid: user.id,
      },
    }),
  }),
  withApollo,
)(Gallery);

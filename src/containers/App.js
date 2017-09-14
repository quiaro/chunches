import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'

import { GC_USER, GC_USER_ID } from '../constants'
import { debounce } from '../common/utils'

class App extends Component {

  constructor(props) {
    super(props);

    this.lookupUser = debounce(this.lookupUser, 100).bind(this);
  }

  componentDidMount() {
    this.getContactRequests();
    this.loadAllTags();
  }

  state = {
    friendName: '',
    userList: [],
    contactRequestSent: false,
    contactRequestsPending: [],
    itemTitle: '',
    itemPosted: false,
    itemTags: '',
    tags: new Map()
  }

  async lookupUser() {
    const friendName = this.state.friendName;
    if (friendName && friendName.length > 3) {
      // Send query to find friend
      const result = await this.props.client.query({
        query: ALL_USERS_SEARCH_QUERY,
        variables: {
          uid: localStorage.getItem(GC_USER_ID),
          searchText: friendName
        }
      })
      const users = result.data.allUsers
      this.setState({ userList: users});
    }
  }

  async sendContactRequest(user) {
    const result = await this.props.client.mutate({
      mutation: CREATE_CONTACT_MUTATION,
      variables: {
        pursuerId: localStorage.getItem(GC_USER_ID),
        pursuedId: user.id
      }
    })
    // TODO: Error handling
    console.log('Contact request sent: ', result.data);

    this.setState({ contactRequestSent: true });

    setTimeout(() => {
      this.setState({ contactRequestSent: false });
    }, 3000);
  }

  async getContactRequests() {
    const result = await this.props.client.query({
      query: ALL_CONTACTS_SEARCH_QUERY,
      variables: {
        uid: localStorage.getItem(GC_USER_ID),
      }
    })
    const contactRequests = result.data.allContacts
    this.setState({ contactRequestsPending: contactRequests });
  }

  async loadAllTags() {
    const result = await this.props.client.query({
      query: ALL_TAGS_QUERY
    })
    let tags = result.data.allTags.map(tag => [tag.key, tag.id]);
    tags = new Map(tags);
    this.setState({ tags: tags });
  }

  async resolveContactRequest(contactRequestId, state) {
    const result = await this.props.client.mutate({
      mutation: UPDATE_CONTACT_MUTATION,
      variables: {
        cid: contactRequestId,
        state: state
      }
    })
    // TODO: Error handling
    const updatedContactId = result.data.updateContact.id;
    const contactRequests = this.state.contactRequestsPending.filter(
      (contactRequest) => contactRequest.id !== updatedContactId
    )
    this.setState({ contactRequestsPending: contactRequests });
  }

  async postFreeItem() {
    const { itemTitle, itemTags, tags } = this.state;
    let itemTagsArray = itemTags.split(',');
    itemTagsArray = itemTagsArray.map(tag => tag.trim());

    // Create new free item for user
    const result = await this.props.client.mutate({
      mutation: CREATE_ITEM_MUTATION,
      variables: {
        title: itemTitle,
        ownerId: localStorage.getItem(GC_USER_ID),
        status: 'FREE'
      }
    })

    const itemId = result.data.createItem.id;

    // Show confirmation message
    this.setState({ itemPosted: true });

    setTimeout(() => {
      this.setState({
        itemTitle: '',
        itemTags: '',
        itemPosted: false
      });
    }, 3000);

    const tagsPromises = itemTagsArray.map(tag => {
      if (tags.has(tag)) {
        // tag already exists; return a resolved promise
        return Promise.resolve(true);
      } else {
        return this.props.client.mutate({
          mutation: CREATE_TAG_MUTATION,
          variables: {
            tag: tag,
            itemsIds: [ itemId ],
          }
        });
      }
    })

    Promise.all(tagsPromises).then((values) => {
      console.log('Tags were resolved: ', values);
    });
  }

  render() {

    const user = JSON.parse(localStorage.getItem(GC_USER));
    const { friendName, userList, contactRequestSent, contactRequestsPending, itemPosted } = this.state;

    return (
        <div>
          { contactRequestsPending.length > 0 &&
            contactRequestsPending.map((contactRequest, index) => (
              <div key={contactRequest.id}>
                <span><em>{contactRequest.pursuer.name}</em> would like to exchange things with you</span>
                <button onClick={ () => this.resolveContactRequest(contactRequest.id, 'ACCEPTED') }>Accept</button>
                <button onClick={ () => this.resolveContactRequest(contactRequest.id, 'REJECTED') }>Reject</button>
              </div>
            ))
          }
          { contactRequestSent &&
            <div>
              <span>Contact request sent!</span>
            </div>
          }
          <h1>Welcome to the app!</h1>
          { !user.pursued.length &&
            <div>
              <span>To get started, look up your friends or invite them to the app so you can share or give things away to each other.</span>
            </div>
          }
          <div>
            <h3>Find a friend</h3>
            <form>
              <input
                value={this.state.friendName}
                onChange={ (e) => {
                  this.setState({ friendName: e.target.value });
                  this.lookupUser();
                } }
                type='text'
                placeholder="Your Friend's Name"
              />
            </form>
            { friendName && friendName.length > 3 && userList.length > 0 &&
              userList.map((user, index) => (
                <div key={user.id}>
                  <span>{user.name}</span>
                  <button onClick={ () => this.sendContactRequest(user) }>Connect</button>
                </div>
              ))
            }
          </div>
          <div>
            <h3>Give Away Something</h3>
            <form>
              <input
                value={this.state.itemTitle}
                onChange={ (e) => this.setState({ itemTitle: e.target.value }) }
                type='text'
                placeholder="Item Name"
              />
              <input
                value={this.state.itemTags}
                onChange={ (e) => this.setState({ itemTags: e.target.value }) }
                type='text'
                placeholder="Item Tags"
              />
              <button onClick={ (e) => {
                e.preventDefault();
                this.postFreeItem()
              } }>Post Gift</button>
              { itemPosted &&
                <span>Your gift is now available to all your friends</span>
              }
            </form>
          </div>
        </div>
    )
  }
}

const ALL_USERS_SEARCH_QUERY = gql`
  query AllUsersSearchQuery($uid: ID!, $searchText: String!) {
    allUsers(filter: {
      AND: [{
        id_not: $uid
      }, {
        name_contains: $searchText
      }]
    }) {
      id
      name
    }
  }
`

// TODO: It would be better to fetch all contact requests instead, load them
// into the store and then just query for the ones that are pending
const ALL_CONTACTS_SEARCH_QUERY = gql`
  query AllContactsSearchQuery($uid: ID!) {
    allContacts(filter: {
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

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation ($pursuerId: ID!, $pursuedId: ID!) {
    createContact(
      pursuerId: $pursuerId,
      pursuedId: $pursuedId,
      status: PENDING
    ) {
      id
    }
  }
`

const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContactMutation ($cid: ID!, $state: ContactRequestStatus!) {
    updateContact(
      id: $cid,
      status: $state
    ) {
      id
    }
  }
`

const ALL_TAGS_QUERY = gql`
  query AllTags {
    allTags(orderBy: key_ASC) {
      id
      key
    }
  }
`

const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation ($tag: String!, $itemsIds: [ID!]) {
    createTag(
      key: $tag,
      itemsIds: $itemsIds
    ) {
      id
      key
    }
  }
`

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation ($title: String!, $ownerId: ID!, $status: ItemStatus!) {
    createItem(
      title: $title,
      ownerId: $ownerId,
      status: $status
    ) {
      id
    }
  }
`

export default withApollo(App)

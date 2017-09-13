import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'

import { GC_USER, GC_USER_ID } from '../constants'
import { debounce } from '../common/utils'

class App extends Component {

  constructor(props) {
    super(props);

    this.lookupUser = debounce(this.lookupUser, 100).bind(this);
  }

  state = {
    friendName: '',
    userList: [],
    contactRequestSent: false
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
    const data = result.data
    this.setState({ contactRequestSent: true });

    setTimeout(() => {
      this.setState({ contactRequestSent: false });
    }, 3000);
  }

  render() {

    const user = JSON.parse(localStorage.getItem(GC_USER));
    const { friendName, userList, contactRequestSent } = this.state;

    return (
        <div>
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

export default withApollo(App)

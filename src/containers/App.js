import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'

import { GC_USER, GC_USER_ID } from '../constants'
import { debounce } from '../common/utils'

class App extends Component {

  constructor(props) {
    super(props);

    this.lookupFriend = debounce(this.lookupFriend, 400).bind(this);
  }

  state = {
    friendName: ''
  }

  async lookupFriend() {
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

      console.log('Results: ', users);  // eslint-disable-line
    }
  }

  render() {

    const user = JSON.parse(localStorage.getItem(GC_USER));

    return (
        <div>
          { !user.pursuing.length &&
            <div>
              <span>To get started, look up your friends or invite them to the app so you can share or give things away to each other.</span>
            </div>
          }
          <h1>Welcome to the app!</h1>
          <div>
            <h3>Find a friend</h3>
            <form>
              <input
                value={this.state.friendName}
                onChange={ (e) => {
                  this.setState({ friendName: e.target.value });
                  this.lookupFriend();
                } }
                type='text'
                placeholder="Your Friend's Name"
              />
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

export default withApollo(App)

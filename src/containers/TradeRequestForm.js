import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import { debounce } from '../common/utils'
import { GC_USER_ID } from '../constants'

class TradeRequestForm extends Component {

  constructor(props) {
    super(props);

    this.lookupUser = debounce(this.lookupUser, 100).bind(this);
  }

  state = {
    userName: '',
    userList: [],
    tradeRequestSent: false,
  }

  async lookupUser() {
    const userName = this.state.userName;
    if (userName && userName.length > 3) {
      // Find users matching the user name
      const result = await this.props.client.query({
        query: ALL_USERS_SEARCH_QUERY,
        variables: {
          uid: localStorage.getItem(GC_USER_ID),
          searchText: userName
        }
      })

      // TODO: Error handling
      const users = result.data.allUsers
      this.setState({ userList: users});
    }
  }

  async sendTradeRequest(user) {
    const result = await this.props.client.mutate({
      mutation: CREATE_TRADE_REQUEST_MUTATION,
      variables: {
        pursuerId: localStorage.getItem(GC_USER_ID),
        pursuedId: user.id
      }
    })
    // TODO: Error handling
    console.log('Trade request sent: ', result.data);

    this.setState({
      userName: '',
      userList: [],
      tradeRequestSent: true
    });

    setTimeout(() => {
      this.setState({ tradeRequestSent: false });
    }, 3000);
  }

  render() {

    const { userName, userList, tradeRequestSent } = this.state;

    return (
      <div>
        <h3>Find a friend</h3>
        <form>
          <input
            value={this.state.userName}
            onChange={ (e) => {
              this.setState({ userName: e.target.value });
              this.lookupUser();
            } }
            type='text'
            placeholder="Your Friend's Name"
          />
        </form>
        { userName && userName.length > 3 && userList.length > 0 &&
          userList.map((user, index) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <button onClick={ () => this.sendTradeRequest(user) }>Connect</button>
            </div>
          ))
        }
        { tradeRequestSent &&
          <div>
            <span>Contact request sent!</span>
          </div>
        }
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

const CREATE_TRADE_REQUEST_MUTATION = gql`
  mutation CreateTradeRequestMutation ($pursuerId: ID!, $pursuedId: ID!) {
    createTradeRequest(
      pursuerId: $pursuerId,
      pursuedId: $pursuedId,
      status: PENDING
    ) {
      id
    }
  }
`

export default withApollo(TradeRequestForm)
